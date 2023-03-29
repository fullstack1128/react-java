package com.neoproxy.pro.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TopupRequest {
    BigDecimal priceAmount;
    String priceCurrency;
    String payCurrency;
}
