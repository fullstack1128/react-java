package com.neoproxy.pro.service.impl;

import com.neoproxy.pro.config.AppConf;
import com.neoproxy.pro.domain.Package;
import com.neoproxy.pro.domain.*;
import com.neoproxy.pro.dto.*;
import com.neoproxy.pro.enums.*;
import com.neoproxy.pro.mail.EmailDetails;
import com.neoproxy.pro.mail.EmailService;
import com.neoproxy.pro.mapper.TransactionMapper;
import com.neoproxy.pro.mapper.TransactionMapperImpl;
import com.neoproxy.pro.repository.*;
import com.neoproxy.pro.service.AuthenticationService;
import com.neoproxy.pro.service.ConfigurationService;
import com.neoproxy.pro.service.ProxyService;
import com.neoproxy.pro.service.TransactionService;
import com.neoproxy.pro.service.exception.NeoProxyServiceException;
import com.neoproxy.pro.utils.CommonUtil;
import com.neoproxy.pro.xproxy.model.PortType;
import com.neoproxy.pro.xproxy.model.ResetDataCounterReq;
import com.neoproxy.pro.xproxy.service.XProxyService;
import lombok.AccessLevel;
import lombok.NonNull;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.convert.QueryByExamplePredicateBuilder;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.Predicate;
import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
//@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class TransactionServiceImpl implements TransactionService {
    @Value("${server.ip}")
    private String serverIp;
    AppConf appConf;
    AuthenticationService authenticationService;
    TransactionRepository transactionRepository;
    ProxyService proxyService;
    PackageRepository packageRepository;
    ProxyRepository proxyRepository;
    LicenseRepository licenseRepository;
    UserRepository userRepository;
    ConfigurationService configService;
    XProxyService xProxyService;
    EmailService emailService;
    TransactionMapper transactionMapper = new TransactionMapperImpl();

    public TransactionServiceImpl(AuthenticationService authenticationService, TransactionRepository transactionRepository, ProxyService proxyService, PackageRepository packageRepository, ProxyRepository proxyRepository, LicenseRepository licenseRepository, UserRepository userRepository, ConfigurationService configService, XProxyService xProxyService, EmailService emailService, AppConf appConf) {
        this.serverIp = null;
        this.authenticationService = authenticationService;
        this.transactionRepository = transactionRepository;
        this.proxyService = proxyService;
        this.packageRepository = packageRepository;
        this.proxyRepository = proxyRepository;
        this.licenseRepository = licenseRepository;
        this.userRepository = userRepository;
        this.configService = configService;
        this.xProxyService = xProxyService;
        this.emailService = emailService;
        this.appConf = appConf;
    }


    public Specification<Transaction> getSpecAndExample(TransactionQueryRequest request, Example<Transaction> example) {
        return (Specification<Transaction>) (root, query, builder) -> {
            final List<Predicate> predicates = new ArrayList<>();
            if (!request.getName().isEmpty()) {
                predicates.add(builder.like(root.get("uuid").as(String.class), "%" + request.getName() + "%"));
            }
            if (!request.getType().isEmpty()) {
                predicates.add(builder.like(root.get("type").as(String.class), "%" + request.getType() + "%"));
            }
            if (!request.getCate().isEmpty()) {
                if (request.getCate().equals("BANK")) {
                    Predicate pre1 = builder.equal(root.get("type").as(String.class), TransactionType.TOPUP.name());
                    Predicate pre2 = builder.equal(root.get("type").as(String.class), TransactionType.REFUND.name());
                    Predicate pre3 = builder.equal(root.get("type").as(String.class), TransactionType.AFFILIATE.name());
                    Predicate pre4 = builder.equal(root.get("type").as(String.class), TransactionType.PROMOTION.name());
                    predicates.add(builder.or(pre1, pre2, pre3, pre4));
                } else if (request.getCate().equals("LICENSE")) {
                    Predicate pre1 = builder.equal(root.get("type").as(String.class), TransactionType.PURCHASE.name());
                    Predicate pre2 = builder.equal(root.get("type").as(String.class), TransactionType.EXTEND.name());
                    predicates.add(builder.or(pre1, pre2));
                }
            }
            predicates.add(QueryByExamplePredicateBuilder.getPredicate(root, builder, example));
            return builder.and(predicates.toArray(new Predicate[predicates.size()]));
        };
    }

    @Override
    public TableData<TransactionDto> getTransactions(TransactionQueryRequest request) {
        User user = authenticationService.getLoggedUser();
        Transaction searchTransaction = new Transaction();
        if (user.isClient()) {
            searchTransaction.setCustomer(user);
        }

        TableData<TransactionDto> tableData = new TableData<>();
        Sort sortBy = Sort.by(Sort.Direction.DESC, "createdAt");
        Pageable paging = PageRequest.of(request.getPage(), request.getPageSize(), sortBy);

        ExampleMatcher matcher = ExampleMatcher
                .matching();
        if (!request.getEmail().isEmpty()) {
            searchTransaction.setCustomer(User.builder().email(request.getEmail()).build());
        }
        Example<Transaction> example = Example.of(searchTransaction, matcher);
        Page<Transaction> item = transactionRepository.findAll(getSpecAndExample(request, example), paging);

        item.getContent().forEach(transaction -> {
            tableData.getData().add(transactionMapper.toDto(transaction));
        });
        tableData.setPages(item.getTotalPages());

        return tableData;
    }

    @Override
    @Transactional
    public TransactionDto createNewTransaction(@NonNull OrderProxyRequest request) {
        User user = authenticationService.getLoggedUser();
        Package salePackage = packageRepository.findByUuid(request.getPackageUuid());

        BigDecimal totalAmount = salePackage.getPrice()
                .multiply(new BigDecimal(request.getQuantity()))
                .multiply(new BigDecimal(request.getTime()));
        PackageType packageType = salePackage.getType();
        String ispRequest = salePackage.getIsp();
        log.info("Place order with total amount {}, isp {}", totalAmount, ispRequest);

        // 1. Check user balance
        if (totalAmount.compareTo(BigDecimal.ZERO) <= 0 || totalAmount.compareTo(user.getBalance()) > 0) {
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.INSUFFICIENT_BALANCE)
                            .message("Insufficient balance")
                            .build());
        }

        // 2. Count proxy by modem
        String modemForSale;
        if (CommonUtil.isEmpty(ispRequest)) {
            modemForSale = proxyRepository.getModemForSale(packageType.name());
        } else {
            modemForSale = proxyRepository.getModemForSaleByISP(packageType.name(), ispRequest);
        }

        log.info("Find sale modem: {}", modemForSale);
        if (CommonUtil.isEmpty(modemForSale)) {
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.PROXY_NOT_ENOUGH)
                            .message("The quantity of proxy was not enough")
                            .build());
        }

        // 4. Check available port quantity
        List<Proxy> httpProxyList;
        if (CommonUtil.isEmpty(ispRequest)) {
            httpProxyList = proxyRepository.findAvailableProxyByModem(UUID.fromString(modemForSale), PortType.HTTP);
        } else {
            httpProxyList = proxyRepository.findAvailableProxyByModemAndIsp(UUID.fromString(modemForSale), PortType.HTTP, ispRequest);
        }
        if (request.getQuantity() > httpProxyList.size()) {
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.PROXY_NOT_ENOUGH)
                            .message("The quantity of proxy was not enough")
                            .build());
        }

        // 5. Create purchase transaction
        List<String> transactionContent = new ArrayList();
        Transaction transaction = Transaction.builder()
                .customer(user)
                .amount(totalAmount)
                .currency("USD")
                .type(TransactionType.PURCHASE)
                .status(TransactionStatus.COMPLETED)
                .description("")
                .note("")
                .build();
        transactionRepository.save(transaction);

        // 6. Create license active
        List<Proxy> orderProxyList = httpProxyList.subList(0, request.getQuantity());
        List<License> activeLicenseList = new ArrayList<>();
        for (Proxy httpProxy : orderProxyList) {
            // 6.1 Create active license
            String authenticationUsers = null;
            String authenticationIps = null;
            if (CommonUtil.isEmpty(request.getWhiteListIps())) {
                authenticationUsers = CommonUtil.isEmpty(request.getUsername()) ? CommonUtil.generateAuthProxy() : request.getUsername();
            } else {
                authenticationIps = request.getWhiteListIps();
            }

            int sockPortMatch = httpProxy.getBrotherPort();
            log.info("_____Brother port of http port {} with sock port: {}", httpProxy.getSharedPort(), sockPortMatch);
            Optional<Proxy> sockProxy = proxyRepository.findBySharedPort(httpProxy.getModem(), sockPortMatch, PortType.SocksV5);

            // 6.2 Create license
            License license = License.builder()
                    .startDate(LocalDateTime.now())
                    .status(LicenseStatus.ACTIVE)
                    .customer(user)
                    .httpProxy(httpProxy)
                    .salePackage(salePackage)
                    .transaction(transaction)
                    .authUser(authenticationUsers)
                    .ipWhitelist(authenticationIps)
                    .location("")
                    .isp(ispRequest)
                    .modemType(httpProxy.getModemType())
                    .build();
            sockProxy.ifPresent(license::setSockProxy);

            if (salePackage.getPackageUnit() == PackageUnit.WEEK) {
                license.setExpiredDate(LocalDateTime.now().plusDays(7L * salePackage.getDuration() * request.getTime()));
            } else if (salePackage.getPackageUnit() == PackageUnit.MONTH) {
                license.setExpiredDate(LocalDateTime.now().plusMonths((long) salePackage.getDuration() * request.getTime()));
            } else {
                license.setExpiredDate(LocalDateTime.now().plusDays((long) salePackage.getDuration() * request.getTime()));
            }
            licenseRepository.save(license);
            activeLicenseList.add(license);
            transactionContent.add(license.getUuid().toString());

            // 6.2 Mark httpProxy used
            List<Integer> resetDataIds = new ArrayList<>();
            httpProxy.setSaleStatus(ProxySaleStatus.USED);
            httpProxy.setCounterUlUsedBytes(0L);
            httpProxy.setCounterDlUsedBytes(0L);
            httpProxy.setCounterAllUsedBytes(0L);
            proxyRepository.save(httpProxy);
            proxyService.updateAuthentication(httpProxy, license.getAuthUser(), license.getIpWhitelist());
            resetDataIds.add(httpProxy.getXproxyId());

            // 6.4 Mark sockProxy used
            sockProxy.ifPresent((sockP) -> {
                sockP.setSaleStatus(ProxySaleStatus.USED);
                sockP.setCounterUlUsedBytes(0L);
                sockP.setCounterDlUsedBytes(0L);
                sockP.setCounterAllUsedBytes(0L);
                proxyRepository.save(sockP);
                proxyService.updateAuthentication(sockP, license.getAuthUser(), license.getIpWhitelist());
                resetDataIds.add(sockP.getXproxyId());
            });
            // 6.4 Reset data counter
            xProxyService.resetDataCounter(httpProxy.getModem(), new ResetDataCounterReq(resetDataIds));
        }

        transaction.setDescription("License: " + String.join(",", transactionContent));
        transactionRepository.save(transaction);

        // 7. Update user balance
        user.setBalance(user.getBalance().subtract(totalAmount));
        userRepository.save(user);

        // 8. Send purchase email
        sendPurchaseEmail(user, activeLicenseList);

        return transactionMapper.toDto(null);
    }


    private void sendPurchaseEmail(User user, List<License> licenses) {
        try {
            String emailBody = configService.getEmailTemplate(ConfigurationType.EMAIL_TEMPLATE_PURCHASE.name());
            String itemStart = "[begin]";
            String itemEnd = "[end]";
            String itemReplace = "HERE_PROXY_INFO";
            String proxyInfo;
            emailBody = emailBody.replace("#USER_NAME", user.getName());
            proxyInfo = emailBody.substring(emailBody.indexOf(itemStart) + itemStart.length());
            proxyInfo = proxyInfo.substring(0, proxyInfo.indexOf(itemEnd));

            int firstPos = emailBody.indexOf(itemStart);
            int lastPos = emailBody.indexOf(itemEnd, firstPos) + itemEnd.length();
            String mainEmail = emailBody.substring(0, firstPos) + itemReplace + emailBody.substring(lastPos);

            List<String> arrProxyInfos = new ArrayList<>();
            for (int i = 0; i < licenses.size(); i++) {
                License license = licenses.get(i);
                Proxy httpProxy = license.getHttpProxy();
                Proxy socketProxy = license.getSockProxy();
                String format1 = httpProxy.getHost() + ":" + httpProxy.getSharedPort() + (CommonUtil.isEmpty(httpProxy.getAuthenticationUsers()) ? "" : ":" + httpProxy.getAuthenticationUsers());
                String format1_sock = socketProxy.getHost() + ":" + socketProxy.getSharedPort() + (CommonUtil.isEmpty(socketProxy.getAuthenticationUsers()) ? "" : ":" + socketProxy.getAuthenticationUsers());
                String linkStatus = "http://" + serverIp + "/proxyapi/v1/api/proxy/status?license=" + license.getUuid().toString();
                String linkChangeIp = "http://" + serverIp + "/proxyapi/v1/api/proxy/change-ip?license=" + license.getUuid().toString();

                arrProxyInfos.add((i + 1 + ".") + "" + proxyInfo
                        .replace("#PACKAGE_NAME", license.getSalePackage().getName())
                        .replace("#START_DATE", license.getStartDate().format(DateTimeFormatter.ofPattern("HH:mm dd-MM-yyyy")))
                        .replace("#END_DATE", license.getExpiredDate().format(DateTimeFormatter.ofPattern("HH:mm dd-MM-yyyy")))
                        .replace("#FORMAT_HTTP", format1)
                        .replace("#FORMAT_SOCK5", format1_sock)
                        .replace("#AUTHENTICATION", httpProxy.getAuthenticationUsers())
                        .replace("#LINK_STATUS", linkStatus)
                        .replace("#LINK_CHANGE_IP", linkChangeIp));
            }

            String finalMail = mainEmail.replace(itemReplace, String.join("\n", arrProxyInfos));
            EmailDetails emailDetails = EmailDetails.builder()
                    .subject(appConf.getName() + " - Thank You For Your Purchase")
                    .msgBody(finalMail)
                    .recipient(user.getEmail())
                    .build();
            String result = emailService.sendSimpleMail(emailDetails);
            log.info("SEND EMAIL: {}", result);
        } catch (Exception e) {
            log.error("_____ ERROR WHEN SEND MAIL", e);
        }
    }

    @Override
    public TransactionDto updateTransaction(@NonNull UUID uuid, @NonNull TransactionRequest transactionRequest) {
        Transaction neoTransaction = transactionRepository.findByUuid(uuid);
        if (neoTransaction == null)
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.BAD_DATA)
                            .message("could not find transaction with this uuid")
                            .build());

        neoTransaction.setStatus(transactionRequest.getStatus());

        transactionRepository.save(neoTransaction);

        return transactionMapper.toDto(neoTransaction);
    }

    @Override
    public boolean deleteTransaction(@NonNull UUID uuid) {
        return false;
    }

    @Override
    public TransactionDto topup(UUID customerUUID, BigDecimal amount) {
        User adminUser = authenticationService.getLoggedUser();
        if (adminUser.isClient()) {
            return null;
        }

        // 1. Find user by transfer content
        Optional<User> userOptional = userRepository.findByUuid(customerUUID);
        if (userOptional.isEmpty()) {
            log.error("Not found user");
            return null;
        }
        User user = userOptional.get();
        // 2. Update new balance
        user.setBalance(user.getBalance().add(amount));
        userRepository.save(user);
        // 3. Create transaction
        Transaction transaction = Transaction.builder()
                .customer(user)
                .amount(amount)
                .currency("USD")
                .type(TransactionType.TOPUP)
                .status(TransactionStatus.COMPLETED)
                .description(adminUser.getName() + " - TOPUP " + amount + " USD")
                .build();
        transactionRepository.save(transaction);

        return transactionMapper.toDto(transaction);
    }

    @Override
    public TransactionDto refund(UUID customerUUID, BigDecimal amount) {
        User adminUser = authenticationService.getLoggedUser();
        if (adminUser.isClient()) {
            return null;
        }

        // 1. Find user by transfer content
        Optional<User> userOptional = userRepository.findByUuid(customerUUID);
        if (userOptional.isEmpty()) {
            log.error("Not found user");
            return null;
        }
        User user = userOptional.get();
        if (amount.compareTo(user.getBalance()) > 0) {
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.INSUFFICIENT_BALANCE)
                            .message("User account is not enough.")
                            .build());
        }

        // 2. Update new balance
        user.setBalance(user.getBalance().subtract(amount));
        userRepository.save(user);
        // 3. Create transaction
        Transaction transaction = Transaction.builder()
                .customer(user)
                .amount(amount)
                .currency("USD")
                .type(TransactionType.REFUND)
                .status(TransactionStatus.COMPLETED)
                .description(adminUser.getName() + " - REFUND " + amount + "USD")
                .build();
        transactionRepository.save(transaction);

        return transactionMapper.toDto(transaction);
    }
}
