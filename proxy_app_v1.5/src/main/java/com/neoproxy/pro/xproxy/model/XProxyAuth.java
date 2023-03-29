package com.neoproxy.pro.xproxy.model;

import lombok.Data;

@Data
public class XProxyAuth {
    String u;
    String p;

    public String toString(){
        return u + ":" + p;
    }
}
