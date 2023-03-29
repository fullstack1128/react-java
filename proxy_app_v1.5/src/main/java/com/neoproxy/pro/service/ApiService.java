package com.neoproxy.pro.service;

import com.neoproxy.pro.dto.api.ApiProxyDto;

public interface ApiService {
    boolean changeIp(String license);

    ApiProxyDto getStatus(String license);
}
