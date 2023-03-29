package com.neoproxy.pro.dto;

import lombok.Data;

@Data
public class MonitorQueryRequest extends PageableRequest {
    private static String DESCRIPTION = "description";
    private static String TYPE = "type";
    private static String CREATED_DATE = "createdDate";

    public String getDescription() {
        return getValueFilter(DESCRIPTION);
    }

    public String getType() {
        return getValueFilter(TYPE);
    }

    public String getCreatedDate() {
        return getValueFilter(CREATED_DATE);
    }

}
