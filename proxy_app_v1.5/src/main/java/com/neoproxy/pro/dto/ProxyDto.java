package com.neoproxy.pro.dto;

import com.neoproxy.pro.enums.ModemType;
import com.neoproxy.pro.enums.ProxySaleStatus;
import com.neoproxy.pro.enums.ProxyStatus;
import com.neoproxy.pro.xproxy.model.PortType;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import javax.persistence.Column;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProxyDto {
    UUID uuid;
    ModemProxyDto modem;
    ProxyStatus status;
    Integer xproxyPosition;
    Integer sharedPort;
    Integer brotherPort;
    String host;
    ModemType modemType;
    String authenticationUsers;
    String authorizationIps;
    ProxySaleStatus saleStatus;
    LicenseProxyDto license;
    LicenseProxyDto licenseSock;
    PortType portType;
    Long counterUlUsedBytes;
    Long counterDlUsedBytes;
    Long counterAllUsedBytes;
    String counterAllUpdated;
    LocalDateTime createdAt;
    String publicIp;
}
