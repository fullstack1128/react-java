package com.neoproxy.pro.service;

import com.neoproxy.pro.domain.License;
import com.neoproxy.pro.domain.Modem;
import com.neoproxy.pro.domain.Proxy;
import com.neoproxy.pro.dto.ProxyDto;
import com.neoproxy.pro.dto.ProxyQueryRequest;
import com.neoproxy.pro.dto.ProxyRequest;
import com.neoproxy.pro.dto.TableData;
import com.neoproxy.pro.enums.ModemType;

public interface ProxyService {
    TableData<ProxyDto> getProxies(ProxyQueryRequest request);

    boolean changeProxyIp(ProxyRequest request, boolean isAuto);

    boolean changeProxyIpOnePort(ProxyRequest request, License targetLicense);

    boolean rebootDevice(ProxyRequest request);

    boolean updateAuthentication(ProxyRequest request);

    void updateAuthentication(Proxy proxy, String authenticationUsers, String authorizationIps);

    Integer getTotalProxy(ModemType modemType);

    Integer getTotalAvailableProxy(ModemType modemType);

    void deleteProxyByModem(Modem modem);

    boolean deleteProxies(ProxyRequest request);
}
