package com.neoproxy.pro.service.impl;

import com.neoproxy.pro.domain.License;
import com.neoproxy.pro.domain.Proxy;
import com.neoproxy.pro.repository.ProxyRepository;
import com.neoproxy.pro.service.ProxyCoreService;
import com.neoproxy.pro.xproxy.model.ProxyInfoReq;
import com.neoproxy.pro.xproxy.service.XProxyService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ProxyCoreServiceImpl implements ProxyCoreService {
    XProxyService xProxyService;
    ProxyRepository proxyRepository;

    @Override
    @Async
    public CompletableFuture<Boolean> updateAuthentication(License license, String authenticationUsers, String authorizationIps) {
        try {
            List<Integer> proxyIds = new ArrayList<>();
            proxyIds.add(license.getHttpProxy().getXproxyId());
            proxyIds.add(license.getSockProxy().getXproxyId());
            ProxyInfoReq proxyInfoReq = new ProxyInfoReq(authorizationIps, authenticationUsers, proxyIds);
            boolean result = xProxyService.bulkEdit(license.getHttpProxy().getModem(), proxyInfoReq);

            // Update new info
            license.getHttpProxy().setAuthenticationUsers(authenticationUsers);
            license.getHttpProxy().setAuthorizationIps(authorizationIps);
            proxyRepository.save(license.getHttpProxy());

            license.getSockProxy().setAuthenticationUsers(authenticationUsers);
            license.getSockProxy().setAuthorizationIps(authorizationIps);
            proxyRepository.save(license.getSockProxy());
        } catch (Exception e) {
            log.error("Error when update authenticate: " + e.getMessage());
        }

        return CompletableFuture.completedFuture(true);
    }
}
