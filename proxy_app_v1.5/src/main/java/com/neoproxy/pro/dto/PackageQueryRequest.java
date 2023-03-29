package com.neoproxy.pro.dto;

import lombok.Data;

@Data
public class PackageQueryRequest extends PageableRequest {
    private static String NAME = "name";
    private static String STATUS = "status";
    private static String LOCATION = "location";

    public String getName() {
        return getValueFilter(NAME);
    }

    public String getLocation() {
        return getValueFilter(LOCATION);
    }

    public String getStatus() {
        return getValueFilter(STATUS);
    }
}
