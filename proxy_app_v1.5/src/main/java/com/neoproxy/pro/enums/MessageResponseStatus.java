package com.neoproxy.pro.enums;

public enum MessageResponseStatus {
    FAIL(0, "Fail"), SUCCESS(1, "Success");

    private final int key;
    private final String value;

    MessageResponseStatus(int key, String value) {
        this.key = key;
        this.value = value;
    }

    public int getKey() {
        return key;
    }
    public String getValue() {
        return value;
    }
}
