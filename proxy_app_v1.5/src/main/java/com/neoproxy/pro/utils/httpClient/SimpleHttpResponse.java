package com.neoproxy.pro.utils.httpClient;

import java.nio.charset.StandardCharsets;

public class SimpleHttpResponse {

    private Status status;

    private String id;
    private String originalId;

    private int code;
    private byte[] content;
    private String contentStr;

    public Status getStatus() {
        return status;
    }

    public String getId() {
        return id;
    }

    public SimpleHttpResponse setId(String id) {
        this.id = id;
        return this;
    }
    
    public String getOrigialId() {
        return originalId;
    }

    public SimpleHttpResponse setOrigialId(String originalId) {
        this.originalId = originalId;
        return this;
    }

    public int getCode() {
        return code;
    }

    public SimpleHttpResponse setStatus(int status) {
        this.status = Status.findByCode(status);
        return this;
    }

    public byte[] getContent() {
        return content;
    }

    public SimpleHttpResponse setContent(byte[] content) {
        this.content = content;
        return this;
    }

    public String getContentStr() {
        if (contentStr == null) {
            contentStr = new String(content, StandardCharsets.UTF_8);
        }
        return contentStr;
    }

    public static enum Status {
        OK(200),;

        private final int code;

        private Status(int code) {
            this.code = code;
        }

        public static Status findByCode(int code) {
            for (Status value : values()) {
                if (value.code == code) {
                    return value;
                }
            }
            return null;
        }

    }

    @Override
    public String toString() {
        String statusString = "{}";
        if (status != null) {
            statusString = status.toString();
        }
        return "{\"id\":\"" + id + "\",\"statusCode\":" + code + ",\"content\":\"" + getContentStr() + "\"}";
    }

}
