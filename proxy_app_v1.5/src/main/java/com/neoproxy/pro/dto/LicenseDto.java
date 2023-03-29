package com.neoproxy.pro.dto;

import com.neoproxy.pro.enums.LicenseStatus;
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
public class LicenseDto {
    UUID uuid;
    LocalDateTime startDate;
    LocalDateTime expiredDate;
    String location;
    String isp;
    LicenseStatus status;
    String authUser;
    String ipWhitelist;
    LocalDateTime lastChangeIp;
    LocalDateTime lastChangeLocation;
    LocalDateTime lastChangeIsp;
    String note;
    PackageDto salePackage;
    ProxyLicenseDto httpProxy;
    ProxyLicenseDto sockProxy;
    CustomerDto customer;
    TransactionLicenseDto transaction;
    Integer autoRotationTime;
}
