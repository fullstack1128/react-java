package com.neoproxy.pro.dto;

import com.neoproxy.pro.domain.Package;
import com.neoproxy.pro.domain.Proxy;
import com.neoproxy.pro.domain.Transaction;
import com.neoproxy.pro.domain.User;
import com.neoproxy.pro.enums.LicenseStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LicenseRequest {
    LocalDateTime startDate;
    LocalDateTime expiredDate;
    String location;
    String ISP;
    LicenseStatus status;
    User customer;
    Proxy proxy;
    Package proxyPackage;
    Transaction transaction;
    String authUser;
    String ipWhitelist;
    LocalDateTime lastChangeIp;
    LocalDateTime lastChangeLocation;
    LocalDateTime lastChangeIsp;
    String note;
    UUID salePackageId;
}
