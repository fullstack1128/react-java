package com.neoproxy.pro.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Builder
public class ImportData {
    String domain;
    Integer position;
    String customerName;
    UUID customerId;
    LocalDateTime licenseExpiresAt;
}
