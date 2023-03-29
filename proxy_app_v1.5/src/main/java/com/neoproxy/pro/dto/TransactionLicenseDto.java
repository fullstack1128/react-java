package com.neoproxy.pro.dto;

import com.neoproxy.pro.enums.TransactionStatus;
import com.neoproxy.pro.enums.TransactionType;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TransactionLicenseDto {
    UUID uuid;
    BigDecimal amount;
    String currency;
    TransactionType type;
    TransactionStatus status;
    String description;
    String note;
}
