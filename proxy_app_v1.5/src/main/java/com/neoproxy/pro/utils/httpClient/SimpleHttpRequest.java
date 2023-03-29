package com.neoproxy.pro.utils.httpClient;

import lombok.Getter;

import java.util.*;
@Getter
public class SimpleHttpRequest {

    private String id;
    private String originalId;

    private String payload;
    private Map<String, String> queryParams;
    private List<KeyValue> extraHeaders;

    public SimpleHttpRequest() {
        queryParams = new HashMap<>();
        extraHeaders = new ArrayList<>();
    }

    public SimpleHttpRequest addHeader(KeyValue header) {
        extraHeaders.add(header);
        return this;
    }

    public SimpleHttpRequest addQueryParams(String key, String value) {
        queryParams.put(key, value);
        return this;
    }

    public SimpleHttpRequest setId(String id) {
        this.id = id + "_" + new Random().nextInt(10);
        this.originalId = id;
        return this;
    }

    public SimpleHttpRequest setPayload(String payload) {
        this.payload = payload;
        return this;
    }

    public SimpleHttpRequest setQueryParams(Map<String, String> queryParams) {
        this.queryParams = queryParams;
        return this;
    }

    public SimpleHttpRequest setExtraHeaders(List<KeyValue> extraHeaders) {
        this.extraHeaders = extraHeaders;
        return this;
    }

}
