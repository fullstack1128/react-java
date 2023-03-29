package com.neoproxy.pro.dto;

import lombok.Data;

@Data
public class TransactionQueryRequest extends PageableRequest {
    private static String NAME = "name";
    private static String EMAIL = "email";
    private static String STATUS = "status";
    private static String TYPE = "type";
    private static String CATE = "cate";

    public String getName() {
        return getValueFilter(NAME);
    }

    public String getEmail() {
        return getValueFilter(EMAIL);
    }

    public String getType() {
        return getValueFilter(TYPE);
    }

    public String getCate() {
        return getValueFilter(CATE);
    }

    public int getStatus() {
        String value = getValueFilter(STATUS);
        if (value == null || value.isEmpty())
            return -1;
        return Integer.parseInt(value);
    }
}
