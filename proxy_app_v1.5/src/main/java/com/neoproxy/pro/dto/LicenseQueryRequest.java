package com.neoproxy.pro.dto;

import lombok.Data;

@Data
public class LicenseQueryRequest extends PageableRequest {
    private static String EXPIRED_DATE = "expiredDate";
    private static String STATUS = "status";
    private static String NAME = "name";
    private static String LICENSE = "license";
    private static String PUBLIC_IP = "publicIp";
    private static String PORT = "port";
    private static String AUTH_USERNAME = "authUserName";
    private static String AUTH_IPS = "authIps";
    private static String SALE_STATUS = "saleStatue";
    private static String MODEM_ID = "modemId";
    private static String createdDateFrom = "createdDateFrom";
    private static String createdDateTo = "createdDateTo";
    private static String expiredDateFrom = "expiredDateFrom";
    private static String expiredDateTo = "expiredDateTo";
    private static String location = "location";
    private static String packageId = "packageId";
    private static String customerId = "customerId";
    private static String transactionId = "transactionId";

    public String getLocation() {
        return getValueFilter(location);
    }

    public String getPackageId() {
        return getValueFilter(packageId);
    }

    public String getCustomerId() {
        return getValueFilter(customerId);
    }

    public String getTransactionId() {
        return getValueFilter(transactionId);
    }

    public String getCreatedDateFrom() {
        return getValueFilter(createdDateFrom);
    }

    public String getCreatedDateTo() {
        return getValueFilter(createdDateTo);
    }

    public String getExpiredDateFrom() {
        return getValueFilter(expiredDateFrom);
    }
    public String getExpiredDateTo() {
        return getValueFilter(expiredDateTo);
    }


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

    public String getModemId() {
        return getValueFilter(MODEM_ID);
    }
}
