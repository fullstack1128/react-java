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
public class PaymentStatusResp {
    @JsonProperty("payment_id")
    String paymentId;
    @JsonProperty("payment_status")
    String paymentStatus;
    @JsonProperty("pay_address")
    String payAddress;
    @JsonProperty("price_amount")
    BigDecimal priceAmount;
    @JsonProperty("price_currency")
    String priceCurrency;
    @JsonProperty("pay_amount")
    BigDecimal payAmount;
    @JsonProperty("actually_paid")
    BigDecimal actuallyPaid;
    @JsonProperty("pay_currency")
    String payCurrency;
    @JsonProperty("created_at")
    String createdAt;
    @JsonProperty("updated_at")
    String updatedAt;
    @JsonProperty("purchase_id")
    String purchaseId;
    @JsonProperty("outcome_currency")
    String outcomeCurrency;
    @JsonProperty("outcome_amount")
    BigDecimal outcomeAmount;

    public boolean isComplete(){
        if(paymentStatus != null){
            return "finished".equals(paymentStatus);
        }
        return false;
    }
}
