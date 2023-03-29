package com.neoproxy.pro.nowpayments.service;


import com.neoproxy.pro.nowpayments.model.*;

import java.math.BigDecimal;
import java.util.List;

public interface NowPaymentService {
    List<String> getAvailableCurrencies();

    MinAmountResp getMinimumAmount(String currencyFrom);

    EstimatePriceResp getEstimatedPrice(String currencyFrom, String currencyTo, BigDecimal amount);

    PaymentResp createPayment(PaymentReq paymentReq);

    PaymentStatusResp getPaymentStatus(String paymentId);
}
