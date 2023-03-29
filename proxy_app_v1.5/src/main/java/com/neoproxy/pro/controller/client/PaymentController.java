package com.neoproxy.pro.controller.client;

import com.neoproxy.pro.controller.BaseController;
import com.neoproxy.pro.dto.MessageResponse;
import com.neoproxy.pro.dto.TopupRequest;
import com.neoproxy.pro.nowpayments.service.NowPaymentService;
import com.neoproxy.pro.service.TopupService;
import com.neoproxy.pro.stripe.service.StripeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.math.BigDecimal;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/v1/client/payments")
@Slf4j
public class PaymentController extends BaseController {
    NowPaymentService nowPaymentService;
    TopupService topupService;
    StripeService stripeService;

    @GetMapping("/currencies")
    public ResponseEntity<MessageResponse> getCurrencies() {
        try {
            return createSuccessResponse(nowPaymentService.getAvailableCurrencies());
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }

    }

    @GetMapping("/minimum-amount")
    public ResponseEntity<MessageResponse> getMinimumAmount(
            @RequestParam("currency_from") String currencyFrom
    ) {
        try {
            return createSuccessResponse(nowPaymentService.getMinimumAmount(currencyFrom));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }

    }

    @GetMapping("/estimated-price")
    public ResponseEntity<MessageResponse> getEstimatedPrice(
            @RequestParam("currency_from") String currencyFrom,
            @RequestParam("currency_to") String currencyTo,
            @RequestParam("amount") BigDecimal amount
    ) {
        try {
            return createSuccessResponse(nowPaymentService.getEstimatedPrice(currencyFrom, currencyTo, amount));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }

    }

    @PostMapping("/topup")
    public ResponseEntity<MessageResponse> topup(@RequestBody TopupRequest topupRequest) {
        try {
            return createSuccessResponse(topupService.createTopup(topupRequest));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }

    @GetMapping("/get-payment-url")
    public ResponseEntity<MessageResponse> getPaymentUrl(@RequestParam("amount") BigDecimal amount) {
        try {
            return createSuccessResponse(stripeService.createCheckoutSession(amount));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }

    }

    @PostMapping("/webhook")
    public ResponseEntity<MessageResponse> webhook(@RequestBody String payload,  @RequestHeader("Stripe-Signature") String sigHeader) {
        try {
            log.info("[STRIPE PAYMENT] [Webhook] RECEIVED NEW HOOK");
             return createSuccessResponse(stripeService.webhook(payload, sigHeader));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }

    }
}
