package com.neoproxy.pro.utils.httpClient;

import java.util.Objects;

public class KeyValue {

    private final String key;
    private final String value;

    public KeyValue(String key, String value) {
        this.key = Objects.requireNonNull(key);
        this.value = Objects.requireNonNull(value);
    }

    public String getKey() {
        return key;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "{" + "\"key\":\"" + key + "\",\"value\":\"" + value + "\"}";
    }
    
    

}
