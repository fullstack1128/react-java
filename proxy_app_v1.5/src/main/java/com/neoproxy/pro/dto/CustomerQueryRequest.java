package com.neoproxy.pro.dto;

import lombok.Data;

@Data
public class CustomerQueryRequest extends PageableRequest {
    private static String NAME = "name";
    private static String EMAIL = "email";
    private static String STATUS = "status";

    public String getName() {
        return getValueFilter(NAME);
    }

    public String getEmail() {
        return getValueFilter(EMAIL);
    }

    public int getStatus() {
        String value = getValueFilter(STATUS);
        if (value == null || value.isEmpty())
            return -1;
        return Integer.parseInt(value);
    }
}