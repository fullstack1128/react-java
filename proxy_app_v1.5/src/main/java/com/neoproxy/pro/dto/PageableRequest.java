package com.neoproxy.pro.dto;

import lombok.Data;
import lombok.Getter;

import java.util.List;

@Data
public class PageableRequest {
    protected List<Filter> filtered;
    protected int page;
    protected int pageSize;

    @Getter
    public static class Filter {
        private String id;
        private String value;
    }

    protected String getValueFilter(String key) {
        if (filtered == null || filtered.size() == 0)
            return "";
        Filter filter = filtered.stream().filter(el -> el.id.equals(key)).findFirst().orElse(null);
        if (filter == null) {
            return "";
        }
        return filter.getValue();
    }
}
