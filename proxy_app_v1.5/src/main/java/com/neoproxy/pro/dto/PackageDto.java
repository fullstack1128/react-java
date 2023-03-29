package com.neoproxy.pro.dto;

import com.neoproxy.pro.enums.PackageStatus;
import com.neoproxy.pro.enums.PackageType;
import com.neoproxy.pro.enums.PackageUnit;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PackageDto {
    UUID uuid;
    String name;
    PackageUnit packageUnit;
    Integer duration;
    BigDecimal price;
    PackageStatus status;
    PackageType type;
    Integer allowChangeIp;
    Integer allowChangeLocation;
    Integer allowChangeISP;
    Integer minTimeChangeIp;
    String location;
    String isp;
    Integer seq;
    String content;
    int availableProxy;
}
