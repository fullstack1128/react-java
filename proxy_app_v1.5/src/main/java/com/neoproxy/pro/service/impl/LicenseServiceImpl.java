package com.neoproxy.pro.service.impl;
import com.neoproxy.pro.config.AppConf;
import com.neoproxy.pro.domain.Package;
import com.neoproxy.pro.domain.*;
import com.neoproxy.pro.dto.*;
import com.neoproxy.pro.enums.*;
import com.neoproxy.pro.mail.EmailDetails;
import com.neoproxy.pro.mail.EmailService;
import com.neoproxy.pro.mapper.*;
import com.neoproxy.pro.repository.*;
import com.neoproxy.pro.service.AuthenticationService;
import com.neoproxy.pro.service.ConfigurationService;
import com.neoproxy.pro.service.LicenseService;
import com.neoproxy.pro.service.ProxyService;
import com.neoproxy.pro.service.exception.NeoProxyServiceException;
import com.neoproxy.pro.utils.CommonUtil;
import com.neoproxy.pro.utils.DateUtil;
import com.neoproxy.pro.xproxy.model.PortType;
import com.neoproxy.pro.xproxy.model.ProxyInfoReq;
import com.neoproxy.pro.xproxy.model.ResetDataCounterReq;
import com.neoproxy.pro.xproxy.service.XProxyService;
import com.opencsv.CSVReader;
import lombok.AccessLevel;
import lombok.NonNull;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.convert.QueryByExamplePredicateBuilder;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.Predicate;
import javax.transaction.Transactional;
import java.io.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

@Service
//@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class LicenseServiceImpl implements LicenseService {
    @Value("${server.ip}")
    private String serverIp;
    AppConf appConf;
    AuthenticationService authenticationService;
    LicenseRepository licenseRepository;
    UserRepository userRepository;
    PackageRepository packageRepository;
    ProxyRepository proxyRepository;
    XProxyService xProxyService;
    TransactionRepository transactionRepository;
    ProxyService proxyService;
    ModemRepository modemRepository;
    LicenseMapper licenseMapper = new LicenseMapperImpl();
    ConfigurationService configService;
    EmailService emailService;

    public LicenseServiceImpl(AuthenticationService authenticationService, LicenseRepository licenseRepository, UserRepository userRepository, PackageRepository packageRepository, ProxyRepository proxyRepository, XProxyService xProxyService, TransactionRepository transactionRepository, ProxyService proxyService, ModemRepository modemRepository, ConfigurationService configService, EmailService emailService, AppConf appConf) {
        this.serverIp = null;
        this.authenticationService = authenticationService;
        this.licenseRepository = licenseRepository;
        this.userRepository = userRepository;
        this.packageRepository = packageRepository;
        this.proxyRepository = proxyRepository;
        this.xProxyService = xProxyService;
        this.transactionRepository = transactionRepository;
        this.proxyService = proxyService;
        this.modemRepository = modemRepository;
        this.configService = configService;
        this.emailService = emailService;
        this.appConf = appConf;
    }

    public Specification<License> getSpecAndExample(LicenseQueryRequest request, Example<License> example) {
        return (Specification<License>) (root, query, builder) -> {
            final List<Predicate> predicates = new ArrayList<>();
            if (!CommonUtil.isEmpty(request.getExpiredDateFrom())) {
                predicates.add(builder.greaterThanOrEqualTo(root.get("expiredDate"), DateUtil.convertIsoStringToDate(request.getExpiredDateFrom())));
            }
            if (!CommonUtil.isEmpty(request.getExpiredDateTo())) {
                predicates.add(builder.lessThanOrEqualTo(root.get("expiredDate"), DateUtil.convertIsoStringToDate(request.getExpiredDateTo())));
            }
            if (!CommonUtil.isEmpty(request.getCreatedDateFrom())) {
                predicates.add(builder.greaterThanOrEqualTo(root.get("createdAt"), DateUtil.convertIsoStringToDate(request.getCreatedDateFrom())));
            }
            if (!CommonUtil.isEmpty(request.getCreatedDateTo())) {
                predicates.add(builder.lessThanOrEqualTo(root.get("createdAt"), DateUtil.convertIsoStringToDate(request.getCreatedDateTo())));
            }
            if (!request.getName().isEmpty()) {
                predicates.add(builder.like(root.get("uuid").as(String.class), "%" + request.getName() + "%"));
            }
            if (!request.getTransactionId().isEmpty()) {
                predicates.add(builder.like(root.get("transaction").get("uuid").as(String.class), "%" + request.getTransactionId() + "%"));
            }

            if (request.getPort() != -1) {
                Predicate pre1 = builder.equal(root.get("httpProxy").get("sharedPort"), request.getPort());
                Predicate pre2 = builder.equal(root.get("sockProxy").get("sharedPort"), request.getPort());
                predicates.add(builder.or(pre1, pre2));
            }
            if (!request.getAuthUsername().isEmpty()) {
                predicates.add(builder.like(root.get("authUser"), "%" + request.getAuthUsername() + "%"));
            }
            if (!request.getAuthIps().isEmpty()) {
                predicates.add(builder.like(root.get("ipWhitelist"), "%" + request.getAuthIps() + "%"));
            }

            predicates.add(QueryByExamplePredicateBuilder.getPredicate(root, builder, example));
            return builder.and(predicates.toArray(new Predicate[predicates.size()]));
        };
    }

    @Override
    public TableData<LicenseDto> getLicenses(LicenseQueryRequest request) {
        User user = authenticationService.getLoggedUser();
        License searchLicense = new License();
        if (user.isClient()) {
            searchLicense.setCustomer(user);
        }

        TableData<LicenseDto> agentTable = new TableData<>();
        Sort sortBy = Sort.by(Sort.Direction.ASC, "status", "createdAt");
        Pageable paging = PageRequest.of(request.getPage(), request.getPageSize(), sortBy);

        ExampleMatcher matcher = ExampleMatcher
                .matching();
        if (!request.getStatus().isEmpty()) {
            searchLicense.setStatus(LicenseStatus.valueOf(request.getStatus()));
        }
        if (!request.getModemId().isEmpty()) {
            searchLicense.setHttpProxy(Proxy.builder().modem(Modem.builder().uuid(UUID.fromString(request.getModemId())).build()).build());
        }
        if (!request.getCustomerId().isEmpty()) {
            searchLicense.setCustomer(User.builder().uuid(UUID.fromString(request.getCustomerId())).build());
        }
        if (!request.getLocation().isEmpty()) {
            searchLicense.setLocation(request.getLocation());
        }
        if (!request.getPackageId().isEmpty()) {
            searchLicense.setSalePackage(Package.builder().uuid(UUID.fromString(request.getPackageId())).build());
        }

        Example<License> example = Example.of(searchLicense, matcher);
        Page<License> item = licenseRepository.findAll(getSpecAndExample(request, example), paging);

        item.getContent().forEach(license -> {
            LicenseDto licenseDto = licenseMapper.toDto(license);
            agentTable.getData().add(licenseDto);
        });
        agentTable.setPages(item.getTotalPages());

        return agentTable;
    }

    @Override
    public LicenseDto updateLicense(@NonNull UUID uuid, @NonNull LicenseRequest licenseRequest) {
        License neoLicense = licenseRepository.findByUuid(uuid);
        if (neoLicense == null)
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.BAD_DATA)
                            .message("could not find license with this uuid")
                            .build());

        Package salePackage = packageRepository.findByUuid(licenseRequest.getSalePackageId());
        neoLicense.setExpiredDate(licenseRequest.getExpiredDate());
        neoLicense.setSalePackage(salePackage);
        neoLicense.setAuthUser(licenseRequest.getAuthUser());
        neoLicense.setIpWhitelist(licenseRequest.getIpWhitelist());

        // Assigned new proxy for the active license
        if (licenseRequest.getStatus().equals(LicenseStatus.ACTIVE) && !neoLicense.getStatus().equals(LicenseStatus.ACTIVE)) {
            String ispRequest = salePackage.getIsp();
            String modemForSale = proxyRepository.getModemForSaleByISP(PackageType.MOBILE.name(), ispRequest);
            log.info("Find sale modem: {}", modemForSale);
            if (CommonUtil.isEmpty(modemForSale)) {
                throw new NeoProxyServiceException(
                        ExceptionDetail.builder()
                                .status(HttpStatus.BAD_REQUEST)
                                .errorCode(ErrorCode.PROXY_NOT_ENOUGH)
                                .message("The quantity of proxy was not enough")
                                .build());
            }
            List<Proxy> httpProxyList = proxyRepository.findAvailableProxyByModemAndIsp(UUID.fromString(modemForSale), PortType.HTTP, ispRequest);
            if (httpProxyList.isEmpty()) {
                throw new NeoProxyServiceException(
                        ExceptionDetail.builder()
                                .status(HttpStatus.BAD_REQUEST)
                                .errorCode(ErrorCode.PROXY_NOT_ENOUGH)
                                .message("The quantity of proxy was not enough")
                                .build());
            }

            // 6. Create license active
            Proxy httpProxy = httpProxyList.get(0);
            // 6.1 Create active license
            String authenticationUsers = neoLicense.getAuthUser();
            String authenticationIps = neoLicense.getIpWhitelist();
            int sockPortMatch = httpProxy.getBrotherPort();
            log.info("_____Brother port of http port {} with sock port: {}", httpProxy.getSharedPort(), sockPortMatch);
            Optional<Proxy> sockProxy = proxyRepository.findBySharedPort(httpProxy.getModem(), sockPortMatch, PortType.SocksV5);

            // 6.2 Create license
            neoLicense.setHttpProxy(httpProxy);
            sockProxy.ifPresent(neoLicense::setSockProxy);
            licenseRepository.save(neoLicense);

            // 6.2 Mark httpProxy used
            List<Integer> resetDataIds = new ArrayList<>();
            httpProxy.setSaleStatus(ProxySaleStatus.USED);
            httpProxy.setCounterUlUsedBytes(0L);
            httpProxy.setCounterDlUsedBytes(0L);
            httpProxy.setCounterAllUsedBytes(0L);
            proxyRepository.save(httpProxy);
            proxyService.updateAuthentication(httpProxy, neoLicense.getAuthUser(), neoLicense.getIpWhitelist());
            resetDataIds.add(httpProxy.getXproxyId());

            // 6.4 Mark sockProxy used
            sockProxy.ifPresent((sockP) -> {
                sockP.setSaleStatus(ProxySaleStatus.USED);
                sockP.setCounterUlUsedBytes(0L);
                sockP.setCounterDlUsedBytes(0L);
                sockP.setCounterAllUsedBytes(0L);
                proxyRepository.save(sockP);
                proxyService.updateAuthentication(sockP, neoLicense.getAuthUser(), neoLicense.getIpWhitelist());
                resetDataIds.add(sockP.getXproxyId());
            });
            // 6.4 Reset data counter
            xProxyService.resetDataCounter(httpProxy.getModem(), new ResetDataCounterReq(resetDataIds));
        } else if (licenseRequest.getStatus() != LicenseStatus.ACTIVE) {
            log.info("--- Update expired license");
            updateExpiredLicense(neoLicense);
        }

        neoLicense.setStatus(licenseRequest.getStatus());
        licenseRepository.save(neoLicense);

        return licenseMapper.toDto(neoLicense);
    }

    @Override
    @Transactional
    public boolean extendByLicenseIds(ExtendLicenseRequest request) {
        User user = authenticationService.getLoggedUser();

        // 1.0 Find by proxy
        List<License> licenseList = licenseRepository.getLicenseByUuids(user, request.getUuids(), LicenseStatus.ACTIVE);
        if (licenseList.isEmpty()) {
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.LICENSE_ACTIVE_NOT_FOUND)
                            .message("The licenses was not found or not active.")
                            .build());
        }

        // 2.0 Check user balance have enough to extend list license
        double totalAmount = licenseList.stream().map(i -> i.getSalePackage().getPrice()).mapToDouble(BigDecimal::doubleValue).sum();
        BigDecimal totalPrice = new BigDecimal(totalAmount);

        if (user.getBalance().compareTo(totalPrice) < 0) {
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.INSUFFICIENT_BALANCE)
                            .message("Account has insufficient balance")
                            .build());
        }
        // 3. Update new balance after extend
        user.setBalance(user.getBalance().subtract(totalPrice));
        userRepository.save(user);

        // 4. Create EXTEND transation
        Transaction transaction = Transaction.builder()
                .customer(user)
                .amount(totalPrice)
                .currency("USD") // TODO config
                .type(TransactionType.EXTEND)
                .status(TransactionStatus.COMPLETED)
                .description("License " + request.getUuids())
                .note("")
                .build();
        transactionRepository.save(transaction);

        // 5. Extend for each license
        request.getUuids().forEach(this::extendLicense);

        return true;
    }

    private boolean extendLicense(UUID uuid) {
        License license = licenseRepository.findByUuid(uuid);
        if (license != null) {
            Package salePackage = license.getSalePackage();
            // Determine the expiration time
            LocalDateTime currentDateTime = license.getExpiredDate().isAfter(LocalDateTime.now()) ? license.getExpiredDate() : LocalDateTime.now();
            if (salePackage.getPackageUnit() == PackageUnit.WEEK) {
                license.setExpiredDate(currentDateTime.plusDays(7L * salePackage.getDuration()));
            } else if (salePackage.getPackageUnit() == PackageUnit.MONTH) {
                license.setExpiredDate(currentDateTime.plusMonths(salePackage.getDuration()));
            } else {
                license.setExpiredDate(currentDateTime.plusDays(salePackage.getDuration()));
            }
            licenseRepository.save(license);
        }
        return true;
    }

    @Override
    public Integer getTotalActiveLicense(ModemType modemType) {
        return licenseRepository.countLicenseByStatus(LicenseStatus.ACTIVE, modemType);
    }

    @Override
    public Integer getTotalExpiredLicenses(ModemType modemType) {
        LocalDate startDate = LocalDate.now();
        LocalDateTime startTime = startDate.atStartOfDay();
        LocalDateTime endTime = startTime.plusDays(1);
        return licenseRepository.countExpiredLicenseByDate(startTime, endTime, modemType);
    }

    @Override
    public Integer getTotalLicenseByUser() {
        User user = authenticationService.getLoggedUser();
        return licenseRepository.countLicenseByUser(user, LicenseStatus.ACTIVE);
    }

    @Override
    public Integer getTotalExpiredLicensesByUser() {
        User user = authenticationService.getLoggedUser();
        LocalDate startDate = LocalDate.now();
        LocalDateTime startTime = startDate.atStartOfDay();
        LocalDateTime endTime = startTime.plusDays(1);
        log.info(startDate + " - " + endTime);
        return licenseRepository.countExpiredLicenseByUser(user, startTime, endTime);
    }

    @Override
    public List<License> getExpiredLicenses() {
        return licenseRepository.getExpiredLicenses(LocalDateTime.now(), LicenseStatus.ACTIVE);
    }

    @Override
    public List<License> getRemindLicenses() {
        return licenseRepository.getReminderLicenses(LocalDateTime.now().plusDays(1), LicenseStatus.ACTIVE);
    }

    @Override
    public boolean updateExpiredLicense(License license) {
        // 1. Update proxy available status
        List<Integer> proxyIds = new ArrayList<>();
        Optional<Proxy> httpProxy = Optional.ofNullable(license.getHttpProxy());
        Optional<Proxy> sockProxy = Optional.ofNullable(license.getSockProxy());

        httpProxy.ifPresent(p -> {
            updateProxyAvailable(proxyIds, p);
        });

        sockProxy.ifPresent(p -> {
            updateProxyAvailable(proxyIds, p);
        });

        // 2. Update license expired status
        license.setStatus(LicenseStatus.EXPIRED);
        license.setHttpProxy(null);
        license.setSockProxy(null);
        licenseRepository.save(license);

        return true;
    }

    @Override
    public boolean remindExpiredLicense(License license) {
        String emailBody = configService.getEmailTemplate(ConfigurationType.EMAIL_TEMPLATE_EXPIRING.name());
        Proxy httpProxy = license.getHttpProxy();
        Proxy socketProxy = license.getSockProxy();
        String format1 = httpProxy.getHost() + ":" + httpProxy.getSharedPort() + (CommonUtil.isEmpty(httpProxy.getAuthenticationUsers()) ? "" : ":" + httpProxy.getAuthenticationUsers());
        String format1_sock = socketProxy.getHost() + ":" + socketProxy.getSharedPort() + (CommonUtil.isEmpty(socketProxy.getAuthenticationUsers()) ? "" : ":" + socketProxy.getAuthenticationUsers());

        emailBody = emailBody
                .replace("#USER_NAME", license.getCustomer().getName())
                .replace("#PACKAGE_NAME", license.getSalePackage().getName())
                .replace("#START_DATE", license.getStartDate().format(DateTimeFormatter.ofPattern("HH:mm dd-MM-yyyy")))
                .replace("#END_DATE", license.getExpiredDate().format(DateTimeFormatter.ofPattern("HH:mm dd-MM-yyyy")))
                .replace("#FORMAT_HTTP", format1)
                .replace("#FORMAT_SOCK5", format1_sock);
        EmailDetails emailDetails = EmailDetails.builder()
                .subject(appConf.getName() + " - Thank You For Your Purchase")
                .msgBody(emailBody)
                .recipient(license.getCustomer().getEmail())
                .build();
        emailService.sendSimpleMail(emailDetails);
        return true;
    }

    private void updateProxyAvailable(List<Integer> proxyIds, Proxy p) {
        p.setSaleStatus(ProxySaleStatus.AVAILABLE);
        p.setAuthenticationUsers(null);
        p.setAuthorizationIps(null);
        proxyRepository.save(p);
        proxyIds.add(p.getXproxyId());
        ProxyInfoReq proxyInfoReq = new ProxyInfoReq("", "", proxyIds);
        boolean result = xProxyService.bulkEdit(p.getModem(), proxyInfoReq);
        log.info("Update expired license with proxy {} with status {}", p.getUuid(), result);
    }

    @Override
    public boolean switchToNewModem(SwitchModemRequest request) {
        for (UUID targetLicenseId : request.getLicenseUuids()) {
            log.info("[Swith to new modem]");
            License targetLicense = licenseRepository.findByUuid(targetLicenseId);
            Modem targetModem = modemRepository.findByUuid(request.getModemId());

            // 1.0 Check modemType
            if (!targetModem.getType().equals(targetLicense.getModemType())) {
                throw new NeoProxyServiceException(
                        ExceptionDetail.builder()
                                .status(HttpStatus.BAD_REQUEST)
                                .errorCode(ErrorCode.MODEM_ERROR_CONNECT)
                                .message("Cannot change modem because License belongs to different modem type.")
                                .build());
            }

            // 2.0 Check location of modem
            if (!CommonUtil.isEmpty(targetLicense.getLocation())) {
                if (!targetModem.getLocation().equals(targetLicense.getLocation())) {
                    throw new NeoProxyServiceException(
                            ExceptionDetail.builder()
                                    .status(HttpStatus.BAD_REQUEST)
                                    .errorCode(ErrorCode.MODEM_ERROR_CONNECT)
                                    .message("The modem cannot be changed because the License is in another location, please choose the same modem again or change the location of the License.")
                                    .build());
                }
            }

            // 3.0 Get list available proxy
            List<Proxy> httpProxyList = proxyRepository.findAvailableProxyByModem(request.getModemId(), PortType.HTTP);
            if (httpProxyList.isEmpty()) {
                throw new NeoProxyServiceException(
                        ExceptionDetail.builder()
                                .status(HttpStatus.BAD_REQUEST)
                                .errorCode(ErrorCode.PROXY_ACTIVE_NOT_FOUND)
                                .message("No active proxy found.")
                                .build());
            }

            // 4.1 Clear authentication for old proxy
            String newAuthenReset = CommonUtil.generateAuthProxy();
            List<Integer> proxyIds = new ArrayList<>();

            Proxy oldHttpProxy = targetLicense.getHttpProxy();
            if (oldHttpProxy != null) {
                proxyIds.add(oldHttpProxy.getXproxyId());
                oldHttpProxy.setSaleStatus(ProxySaleStatus.AVAILABLE);
                oldHttpProxy.setAuthenticationUsers(newAuthenReset);
                oldHttpProxy.setAuthorizationIps(null);
                proxyRepository.save(oldHttpProxy);
                targetLicense.setHttpProxy(null);
            }

            Proxy oldSockProxy = targetLicense.getSockProxy();
            if (oldSockProxy != null) {
                proxyIds.add(oldSockProxy.getXproxyId());
                oldSockProxy.setSaleStatus(ProxySaleStatus.AVAILABLE);
                oldSockProxy.setAuthenticationUsers(newAuthenReset);
                oldSockProxy.setAuthorizationIps(null);
                proxyRepository.save(oldSockProxy);
                targetLicense.setSockProxy(null);
            }

            ProxyInfoReq proxyInfoReq = new ProxyInfoReq("", newAuthenReset, proxyIds);
            boolean result = xProxyService.bulkEdit(oldHttpProxy.getModem(), proxyInfoReq);
            log.info("Done reset old proxy with result {}", result);

            // 4.2 Update authenticate for new proxy
            Proxy newHttpProxy = httpProxyList.get(0);
            Optional<Proxy> newSockProxy = proxyRepository.findBySharedPort(newHttpProxy.getModem(), newHttpProxy.getBrotherPort(), PortType.SocksV5);

            newHttpProxy.setSaleStatus(ProxySaleStatus.USED);
            proxyRepository.save(newHttpProxy);
            proxyService.updateAuthentication(newHttpProxy, targetLicense.getAuthUser(), targetLicense.getIpWhitelist());
            targetLicense.setHttpProxy(newHttpProxy);

            newSockProxy.ifPresent(p -> {
                p.setSaleStatus(ProxySaleStatus.USED);
                proxyRepository.save(p);
                proxyService.updateAuthentication(p, targetLicense.getAuthUser(), targetLicense.getIpWhitelist());
                targetLicense.setSockProxy(p);
            });

            targetLicense.setLocation(newHttpProxy.getModem().getLocation());
            targetLicense.setLastChangeIp(LocalDateTime.now());
            licenseRepository.save(targetLicense);
        }
        return true;
    }

    @Override
    public boolean updateLicenseStatus(UpdateLicenseStatusRequest request) {
        for (UUID licenseId : request.getUuids()) {
            License targetLicense = licenseRepository.findByUuid(licenseId);
            if (targetLicense == null)
                continue;
            if (targetLicense.getStatus() == LicenseStatus.EXPIRED) {
                continue;
            }
            if (request.getLicenseStatus().equals(LicenseStatus.EXPIRED)) {
                log.info("--------------- Update expired license");
                updateExpiredLicense(targetLicense);
            } else {
                targetLicense.setStatus(targetLicense.getStatus().equals(LicenseStatus.ACTIVE) ? LicenseStatus.PENDING : LicenseStatus.ACTIVE);
                licenseRepository.save(targetLicense);
            }
        }
        return true;
    }

    @Override
    public boolean changeRotationTime(ChangeRotationTimeRequest request) {
        User user = authenticationService.getLoggedUser();
        List<License> licenseList = licenseRepository.getLicenseByUuids(user, request.getUuids(), LicenseStatus.ACTIVE);
        if (licenseList.isEmpty()) {
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.LICENSE_ACTIVE_NOT_FOUND)
                            .message("The licenses was not found or not active.")
                            .build());
        }

        licenseList.forEach(license -> {
            license.setAutoRotationTime(request.getAutoRotationTime());
            licenseRepository.save(license);
        });
        return true;
    }

    @Override
    public String importLicense(ImportLicenseRequest request) {
        log.info("____ Import license name: " + request.getFileName());
        // 1.0 Parse data
        List<String[]> data = null;
        try {
            try (InputStream initialStream = new ByteArrayInputStream(request.getContents());) {
                Reader targetReader = new InputStreamReader(initialStream);
                try (CSVReader reader = new CSVReader(targetReader)) {
                    data = reader.readAll();
                }
            }
        } catch (Exception ex) {
            log.error("Exception when read import file", ex);
        }

        if (data == null || data.isEmpty()) {
            log.info("_____ No import data found.");
            return "No import data found.";
        }

        List<Package> salePackages = packageRepository.findActivePackages(PackageStatus.ACTIVE);
        if (salePackages.isEmpty()) {
            log.info("_____ No package found.");
            return "No package found.";
        }

        // 1.0 Find modem
        List<Modem> modemList = modemRepository.findAll();
        if (modemList.isEmpty()) {
            return "No modem found";
        }

        // 2.0 Import license
        AtomicInteger rowIdx = new AtomicInteger(0);
        List<String> importResults = new ArrayList<>();
        data.remove(0); // Remove header text
        data.forEach(row -> {
            try {
                rowIdx.getAndIncrement();
                String result;
                if (CommonUtil.isEmpty(row[0]) || CommonUtil.isEmpty(row[3])) {
                    result = "No import";
                } else {
                    ImportData importData = ImportData.builder()
                            .domain(row[0])
                            .position(Integer.parseInt(row[1]))
                            .customerName(row[2])
                            .customerId(UUID.fromString(row[3]))
                            .licenseExpiresAt(DateUtil.convertImportDateToDate(row[4]))
                            .build();
                    result = addLicenseFromImport(importData, modemList, salePackages);
                }
                String importResult = "Row " + rowIdx + ": " + result;
                importResults.add(importResult);
            } catch (Exception e) {
                log.info("ERROR WHEN IMPORT " + e.getMessage());
                String importResult = "Row " + rowIdx + ": Error import.";
                importResults.add(importResult);
            }
        });

        return String.join("<br/>", importResults);
    }

    @Override
    public void getImportTemplate(PrintWriter writer) {
        try (CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.EXCEL)) {
            csvPrinter.printRecord(
                    "Domain",
                    "Position",
                    "Customer",
                    "Customer Id",
                    "End date (dd-MM-yyyy HH:mm)"
            );
            csvPrinter.printRecord(
                    "http://domain-of-sale-web:port",
                    1,
                    "Customer name",
                    "29fcb7da-c08b-4f97-ba74-5bf1f220ad63",
                    "29-12-22 00:00"
            );

        } catch (IOException e) {
            log.error("Error While writing CSV ", e);
        }
    }

    @Override
    public void writeLicenseToCsv(String customer, String format, PrintWriter writer) {
        Optional<User> user = userRepository.findByUuid(UUID.fromString(customer));
        if (user.isEmpty()) {
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.USER_NOT_FOUND)
                            .message("User not found")
                            .build());
        }

        List<License> licenseList = licenseRepository.findLicensesByUser(UUID.fromString(customer), LicenseStatus.ACTIVE);
        try (CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.EXCEL)) {
            if (format.equals("undefined")) {
                csvPrinter.printRecord(
                        "LicenseCode",
                        "StartDate",
                        "EndDate",
                        "PackageName",
                        "FormatHttp",
                        "FormatSock5",
                        "IPWhiteList",
                        "Authentication",
                        "RotationTime",
                        "LinkChangeIP",
                        "LinkStatus"
                );
            }
            for (License license : licenseList) {
                Proxy httpProxy = license.getHttpProxy();
                Proxy socketProxy = license.getSockProxy();
                if (httpProxy != null && socketProxy != null) {
                    String format1 = httpProxy.getHost() + ":" + httpProxy.getSharedPort() + (CommonUtil.isEmpty(httpProxy.getAuthenticationUsers()) ? "" : ":" + httpProxy.getAuthenticationUsers());
                    String format2 = (CommonUtil.isEmpty(httpProxy.getAuthenticationUsers()) ? "" : httpProxy.getAuthenticationUsers() + "@") + httpProxy.getHost() + ":" + httpProxy.getSharedPort();
                    String format3 = httpProxy.getHost() + ":" + httpProxy.getSharedPort();
                    String format1_sock = socketProxy.getHost() + ":" + socketProxy.getSharedPort() + (CommonUtil.isEmpty(socketProxy.getAuthenticationUsers()) ? "" : ":" + socketProxy.getAuthenticationUsers());
                    String format2_sock = (CommonUtil.isEmpty(socketProxy.getAuthenticationUsers()) ? "" : socketProxy.getAuthenticationUsers() + "@") + socketProxy.getHost() + ":" + socketProxy.getSharedPort();
                    String format3_sock = socketProxy.getHost() + ":" + socketProxy.getSharedPort();
                    String linkChangeIp = "http://" + serverIp + "/proxyapi/v1/api/proxy/change-ip?license=" + license.getUuid().toString();
                    String linkStatus = "http://" + serverIp + "/proxyapi/v1/api/proxy/status?license=" + license.getUuid().toString();
                    switch (String.valueOf(format)) {
                        case "format-http-1":
                            csvPrinter.printRecord(format1);
                            break;
                        case "format-socks5-1":
                            csvPrinter.printRecord(format1_sock);
                            break;
                        case "format-http-2":
                            csvPrinter.printRecord(format2);
                            break;
                        case "format-socks5-2":
                            csvPrinter.printRecord(format2_sock);
                            break;
                        case "format-http-3":
                            csvPrinter.printRecord(format3);
                            break;
                        case "format-socks5-3":
                            csvPrinter.printRecord(format3_sock);
                            break;
                        case "change-ip-links":
                            csvPrinter.printRecord(linkChangeIp);
                            break;
                        case "status-links":
                            csvPrinter.printRecord(linkStatus);
                            break;
                        case "null":
                        case "undefined":
                        default:
                            csvPrinter.printRecord(
                                    license.getUuid().toString(),
                                    license.getStartDate().format(DateTimeFormatter.ofPattern("HH:mm dd-MM-yyyy")),
                                    license.getExpiredDate().format(DateTimeFormatter.ofPattern("HH:mm dd-MM-yyyy")),
                                    license.getSalePackage().getName(),
                                    format1,
                                    format1_sock,
                                    httpProxy.getAuthorizationIps(),
                                    httpProxy.getAuthenticationUsers(),
                                    license.getAutoRotationTime(),
                                    linkChangeIp,
                                    linkStatus
                            );
                            break;
                    }

                }
            }
        } catch (IOException e) {
            log.error("Error While writing CSV ", e);
        }

    }

    private String addLicenseFromImport(ImportData importData, List<Modem> modemList, List<Package> salePackages) {
        // 1.0 Find modem
        Modem modem = modemList.stream().filter(m -> m.getDomain().equals(importData.getDomain())).findFirst().orElse(null);
        if (modem == null) {
            return "No modem found";
        }

        // 1.0 Find package
        Package salePackage = salePackages.stream().filter(m -> m.getIsp().equals(modem.getIsp())).findFirst().orElse(null);
        if (salePackage == null) {
            return "No package found";
        }

        // 2.0 Find customer
        Optional<User> userOptional = userRepository.findByUuid(importData.getCustomerId());
        if (userOptional.isEmpty()) {
            return "No customer found";
        }

        // 3.0 Find available proxy
        List<Proxy> httpProxyList = proxyRepository.findAvailableProxyByPosition(
                modem.getUuid(),
                PortType.HTTP,
                importData.getPosition()
        );
        if (httpProxyList.isEmpty()) {
            return "No proxy found";
        }
        Proxy httpProxy = httpProxyList.get(0);

        // 6.1 Create active license
        String authenticationUsers = CommonUtil.generateAuthProxy();

        int sockPortMatch = httpProxy.getBrotherPort();
        log.info("_____Brother port of http port {} with sock port: {}", httpProxy.getSharedPort(), sockPortMatch);
        Optional<Proxy> sockProxy = proxyRepository.findBySharedPort(httpProxy.getModem(), sockPortMatch, PortType.SocksV5);

        // 6.2 Create license
        License license = License.builder()
                .startDate(LocalDateTime.now())
                .status(LicenseStatus.ACTIVE)
                .customer(userOptional.get())
                .httpProxy(httpProxy)
                .salePackage(salePackage)
                .transaction(null)
                .authUser(authenticationUsers)
                .ipWhitelist(null)
                .location(modem.getLocation())
                .isp(modem.getIsp())
                .modemType(httpProxy.getModemType())
                .build();
        sockProxy.ifPresent(license::setSockProxy);
        license.setExpiredDate(importData.getLicenseExpiresAt());
        licenseRepository.save(license);

        // 6.2 Mark httpProxy used
        List<Integer> resetDataIds = new ArrayList<>();
        httpProxy.setSaleStatus(ProxySaleStatus.USED);
        proxyRepository.save(httpProxy);
        proxyService.updateAuthentication(httpProxy, license.getAuthUser(), license.getIpWhitelist());
        resetDataIds.add(httpProxy.getXproxyId());

        // 6.4 Mark sockProxy used
        sockProxy.ifPresent((sockP) -> {
            sockP.setSaleStatus(ProxySaleStatus.USED);
            proxyRepository.save(sockP);
            proxyService.updateAuthentication(sockP, license.getAuthUser(), license.getIpWhitelist());
            resetDataIds.add(sockP.getXproxyId());
        });
        // 6.4 Reset data counter
        // xProxyService.resetDataCounter(httpProxy.getModem(), new ResetDataCounterReq(resetDataIds));

        return "Success";
    }
}
