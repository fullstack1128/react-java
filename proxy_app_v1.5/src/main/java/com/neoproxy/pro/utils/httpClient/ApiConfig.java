package com.neoproxy.pro.utils.httpClient;

import lombok.Builder;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ApiConfig {

    private String url;
    private String method;

    private Map<String, String> requestHeaders;
    private Map<String, Integer> statusMapCodes;
    private List<Integer> statusSuccessCodes = new ArrayList<>();
    private List<Integer> retriedCodes = new ArrayList<>();
    private int retriedTimes;
    private boolean retryWhenTimeout;
    private boolean retryWhenPartnerError;
    private Integer partnerTimeoutCode;
    private Integer partnerErrorCode;

    public Integer getPartnerTimeoutCode() {
        return partnerTimeoutCode;
    }

    public Integer getPartnerErrorCode() {
        return partnerErrorCode;
    }

    public boolean isRetryWhenTimeout() {
        return retryWhenTimeout;
    }

    public boolean isRetryWhenPartnerError() {
        return retryWhenPartnerError;
    }

    public String getUrl() {
        return url;
    }

    public Map<String, String> getRequestHeaders() {
        return requestHeaders;
    }

    public String getMethod() {
        return method;
    }

    public Map<String, Integer> getStatusMapCodes() {
        return statusMapCodes;
    }

    public int getStatusMapCode(int httpStatus) {
        if (statusMapCodes == null || !statusMapCodes.containsKey(httpStatus + "")) {
            return 400;
        }
        return statusMapCodes.get(httpStatus + "");
    }

    public List<Integer> getStatusSuccessCodes() {
        return statusSuccessCodes;
    }

    public boolean isSuccessStatusCode(int status) {
        return statusSuccessCodes.contains(status);
    }

    public ApiConfig setMethod(String method) {
        this.method = method;
        return this;

    }

    public ApiConfig setRequestHeaders(Map<String, String> requestHeaders) {
        this.requestHeaders = requestHeaders;
        return this;
    }

    public ApiConfig setStatusMapCodes(Map<String, Integer> statusMapCodes) {
        this.statusMapCodes = statusMapCodes;
        return this;
    }

    public ApiConfig setSuccessCodes(List<Integer> statusMapCodes) {
        this.statusSuccessCodes = statusMapCodes;
        return this;
    }

    public ApiConfig setUrl(String url) {
        this.url = url;
        return this;
    }

    public List<Integer> getRetriedCodes() {
        return retriedCodes;
    }

    public int getRetriedTimes() {
        return retriedTimes;
    }

    public boolean isRetried(int httpStatusCode) {
        return retriedCodes.contains(httpStatusCode);
    }

    public ApiConfig setRetriedCodes(List<Integer> retriedCodes) {
        this.retriedCodes = retriedCodes;
        return this;
    }

    public ApiConfig setRetriedTimes(int retriedTimes) {
        this.retriedTimes = retriedTimes;
        return this;
    }

    public ApiConfig setRetryWhenTimeout(boolean retryWhenTimeout) {
        this.retryWhenTimeout = retryWhenTimeout;
        return this;
    }
}
