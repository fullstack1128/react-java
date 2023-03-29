package com.neoproxy.pro.xproxy.service;

import com.neoproxy.pro.domain.Modem;
import com.neoproxy.pro.domain.Proxy;
import com.neoproxy.pro.dto.ModemRequest;
import com.neoproxy.pro.xproxy.model.*;

import java.util.List;

public interface XProxyService {
    List<ProxyRootItem> getProxyRoot(ModemRequest modem);

    List<ProxySharedItem> getProxyShared(Modem modem);

    boolean generateProxy(Modem modem, ProxyInfoReq req);

    boolean bulkEdit(Modem modem, ProxyInfoReq proxyInfoReq);

    void resetDataCounter(Modem modem, ResetDataCounterReq req);

    boolean resetPort(Modem modem, String host, Integer port);

    boolean rebootPort(Modem modem, String host, Integer port);

    List<XProxyWanInfo> getListPosition(ModemRequest modem);
}
