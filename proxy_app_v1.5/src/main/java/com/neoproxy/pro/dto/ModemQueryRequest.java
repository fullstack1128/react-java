package com.neoproxy.pro.dto;

import lombok.Data;

@Data
public class ModemQueryRequest extends PageableRequest {
    private static String NAME = "name";
    private static String STATUS = "status";

    public String getSearch() {
        return getValueFilter(NAME);
    }

    public String getStatus() {
        return getValueFilter(STATUS);
    }
}
