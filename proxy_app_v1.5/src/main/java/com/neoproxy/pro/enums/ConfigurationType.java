package com.neoproxy.pro.enums;

public enum ConfigurationType {
    NOW_PAYMENTS_API_KEY("Api key of nowpayments"),
    EMAIL_TEMPLATE_PURCHASE("Email template for purchase"),
    EMAIL_TEMPLATE_EXPIRING("Email template for the reminder"),
    EMAIL_SERVER_HOST("Email Server Host"),
    EMAIL_SERVER_PORT("Email Server Port"),
    EMAIL_SERVER_USERNAME("Email Server Username"),
    EMAIL_SERVER_PASSWORD("Email Server Password"),
    EMAIL_SERVER_SENDER("Email Server Sender"),
    HTML_CUSTOMER_PAGE("HTML Customer Page"),
    STRIPE_ENABLE("Stripe Enable (1 for enable)"),
    STRIPE_API_SECRET_KEY("Stripe API secret key"),
    STRIPE_WEBHOOK_SECRET_KEY("Stripe webhook secret key");;

    String description;

    ConfigurationType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
