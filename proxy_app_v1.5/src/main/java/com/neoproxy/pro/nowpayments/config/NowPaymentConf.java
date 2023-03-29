package com.neoproxy.pro.nowpayments.config;

import com.neoproxy.pro.utils.httpClient.ApiConfig;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@ConfigurationProperties(prefix = "app.nowpayment-configuration")
@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NowPaymentConf {
    ApiConfig availableCurrencies;
    ApiConfig minimumAmount;
    ApiConfig estimatedPrice;
    ApiConfig payment;
    ApiConfig paymentStatus;
    List<String> currencies;
}