package com.neoproxy.pro.xproxy.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProxySharedItem {
    int id;
    int position;
    int shared_port;
    String port_type;
    boolean auth_ip_enabled;
    String auth_ip_list;
    boolean auth_user_enabled;
    String auth_user_list;
    Long counter_dl_used_bytes;
    Long counter_ul_used_bytes;
    Long counter_all_used_bytes;
    String counter_all_updated;
    String web_whitelist;
    String web_blacklist;
}
