package com.neoproxy.pro.xproxy.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.neoproxy.pro.utils.JsonUtil;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class XProxyWanInfo {
    String system;
    Integer wan_idx;
    String wan;
    Integer position;
    Integer proxy_port;
    Integer proxy_port_ipv6;
    Integer sock_port;
    Integer sock_port_ipv6;
    String public_ip;
    String public_ip_ipv6;
    String code;
    String status;
    List<XProxyAuth> authentication_users;
    String authorization_ips;

    public String toString(){
        try {
            return JsonUtil.toString(this);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public String getAuthentication_users(){
        List<String> authorization = new ArrayList<>();
        if(authentication_users != null){
            authentication_users.forEach(xProxyAuth -> {
                authorization.add(xProxyAuth.toString());
            });
        }
        return String.join(",", authorization);
    }
}
