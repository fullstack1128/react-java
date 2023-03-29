package com.neoproxy.pro.dto;

import com.neoproxy.pro.enums.ModemType;
import com.neoproxy.pro.enums.PackageStatus;
import com.neoproxy.pro.enums.PackageType;
import com.neoproxy.pro.enums.PackageUnit;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PackageRequest {
    String uuid;
    String name;
    PackageUnit packageUnit;
    Integer duration;
    BigDecimal price;
    String location;
    PackageStatus status;
    PackageType type;
    Integer allowChangeIp;
    Integer allowChangeLocation;
    Long minTimeChangeIp;
    String isp;
    Integer seq;
    String content;
}
