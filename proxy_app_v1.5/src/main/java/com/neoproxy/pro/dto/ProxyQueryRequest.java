package com.neoproxy.pro.dto;

import lombok.Data;

@Data
public class ProxyQueryRequest extends PageableRequest {
    private static String EXPIRED_DATE = "expiredDate";
    private static String STATUS = "status";
    private static String NAME = "name";
    private static String LICENSE = "license";
    private static String PUBLIC_IP = "publicIp";
    private static String HOST = "host";
    private static String PORT = "port";
    private static String AUTH_USERNAME = "authUserName";
    private static String AUTH_IPS = "authIps";
    private static String SALE_STATUS = "saleStatus";
    private static String MODEM_ID = "modemId";

    public String getExpiredDate() {
        return getValueFilter(EXPIRED_DATE);
    }

    public String getStatus() {
        return getValueFilter(STATUS);
    }

    public String getName() {
        return getValueFilter(NAME);
    }

    public String getLicense() {
        return getValueFilter(LICENSE);
    }

    public String getPublicIp() {
        return getValueFilter(HOST);
    }

    public String getHost() {
        return getValueFilter(PUBLIC_IP);
    }

    public String getModemId() {
        return getValueFilter(MODEM_ID);
    }

    public Integer getPort() {
        String value = getValueFilter(PORT);
        if (value == null || value.isEmpty())
            return -1;
        return Integer.parseInt(value);
    }

    public String getAuthUsername() {
        return getValueFilter(AUTH_USERNAME);
    }

    public String getAuthIps() {
        return getValueFilter(AUTH_IPS);
    }

    public String getSaleStatus() {
        return getValueFilter(SALE_STATUS);
    }
}
