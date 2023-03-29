package com.neoproxy.pro.nowpayments.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentReq {
    @JsonProperty("price_amount")
    BigDecimal priceAmount;
    @JsonProperty("price_currency")
    String priceCurrency;
    @JsonProperty("pay_currency")
    String payCurrency;
    @JsonProperty("order_id")
    String orderId;
    @JsonProperty("order_description")
    String orderDescription;
//    @JsonProperty("case")
//    String testCase;
}
