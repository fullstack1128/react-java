package com.neoproxy.pro.utils.httpClient;

import java.util.Map;

public interface SimpleClient {
    String postFormData(ApiConfig config, Map<String, String> params, KeyValue... extraHeaders) throws Exception;

    String callAPI(ApiConfig config, String body, Map<String, String> queryParams, KeyValue... extraHeaders) throws Exception;
}
