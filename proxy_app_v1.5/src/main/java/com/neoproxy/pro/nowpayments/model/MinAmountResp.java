package com.neoproxy.pro.nowpayments.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MinAmountResp {
    @JsonProperty("currency_from")
    String currencyFrom;
    @JsonProperty("currency_to")
    String currencyTo;
    @JsonProperty("min_amount")
    BigDecimal minAmount;
}
