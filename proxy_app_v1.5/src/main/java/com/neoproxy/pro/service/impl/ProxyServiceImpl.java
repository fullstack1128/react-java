package com.neoproxy.pro.service.impl;

import com.neoproxy.pro.domain.License;
import com.neoproxy.pro.domain.Modem;
import com.neoproxy.pro.domain.Proxy;
import com.neoproxy.pro.domain.User;
import com.neoproxy.pro.dto.*;
import com.neoproxy.pro.enums.*;
import com.neoproxy.pro.mapper.ProxyMapper;
import com.neoproxy.pro.mapper.ProxyMapperImpl;
import com.neoproxy.pro.repository.LicenseRepository;
import com.neoproxy.pro.repository.ProxyRepository;
import com.neoproxy.pro.service.AuthenticationService;
import com.neoproxy.pro.service.ProxyCoreService;
import com.neoproxy.pro.service.ProxyService;
import com.neoproxy.pro.service.exception.NeoProxyServiceException;
import com.neoproxy.pro.utils.CommonUtil;
import com.neoproxy.pro.utils.DateUtil;
import com.neoproxy.pro.xproxy.model.PortType;
import com.neoproxy.pro.xproxy.model.ProxyInfoReq;
import com.neoproxy.pro.xproxy.service.XProxyService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.convert.QueryByExamplePredicateBuilder;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.Predicate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ProxyServiceImpl implements ProxyService {
    ProxyMapper proxyMapper = new ProxyMapperImpl();
    ProxyRepository proxyRepository;
    AuthenticationService authenticationService;
    LicenseRepository licenseRepository;
    XProxyService xProxyService;
    Random rand = new Random();
    ProxyCoreService proxyCoreService;


    public Specification<Proxy> getSpecAndExample(ProxyQueryRequest request, Example<Proxy> example) {
        return (Specification<Proxy>) (root, query, builder) -> {
            final List<Predicate> predicates = new ArrayList<>();
            if (!request.getExpiredDate().isEmpty()) {
                predicates.add(builder.greaterThan(root.get("expiredDate"), DateUtil.convertIsoStringToDate(request.getExpiredDate())));
            }
            if (!request.getLicense().isEmpty()) {
                predicates.add(builder.like(root.get("license").get("uuid").as(String.class), "%" + request.getLicense() + "%"));
            }
            predicates.add(QueryByExamplePredicateBuilder.getPredicate(root, builder, example));
            return builder.and(predicates.toArray(new Predicate[predicates.size()]));
        };
    }

    ;

    @Override
    public TableData<ProxyDto> getProxies(ProxyQueryRequest request) {
        User user = authenticationService.getLoggedUser();
        Proxy searchProxy = new Proxy();
        if (user.isClient()) {
            License license = new License();
            license.setCustomer(user);
            searchProxy.setLicense(license);
        }

        TableData<ProxyDto> tableData = new TableData<>();
        Sort sortBy = Sort.by(Sort.Direction.DESC, "saleStatus", "updatedAt");
        Pageable paging = PageRequest.of(request.getPage(), request.getPageSize(), sortBy);
        ExampleMatcher matcher = ExampleMatcher.matching()
                .withMatcher("name", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
                .withMatcher("host", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
                .withMatcher("authenticationUsers", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
                .withMatcher("authorizationIps", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase());
        if (!request.getName().isEmpty()) {
            searchProxy.setModem(Modem.builder().name(request.getName()).build());
        }
        if (!request.getStatus().isEmpty()) {
            searchProxy.setStatus(ProxyStatus.findByName(request.getStatus()));
        }
        if (!request.getSaleStatus().isEmpty()) {
            searchProxy.setSaleStatus(ProxySaleStatus.valueOf(request.getSaleStatus()));
        }
        if (!request.getHost().isEmpty()) {
            searchProxy.setHost(request.getHost());
        }
        if (request.getPort() != -1) {
            searchProxy.setSharedPort(request.getPort());
        }
        if (!request.getAuthUsername().isEmpty()) {
            searchProxy.setAuthenticationUsers(request.getAuthUsername());
        }
        if (!request.getAuthIps().isEmpty()) {
            searchProxy.setAuthorizationIps(request.getAuthIps());
        }
        if (!request.getModemId().isEmpty()) {
            searchProxy.setModem(Modem.builder().uuid(UUID.fromString(request.getModemId())).build());
        }

        Example<Proxy> example = Example.of(searchProxy, matcher);
        Page<Proxy> page = proxyRepository.findAll(getSpecAndExample(request, example), paging);

        page.getContent().forEach(proxyWan -> {
            tableData.getData().add(proxyMapper.toDto(proxyWan));
        });
        tableData.setPages(page.getTotalPages());

        return tableData;
    }

    @Override
    public boolean rebootDevice(ProxyRequest request) {
        List<License> licenseList = getListActiveProxyByLicenses(request.getUuids());
        for (License license : licenseList) {
            rebootDeviceOnePort(request, license);
        }

        return true;
    }

    void rebootDeviceOnePort(ProxyRequest request, License targetLicense) {
        // 1.1 Check license have active
        if (targetLicense.getStatus() != LicenseStatus.ACTIVE) {
            if (request.getUuids().size() == 1) {
                throw new NeoProxyServiceException(ExceptionDetail.builder()
                        .status(HttpStatus.BAD_REQUEST).errorCode(ErrorCode.NOT_HAVE_PERMISSION)
                        .message("Not have permission to reboot device when license inactive")
                        .build());
            }
            return;
        }

        // 2. Check last reboot device
        Long numberOfSecond = targetLicense.getSalePackage().getMinTimeChangeIp();
        if (targetLicense.getLastChangeIp() == null) {
            targetLicense.setLastChangeIp(LocalDateTime.now().minusYears(10));
        }
        LocalDateTime localDateTime = targetLicense.getLastChangeIp().plusSeconds(numberOfSecond);
        if (localDateTime.isAfter(LocalDateTime.now())) {
            log.error("Too fast to reboot device. Skip this license {}", targetLicense.getUuid().toString());
            if (request.getUuids().size() == 1) {
                throw new NeoProxyServiceException(ExceptionDetail.builder()
                        .status(HttpStatus.BAD_REQUEST).errorCode(ErrorCode.PROXY_TOO_FAST_TO_CHANGE_IP)
                        .message("Too fast to reboot device.")
                        .build());
            }
            return;
        }

        Proxy httpProxy = targetLicense.getHttpProxy();
        // Proxy sockProxy = targetLicense.getSockProxy();
        xProxyService.rebootPort(httpProxy.getModem(), httpProxy.getHost(), httpProxy.getSharedPort());
        log.info("[Done reboot device]----------------- : " + httpProxy.getSharedPort());
        // xProxyService.resetPort(sockProxy.getModem(), sockProxy.getHost(), sockProxy.getSharedPort());
        // log.info("[Done change ip]----------------- : " + sockProxy.getSharedPort());
    }

    @Override
    public boolean changeProxyIp(ProxyRequest request, boolean isAuto) {
        List<License> licenseList;
        if (isAuto) {
            licenseList = proxyRepository.findProxyWanByLicenses(LicenseStatus.ACTIVE, request.getUuids());
        } else {
            licenseList = getListActiveProxyByLicenses(request.getUuids());
        }
        for (License license : licenseList) {
            changeProxyIpOnePort(request, license);
        }

        return true;
    }

    @Override
    public boolean changeProxyIpOnePort(ProxyRequest request, License targetLicense) {
        // 1.1 Check license have active
        if (targetLicense.getStatus() != LicenseStatus.ACTIVE) {
            if (request.getUuids().size() == 1) {
                throw new NeoProxyServiceException(ExceptionDetail.builder()
                        .status(HttpStatus.BAD_REQUEST).errorCode(ErrorCode.NOT_HAVE_PERMISSION)
                        .message("Not have permission to change Ip when license inactive")
                        .build());
            }
            return false;
        }

        // 2. Check last change ip
        Long numberOfSecond = targetLicense.getSalePackage().getMinTimeChangeIp();
        if (targetLicense.getLastChangeIp() == null) {
            targetLicense.setLastChangeIp(LocalDateTime.now().minusYears(10));
        }
        LocalDateTime localDateTime = targetLicense.getLastChangeIp().plusSeconds(numberOfSecond);
        if (localDateTime.isAfter(LocalDateTime.now())) {
            log.error("Too fast to change Ip. Skip this license {}", targetLicense.getUuid().toString());
            if (request.getUuids().size() == 1) {
                throw new NeoProxyServiceException(ExceptionDetail.builder()
                        .status(HttpStatus.BAD_REQUEST).errorCode(ErrorCode.PROXY_TOO_FAST_TO_CHANGE_IP)
                        .message("Too fast to change IP.")
                        .build());
            }
            return false;
        }

        Proxy httpProxy = targetLicense.getHttpProxy();
        // Proxy sockProxy = targetLicense.getSockProxy();
        xProxyService.resetPort(httpProxy.getModem(), httpProxy.getHost(), httpProxy.getSharedPort());
        log.info("[Done change ip]----------------- : " + httpProxy.getSharedPort());
        // xProxyService.resetPort(sockProxy.getModem(), sockProxy.getHost(), sockProxy.getSharedPort());
        // log.info("[Done change ip]----------------- : " + sockProxy.getSharedPort());

        targetLicense.setLastChangeIp(LocalDateTime.now());
        licenseRepository.save(targetLicense);
        return true;
    }

    @Override
    public boolean updateAuthentication(ProxyRequest request) {
        User user = authenticationService.getLoggedUser();
        List<License> licenseList = getListActiveProxyByLicenses(request.getUuids());
        log.info("Total active proxy wan for update authenticate {}", licenseList.size());

        CompletableFuture[] completableFutures = new CompletableFuture[licenseList.size()];
        AtomicInteger i = new AtomicInteger();
        licenseList.forEach(license -> {
            String authenticationUsers = null;
            String authenticationIps = null;
            if (CommonUtil.isEmpty(request.getWhiteListIps())) {
                authenticationUsers = licenseList.size() == 1 ? request.getUsername() : CommonUtil.generateAuthProxy();
            } else {
                authenticationIps = request.getWhiteListIps();
            }

            completableFutures[i.getAndIncrement()] = proxyCoreService.updateAuthentication(license, authenticationUsers, authenticationIps);

            if (license != null) {
                license.setAuthUser(authenticationUsers);
                license.setIpWhitelist(authenticationIps);
                licenseRepository.save(license);
            }
        });

        CompletableFuture<Void> combinedFuture = CompletableFuture
                .allOf(Arrays.stream(completableFutures)
                        .filter(Objects::nonNull)
                        .toArray(CompletableFuture[]::new));
        try {
            combinedFuture.join();
        } catch (CompletionException ex) {
            // NOOP
        }

        return true;
    }

    @Override
    @Async
    public void updateAuthentication(Proxy proxy, String authenticationUsers, String authorizationIps) {
        try {
            List<Integer> proxyIds = new ArrayList<>();
            proxyIds.add(proxy.getXproxyId());
            ProxyInfoReq proxyInfoReq = new ProxyInfoReq(authorizationIps, authenticationUsers, proxyIds);
            boolean result = xProxyService.bulkEdit(proxy.getModem(), proxyInfoReq);
            if (result) {
                proxy.setAuthenticationUsers(authenticationUsers);
                proxy.setAuthorizationIps(authorizationIps);
                proxyRepository.save(proxy);
            }
        } catch (Exception e) {
            log.error("Error when update authenticate: " + e.getMessage());
        }
    }

    @Override
    public Integer getTotalProxy(ModemType modemType) {
        return proxyRepository.countProxy(modemType);
    }

    @Override
    public Integer getTotalAvailableProxy(ModemType modemType) {
        return proxyRepository.countAvailableProxy(ModemStatus.READY, modemType);
    }

    private List<License> getListActiveProxyByLicenses(List<UUID> uuids) {
        User user = authenticationService.getLoggedUser();
        List<License> licenseList;
        if (user.isClient()) {
            licenseList = proxyRepository.findProxyWanByLicenses(user, LicenseStatus.ACTIVE, uuids);
        } else {
            licenseList = proxyRepository.findProxyWanByLicenses(LicenseStatus.ACTIVE, uuids);
        }

        log.info("Total license list {}", licenseList.size());
        if (licenseList.isEmpty()) {
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.PROXY_ACTIVE_NOT_FOUND)
                            .message("Could not find active proxy")
                            .build());
        }
        return licenseList;
    }

    @Override
    public void deleteProxyByModem(Modem modem) {
        List<Proxy> proxyList = proxyRepository.findByModem(modem.getUuid());
        proxyRepository.deleteAll(proxyList);
    }

    @Override
    public boolean deleteProxies(ProxyRequest request) {
        request.getUuids().forEach(uuid -> {
            Proxy proxy = proxyRepository.findByUuid(uuid);
            if (proxy == null) {
                throw new NeoProxyServiceException(
                        ExceptionDetail.builder()
                                .status(HttpStatus.BAD_REQUEST)
                                .errorCode(ErrorCode.PROXY_ACTIVE_NOT_FOUND)
                                .message("Could not find active proxy")
                                .build());
            }
            if (proxy.getPortType().equals(PortType.HTTP) && proxy.getLicense() != null) {
                throw new NeoProxyServiceException(
                        ExceptionDetail.builder()
                                .status(HttpStatus.BAD_REQUEST)
                                .errorCode(ErrorCode.PROXY_ACTIVE_NOT_FOUND)
                                .message("The port in Used cannot be removed, please make sure to only remove the ports that are Available.")
                                .build());
            }
            if (proxy.getPortType().equals(PortType.SocksV5) && proxy.getLicenseSock() != null) {
                throw new NeoProxyServiceException(
                        ExceptionDetail.builder()
                                .status(HttpStatus.BAD_REQUEST)
                                .errorCode(ErrorCode.PROXY_ACTIVE_NOT_FOUND)
                                .message("The port in Used cannot be removed, please make sure to only remove the ports that are Available.")
                                .build());
            }

            if (proxy.getPortType().equals(PortType.HTTP) && proxy.getBrotherPort() != null) {
                Optional<Proxy> sockPortOptional = proxyRepository.findBySharedPort(proxy.getModem(), proxy.getBrotherPort(), PortType.SocksV5);
                if (sockPortOptional.isPresent()) {
                    Proxy sockPort = sockPortOptional.get();
                    if (sockPort.getPortType().equals(PortType.SocksV5) && proxy.getLicenseSock() != null) {
                        throw new NeoProxyServiceException(
                                ExceptionDetail.builder()
                                        .status(HttpStatus.BAD_REQUEST)
                                        .errorCode(ErrorCode.PROXY_ACTIVE_NOT_FOUND)
                                        .message("The port in Used cannot be removed, please make sure to only remove the ports that are Available.")
                                        .build());
                    }
                    proxyRepository.delete(sockPort);
                }
            }
            proxyRepository.delete(proxy);
        });
        return true;
    }
}
