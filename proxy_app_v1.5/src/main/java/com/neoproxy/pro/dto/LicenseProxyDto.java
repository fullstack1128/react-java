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
public class LicenseProxyDto {
    UUID uuid;
    String location;
    LicenseStatus status;
    LocalDateTime startDate;
    LocalDateTime expiredDate;
    PackageLicenseDto salePackage;
    CustomerDto customer;
}
