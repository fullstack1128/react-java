package com.neoproxy.pro.dto;

import com.neoproxy.pro.enums.ModemType;
import com.neoproxy.pro.enums.ProxySaleStatus;
import com.neoproxy.pro.enums.ProxyStatus;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProxyLicenseDto {
    UUID uuid;
    ProxyStatus status;
    Integer xproxyPosition;
    Integer sharedPort;
    String host;
    ModemType modemType;
    String authenticationUsers;
    String authorizationIps;
    LocalDateTime createdAt;
    ModemProxyDto modem;
    Long counterUlUsedBytes;
    Long counterDlUsedBytes;
    Long counterAllUsedBytes;
    String counterAllUpdated;
    String publicIp;
}
