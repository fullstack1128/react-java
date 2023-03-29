package com.neoproxy.pro.service;

import com.neoproxy.pro.domain.License;
import com.neoproxy.pro.domain.Proxy;

import java.util.concurrent.CompletableFuture;

public interface ProxyCoreService {

    CompletableFuture<Boolean> updateAuthentication(License license, String authenticationUsers, String authorizationIps);
}
