package com.neoproxy.pro.utils.httpClient;

import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import okhttp3.internal.http.HttpMethod;
import okio.Buffer;

import java.io.IOException;
import java.net.ConnectException;
import java.net.SocketTimeoutException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;
import java.util.concurrent.TimeUnit;

@Slf4j
public class ApiClient implements SimpleClient {
    private final int requestTimeout = 60000;
    private final int connectionTimeout = 120000;

    private static ApiClient instance;

    private final OkHttpClient client;

    protected ApiClient() {
        ConnectionSpec connectionSpec = new ConnectionSpec.Builder(true)
                .allEnabledTlsVersions()
                .allEnabledCipherSuites()
                .build();

        OkHttpClient.Builder builder = new OkHttpClient.Builder()
                .connectTimeout(connectionTimeout, TimeUnit.MILLISECONDS)
                .readTimeout(requestTimeout, TimeUnit.MILLISECONDS)
                .writeTimeout(requestTimeout, TimeUnit.MILLISECONDS)
                .connectionSpecs(Arrays.asList(connectionSpec, ConnectionSpec.CLEARTEXT))
                .cache(null);

        client = builder.build();

    }

    public static ApiClient getInstance() {
        return instance;
    }

    public static void init() {
        instance = new ApiClient();
    }

    @Override
    public String postFormData(ApiConfig config, Map<String, String> params, KeyValue... extraHeaders) throws Exception {
        Request httpUriRequest = createPostFormRequest(config, params, extraHeaders);
        return invoke(config, httpUriRequest, 0).getContentStr();
    }

    @Override
    public String callAPI(ApiConfig config, String body, Map<String, String> queryParams, KeyValue... extraHeaders) throws Exception {
        Request httpUriRequest = createHttpRequest(config, queryParams, body, Arrays.asList(extraHeaders));
        return invoke(config, httpUriRequest, 0).getContentStr();
    }

    private SimpleHttpResponse invoke(ApiConfig config, Request httpUriRequest, int times) throws Exception {
        try (Response response = client.newCall(httpUriRequest).execute()) {
            int httpStatusCode = response.code();
            byte[] content;
            try (ResponseBody responseBody = response.body()) {
                content = responseBody == null ? new byte[]{} : responseBody.bytes();
            }
            log.info("PARTNER RESPONSE, HTTP CODE: [" + httpStatusCode + "]");
            if (httpStatusCode == 200 || httpStatusCode == 201 || config.isSuccessStatusCode(httpStatusCode)) {

                return new SimpleHttpResponse()
                        .setContent(content)
                        .setStatus(httpStatusCode);
            }
            log.info("Error message: [" + new String(content) + "]");
            if (config.isRetried(httpStatusCode) && times < config.getRetriedTimes()) {
                log.info("status code is REQUIRED to retried. retried times [" + (++times) + "]");
                return invoke(config, httpUriRequest, times);
            }

            int statusMapCode = config.getStatusMapCode(httpStatusCode);
            log.info("Status NOT OK. throw Error code: [" + statusMapCode + "]");
            throw new Exception(statusMapCode + " Error when map code: " + httpStatusCode);
        }
        catch (ConnectException | SocketTimeoutException e) {
            log.error("Call partner timeout, need to call partner again! " + config.getUrl(), e);
            if (config.isRetryWhenTimeout() && times < config.getRetriedTimes()) {
                log.info("Retry when PARTNER_SERVICE_TIMEOUT !!! " + config.getUrl());
                return invoke(config, httpUriRequest, ++times);
            }
            Integer partnerTimeoutCode = config.getPartnerTimeoutCode();
            if (partnerTimeoutCode == null) {
                partnerTimeoutCode = 400;
            }
            throw new Exception(String.valueOf(partnerTimeoutCode));
        }
        catch (Exception ex) {
            log.error(" CALL PARTNER [Error] " + config.getUrl(), ex);
            if (config.isRetryWhenPartnerError() && times < config.getRetriedTimes()) {
                log.info("Retry when PARTNER_SERVICE_ERROR !!! " + config.getUrl());
                return invoke(config, httpUriRequest, ++times);
            }
            Integer partnerErrorCode = config.getPartnerErrorCode();
            if (partnerErrorCode == null) {
                partnerErrorCode = 400;
            }
            throw new Exception(String.valueOf(partnerErrorCode));
        }
    }

    private Request createPostFormRequest(ApiConfig config, Map<String, String> params, KeyValue[] extraHeaders) throws Exception {
        try {
            FormBody.Builder bodyBuilder = new FormBody.Builder();
            for (Map.Entry<String, String> entry : params.entrySet()) {
                String key = entry.getKey();
                String val = entry.getValue();
                bodyBuilder.addEncoded(key, val);
            }
            FormBody body = bodyBuilder.build();
            log.info("Form body data: [" + toString(body) + "]");
            Request.Builder builder = new Request.Builder()
                    .url(config.getUrl())
                    .post(body);

            log.info("Send partner with url [" + config.getUrl() + "]");
            Map<String, String> requestHeaders = config.getRequestHeaders();
            requestHeaders.forEach((key, value) -> {
                builder.addHeader(key, value);
                log.info("Send partner with header [" + key + ": " + value + "]");
            });
            for (KeyValue extraHeader : extraHeaders) {
                builder.addHeader(extraHeader.getKey(), extraHeader.getValue());
                log.info("Send partner with header [" + extraHeader.getKey() + ": " + extraHeader.getValue() + "]");
            }
            return builder.build();
        }
        catch (Exception ex) {
            log.error("CODE ERROR: ", ex);
            throw new Exception("400");
        }
    }

    protected Request createHttpRequest(ApiConfig config, Map<String, String> queryParams, String body, List<KeyValue> extraHeaders) throws Exception {
        try {
            URL uri = buildUri(config.getUrl(), queryParams);
            Request.Builder builder = new Request.Builder()
                    .url(uri);
            addBody(config, body, builder);
            log.info("Send partner with url [" + uri + "]");
            Map<String, String> requestHeaders = config.getRequestHeaders();
            requestHeaders.forEach((key, value) -> {
                builder.addHeader(key, value);
                log.info("Send partner with header [" + key + ": " + value + "]");
            });
            for (KeyValue extraHeader : extraHeaders) {
                builder.addHeader(extraHeader.getKey(), extraHeader.getValue());
                log.info("Send partner with header [" + extraHeader.getKey() + ": " + extraHeader.getValue() + "]");
            }
            return builder.build();
        }
        catch (Exception ex) {
            log.error("CODE ERROR: ", ex);
            throw new Exception("400");
        }

    }

    protected void addBody(ApiConfig config, String body, Request.Builder requestBuilder) {
        RequestBody requestBody = null;
        if (HttpMethod.permitsRequestBody(config.getMethod())) {
            requestBody = RequestBody.create(body.getBytes(StandardCharsets.UTF_8));
        }
        requestBuilder.method(config.getMethod(), requestBody);
    }

    private URL buildUri(String url, Map<String, String> queryParams) {
        HttpUrl.Builder builder = Objects.requireNonNull(HttpUrl.parse(url)).newBuilder();
        if (queryParams != null) {
            for (Map.Entry<String, String> entry : queryParams.entrySet()) {
                String key = entry.getKey();
                String value = entry.getValue();
                if (key != null && value != null) {
                    builder.addQueryParameter(key, value);
                }
            }
        }
        return builder.build().url();
    }

    private String toString(FormBody body) {
        try {
            final Buffer buffer = new Buffer();
            body.writeTo(buffer);
            return buffer.readUtf8();
        }
        catch (final IOException e) {
            return "CAN NOT PRINT";
        }
    }

    public List<SimpleHttpResponse> callAPI(ApiConfig config, List<SimpleHttpRequest> requests) throws Exception {
        List<SimpleHttpResponse> httpResponses = new ArrayList<>();

        CompletableFuture[] completableFutures = new CompletableFuture[requests.size()];

        for (int i = 0; i < requests.size(); i++) {
            SimpleHttpRequest request = requests.get(i);
            completableFutures[i] = CompletableFuture.supplyAsync(() -> {
                try {
                    Request httpUriRequest = createHttpRequest(config, request.getQueryParams(), request.getPayload(), request.getExtraHeaders());
                    return invoke(config, httpUriRequest, 0);
                }
                catch (Exception ex) {
                    throw new CompletionException("error when call partner with", ex);
                }
            }).thenAccept(response -> {
                response.setId(request.getId());
                response.setOrigialId(request.getOriginalId());
                httpResponses.add(response);
            });
        }

        CompletableFuture<Void> combinedFuture = CompletableFuture.allOf(completableFutures);
        try {
            combinedFuture.join();
        }
        catch (CompletionException ex) {
            Throwable cause = ex.getCause();
            throw new Exception(cause);
        }

        return httpResponses;
    }

}
