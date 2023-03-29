package com.neoproxy.pro.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OverviewDto {
    Integer totalCustomers;
    Integer totalCusHaveActiveLicenses;

    Integer totalModems;
    Integer totalPendingModems;
    Integer totalProxies;
    Integer totalAvailableProxies;
    Integer totalActiveLicenses;
    Integer totalExpiredLicenses;

    Integer mTotalModems;
    Integer mTotalPendingModems;
    Integer mTotalProxies;
    Integer mTotalAvailableProxies;
    Integer mTotalActiveLicenses;
    Integer mTotalExpiredLicenses;
}
