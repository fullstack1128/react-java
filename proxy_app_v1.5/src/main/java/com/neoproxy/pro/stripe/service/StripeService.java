package com.neoproxy.pro.stripe.service;

import java.math.BigDecimal;

public interface StripeService {
    String createCheckoutSession(BigDecimal amount);

    String webhook(String payload, String sigHeader);
}
