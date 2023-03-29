package com.neoproxy.pro.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderProxyRequest {
    UUID packageUuid;
    Integer quantity;
    Integer time;
    String whiteListIps;
    String username;
}
