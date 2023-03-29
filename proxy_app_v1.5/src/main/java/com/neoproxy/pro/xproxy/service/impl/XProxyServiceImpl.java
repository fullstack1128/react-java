package com.neoproxy.pro.xproxy.service.impl;

import com.neoproxy.pro.domain.Modem;
import com.neoproxy.pro.domain.Proxy;
import com.neoproxy.pro.dto.ModemRequest;
import com.neoproxy.pro.utils.JsonUtil;
import com.neoproxy.pro.utils.httpClient.*;
import com.neoproxy.pro.xproxy.config.XProxyConf;
import com.neoproxy.pro.xproxy.model.*;
import com.neoproxy.pro.xproxy.service.XProxyService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class XProxyServiceImpl implements XProxyService {
    @Autowired
    XProxyConf xProxyConf;


    @Override
    public List<ProxyRootItem> getProxyRoot(ModemRequest modem) {
        try {
            ApiConfig apiConfig = xProxyConf.getInfoList();
            String url = modem.getDomain() + "/api/v1/info_list?page=1&limit=1000";
            apiConfig.setUrl(url);

            String response = ApiClient.getInstance().callAPI(apiConfig,
                    "",
                    new HashMap<>(),
                    generateAuthentication(modem.getUserName(), modem.getPassword()));

            ProxyRootResp partnerResponse = JsonUtil.fromString(response, ProxyRootResp.class);
            log.info("Total response size: {}", partnerResponse.getData().size());
            return partnerResponse.getData();
        } catch (Exception e) {
            log.error("Error when get proxy root", e);
            return Collections.emptyList();
        }
    }

    @Override
    public List<ProxySharedItem> getProxyShared(Modem modem) {
        try {
            ApiConfig apiConfig = xProxyConf.getSharedProxies();
            String url = modem.getDomain() + "/selling/shared_proxies?page=1&limit=1000";
            apiConfig.setUrl(url);

            String response = ApiClient.getInstance().callAPI(apiConfig,
                    "",
                    new HashMap<>(),
                    generateAuthentication(modem.getUserName(), modem.getPassword()));

            ProxySharedResp partnerResponse = JsonUtil.fromString(response, ProxySharedResp.class);
            log.info("Total response size: {}", partnerResponse.getData().size());
            return partnerResponse.getData();
        } catch (Exception e) {
            log.error("Error when get proxy shared", e);
            return Collections.emptyList();
        }
    }

    @Override
    public boolean generateProxy(Modem modem, ProxyInfoReq req) {
        try {
            ApiConfig apiConfig = xProxyConf.getGeneratePort();
            String url = modem.getDomain() + "/selling/generate";
            apiConfig.setUrl(url);

            String request = JsonUtil.toString(req);
            log.info("___ REQUEST: " + request);

            String response = ApiClient.getInstance().callAPI(apiConfig,
                    request,
                    new HashMap<>(),
                    generateAuthentication(modem.getUserName(), modem.getPassword()));

            ProxyInfoResp partnerResponse = JsonUtil.fromString(response, ProxyInfoResp.class);
            log.info("Result generate {}", partnerResponse.isStatus());
            return partnerResponse.isStatus();
        } catch (Exception e) {
            log.error("Error when generate proxy", e);
            return false;
        }
    }

    @Override
    public boolean bulkEdit(Modem modem, ProxyInfoReq proxyInfoReq) {
        try {
            List<SimpleHttpRequest> httpRequests = new ArrayList<>();
            ApiConfig apiConfig = xProxyConf.getBulkEdit();
            String url = modem.getDomain() + "/selling/bulk_edit";
            apiConfig.setUrl(url);

            String request = JsonUtil.toString(proxyInfoReq);
            log.info("___ REQUEST: " + request);

            SimpleHttpRequest httpRequest = new SimpleHttpRequest();
            httpRequest.setId(UUID.randomUUID().toString());
            httpRequest.addHeader(generateAuthentication(modem.getUserName(), modem.getPassword()));
            httpRequest.setPayload(request);
            httpRequests.add(httpRequest);

            List<SimpleHttpResponse> responses = ApiClient.getInstance().callAPI(apiConfig, httpRequests);
            log.info("Result response {}", responses.size());
            return true;
        } catch (Exception e) {
            log.error("Error when bulk edit", e);
            return false;
        }
    }

    @Override
    public void resetDataCounter(Modem modem, ResetDataCounterReq req) {
        try {
            List<SimpleHttpRequest> httpRequests = new ArrayList<>();
            ApiConfig apiConfig = xProxyConf.getResetDataCounter();
            String url = modem.getDomain() + "/selling/reset_data_counter";
            apiConfig.setUrl(url);

            SimpleHttpRequest httpRequest = new SimpleHttpRequest();
            httpRequest.setId(UUID.randomUUID().toString());
            httpRequest.addHeader(generateAuthentication(modem.getUserName(), modem.getPassword()));
            httpRequest.setPayload(JsonUtil.toString(req));
            httpRequests.add(httpRequest);

            List<SimpleHttpResponse> responses = ApiClient.getInstance().callAPI(apiConfig, httpRequests);
            log.info("Result response {}", responses.size());
        } catch (Exception e) {
            log.error("Error when resetDataCounter", e);
        }
    }

    @Override
    public boolean resetPort(Modem modem, String host, Integer port) {
        try {
            List<SimpleHttpRequest> httpRequests = new ArrayList<>();
            ApiConfig apiConfig = xProxyConf.getResetPort();
            String url = modem.getDomain() + "/reset";
            apiConfig.setUrl(url);

            SimpleHttpRequest httpRequest = new SimpleHttpRequest();
            httpRequest.setId(UUID.randomUUID().toString());
            httpRequest.addQueryParams("proxy", host + ":" + port);
            httpRequest.addHeader(generateAuthentication(modem.getUserName(), modem.getPassword()));
            httpRequests.add(httpRequest);

            List<SimpleHttpResponse> responses = ApiClient.getInstance().callAPI(apiConfig, httpRequests);
            log.info("Result response {}", responses.size());
            return true;
        } catch (Exception e) {
            log.error("Error when resetPort", e);
            return false;
        }
    }

    @Override
    public boolean rebootPort(Modem modem, String host, Integer port) {
        try {
            List<SimpleHttpRequest> httpRequests = new ArrayList<>();
            ApiConfig apiConfig = xProxyConf.getRebootPort();
            String url = modem.getDomain() + "/api/v1/reboot/proxy/" + host + ":" + port;
            apiConfig.setUrl(url);

            SimpleHttpRequest httpRequest = new SimpleHttpRequest();
            httpRequest.setId(UUID.randomUUID().toString());
            // httpRequest.addQueryParams("proxy", host + ":" + port);
            httpRequest.addHeader(generateAuthentication(modem.getUserName(), modem.getPassword()));
            httpRequests.add(httpRequest);

            List<SimpleHttpResponse> responses = ApiClient.getInstance().callAPI(apiConfig, httpRequests);
            log.info("Result response {}", responses.size());
            return true;
        } catch (Exception e) {
            log.error("Error when rebootPort", e);
            return false;
        }
    }

    @Override
    public List<XProxyWanInfo> getListPosition(ModemRequest modem) {
        try {
            log.info("Get proxy by modem with {}:{}", modem.getUserName(), modem.getPassword());
            ApiConfig apiConfig = xProxyConf.getGetListPosition();
            String url = modem.getDomain() + "/api/min/get-list-position";
            apiConfig.setUrl(url);

            String response = ApiClient.getInstance().callAPI(apiConfig,
                    "",
                    new HashMap<>(), generateAuthentication(modem.getUserName(), modem.getPassword()));
            String responseFinal = "{\"data\":" + response + "}";

            GetListPositionResponse partnerResponse = JsonUtil.fromString(responseFinal, GetListPositionResponse.class);
            log.info("Total response size: {}", partnerResponse.getData().size());
            return partnerResponse.getData();
        } catch (Exception e) {
            log.error("Error when check position", e);
            return Collections.emptyList();
        }
    }

    private KeyValue generateAuthentication(String username, String password) {
        String encoding = Base64.getEncoder().encodeToString((username + ":" + password).getBytes());
        return new KeyValue("Authorization", "Basic " + encoding);
    }
}
