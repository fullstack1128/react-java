package com.neoproxy.pro.dto;

import com.neoproxy.pro.enums.LicenseStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateLicenseStatusRequest {
    List<UUID> uuids;
    LicenseStatus licenseStatus;
}
