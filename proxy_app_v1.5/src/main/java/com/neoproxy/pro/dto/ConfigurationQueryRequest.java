package com.neoproxy.pro.dto;

import lombok.Data;

@Data
public class ConfigurationQueryRequest extends PageableRequest {
    private static String NAME = "name";

    public String getSearch() {
        return getValueFilter(NAME);
    }
}
