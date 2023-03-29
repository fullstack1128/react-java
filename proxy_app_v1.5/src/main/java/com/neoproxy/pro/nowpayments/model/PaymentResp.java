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
public class PaymentResp {
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
    @JsonProperty("pay_currency")
    String payCurrency;
    @JsonProperty("order_id")
    String orderId;
    @JsonProperty("order_description")
    String orderDescription;
    @JsonProperty("ipn_callback_url")
    String ipnCallbackUrl;
    @JsonProperty("created_at")
    String createdAt;
    @JsonProperty("updated_at")
    String updatedAt;
    @JsonProperty("purchase_id")
    String purchaseId;
}
