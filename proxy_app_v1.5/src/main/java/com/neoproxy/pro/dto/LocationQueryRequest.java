package com.neoproxy.pro.dto;

import lombok.Data;

@Data
public class LocationQueryRequest extends PageableRequest {
    private static String NAME = "name";

    public String getName() {
        return getValueFilter(NAME);
    }
}
