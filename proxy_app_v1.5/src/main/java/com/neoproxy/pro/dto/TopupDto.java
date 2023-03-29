package com.neoproxy.pro.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class TopupDto {
    String paymentId;
    String payAddress;
    BigDecimal payAmount;
    String payCurrency;
}
