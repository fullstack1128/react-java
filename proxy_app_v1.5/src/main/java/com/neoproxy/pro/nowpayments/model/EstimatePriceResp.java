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
public class EstimatePriceResp {
    @JsonProperty("currency_from")
    String currencyFrom;
    @JsonProperty("amount_from")
    BigDecimal amountFrom;
    @JsonProperty("currency_to")
    String currencyTo;
    @JsonProperty("estimated_amount")
    BigDecimal estimatedAmount;
}
