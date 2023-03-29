package com.neoproxy.pro.xproxy.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResetDataCounterReq {
    List<Integer> ids;

    public ResetDataCounterReq(List<Integer> ids) {
        this.ids = ids;
    }
}
