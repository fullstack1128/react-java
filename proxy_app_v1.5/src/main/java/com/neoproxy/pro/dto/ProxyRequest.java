package com.neoproxy.pro.dto;

import lombok.*;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProxyRequest {
    List<UUID> uuids;
    String username;
    String whiteListIps;
    String location;
}
