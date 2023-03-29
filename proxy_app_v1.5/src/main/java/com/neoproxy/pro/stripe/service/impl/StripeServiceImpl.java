package com.neoproxy.pro.stripe.service.impl;

import com.neoproxy.pro.config.AppConf;
import com.neoproxy.pro.domain.Transaction;
import com.neoproxy.pro.domain.User;
import com.neoproxy.pro.enums.ConfigurationType;
import com.neoproxy.pro.enums.TransactionStatus;
import com.neoproxy.pro.enums.TransactionType;
import com.neoproxy.pro.repository.TransactionRepository;
import com.neoproxy.pro.repository.UserRepository;
import com.neoproxy.pro.service.AuthenticationService;
import com.neoproxy.pro.service.ConfigurationService;
import com.neoproxy.pro.stripe.service.StripeService;
import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.*;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.checkout.SessionListLineItemsParams;
import com.stripe.param.checkout.SessionRetrieveParams;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class StripeServiceImpl implements StripeService {
    AppConf appConf;
    AuthenticationService authenticationService;
    UserRepository userRepository;
    TransactionRepository transactionRepository;
    ConfigurationService confService;

    private String getApiKey() {
        return confService.findValueByKey(ConfigurationType.STRIPE_API_SECRET_KEY.name());
    }

    private String getWebhookKey() {
        return confService.findValueByKey(ConfigurationType.STRIPE_WEBHOOK_SECRET_KEY.name());
    }

    @Override
    public String createCheckoutSession(BigDecimal amount) {
        try {
            User user = authenticationService.getLoggedUser();
            String userId = user.getUuid().toString();
            BigDecimal convertAmount = amount.multiply(BigDecimal.valueOf(100));
            Stripe.apiKey = getApiKey();

            log.info("[STRIPE PAYMENT] CREATE NEW CHECKOUT FOR {} WITH {}", userId, amount);
            SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem.builder()
                    .setQuantity(1L)
                    .setPriceData(
                            SessionCreateParams.LineItem.PriceData.builder()
                                    .setCurrency("usd")
                                    .setUnitAmountDecimal(convertAmount)
                                    .setProductData(
                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                    .setName("TOPUP at " + appConf.getName())
                                                    .setDescription(userId)
                                                    .build())
                                    .build())
                    .build();

            List<SessionCreateParams.PaymentMethodType> paymentMethodTypeList = List.of(
                    SessionCreateParams.PaymentMethodType.CARD
            );

            SessionCreateParams params = SessionCreateParams.builder()
                    .addAllPaymentMethodType(paymentMethodTypeList)
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl(appConf.getUrl() + "/user/recharge?payment=stripe&result=success")
                    .setCancelUrl(appConf.getUrl() + "/user/recharge?payment=stripe&result=failed")
                    .setClientReferenceId(userId)
                    .addLineItem(lineItem).build();
            Session session = Session.create(params);
            String url = session.getUrl();
            log.info("[STRIPE PAYMENT] ___ NEW PAYMENT URL SESSION ID {}: {}", session.getId(), url);
            return url;
        } catch (Exception e) {
            log.error("[STRIPE PAYMENT] ERROR WHEN CREATE CHECKOUT SESSION", e);
        }
        return null;
    }

    @Override
    public String webhook(String payload, String sigHeader) {
        log.error("[STRIPE PAYMENT][Webhook] Start handle");

        Event event = null;
        String endpointSecret = getWebhookKey();
        try {
            event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
        } catch (SignatureVerificationException e) {
            // Invalid signature
            log.error("[STRIPE PAYMENT] INVALID SIGNATURE", e);
            return "Error [INVALID SIGNATURE]";
        }

        // Handle the event
        log.info("[STRIPE PAYMENT][Webhook] Handle with event {}", event.getId());

        // Deserialize the nested object inside the event
        EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
        StripeObject stripeObject = null;
        if (dataObjectDeserializer.getObject().isPresent()) {
            stripeObject = dataObjectDeserializer.getObject().get();
        } else {
            // Deserialization failed, probably due to an API version mismatch.
            // Refer to the Javadoc documentation on `EventDataObjectDeserializer` for
            // instructions on how to handle this case, or return an error here.
            return "Error [INVALID WEBHOOK VERSION]";
        }

        switch (event.getType()) {
            case "checkout.session.completed": {
                try {
                    SessionRetrieveParams params = SessionRetrieveParams.builder()
                            .addExpand("line_items")
                            .build();
                    Session se = (Session) stripeObject;
                    Session session = Session.retrieve(se.getId(), params, null);
                    SessionListLineItemsParams listLineItemsParams = SessionListLineItemsParams.builder().build();

                    // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
                    LineItemCollection lineItems = session.listLineItems(listLineItemsParams);
                    // Fulfill the purchase...
                    return fulfillOrder(session.getId(), session.getClientReferenceId(), lineItems);
                } catch (Exception e) {
                    log.error("[STRIPE PAYMENT] ERROR", e);
                    return "Error [" + e.getMessage() + "]";
                }
            }
            // ... handle other event types
            default:
                System.out.println("Unhandled event type: " + event.getType());
        }

        return appConf.getName() + " OK";
    }

    public String fulfillOrder(String sessionId, String clientReferenceId, LineItemCollection lineItems) {
        log.info("[STRIPE PAYMENT] Fulfilling order...");
        LineItem lineItem = lineItems.getData().stream().findFirst().orElse(null);
        if (lineItem == null) {
            return "Error [lineItem is null]";
        }
        Price price = lineItem.getPrice();
        BigDecimal convertAmount = price.getUnitAmountDecimal().divide(BigDecimal.valueOf(100));

        Optional<User> userOptional = userRepository.findByUuid(UUID.fromString(clientReferenceId));
        if (userOptional.isEmpty()) {
            return "Error [ Customer not found " + clientReferenceId + "]";
        }
        User user = userOptional.get();
        String description = "TOPUP " + convertAmount + " " + price.getCurrency() + " (Stripe)";
        Transaction transaction = Transaction.builder()
                .customer(user)
                .amount(convertAmount)
                .currency(price.getCurrency())
                .type(TransactionType.TOPUP)
                .status(TransactionStatus.COMPLETED)
                .description(description)
                .note("")
                .referenceId(sessionId)
                .build();
        transactionRepository.save(transaction);

        return appConf.getName() + " success";
    }
}
