package com.neoproxy.pro.dto.api;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApiProxyDto {
    String ip;
    Integer httpPort;
    Integer sockPort;
    String authenticationUser;
    String authenticationIps;
    String status;
}
