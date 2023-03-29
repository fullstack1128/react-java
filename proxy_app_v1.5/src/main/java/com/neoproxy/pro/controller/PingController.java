package com.neoproxy.pro.controller;

import com.neoproxy.pro.config.AppConf;
import com.neoproxy.pro.enums.ConfigurationType;
import com.neoproxy.pro.mail.EmailDetails;
import com.neoproxy.pro.mail.EmailService;
import com.neoproxy.pro.service.ConfigurationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/v1/ping")
public class PingController {
    ConfigurationService conf;

    AppConf appConf;
    //EmailService emailService;

    @GetMapping
    public ResponseEntity<String> ping() {
        String template1 = """
                Hi #USER_NAME,
                Thank you for your purchase new proxy.
                Here is your proxy:
                [begin]
                #PACKAGE_NAME
                Duration : #START_DATE - #END_DATE
                Format HTTP: #FORMAT_HTTP
                Format Socks5: #FORMAT_SOCK5
                Authentication: #AUTHENTICATION
                Link status: #LINK_STATUS
                Link change IP: #LINK_CHANGE_IP
                [end]
                You can check detail on website $URL too.
                Thank you so much.""".replace("$URL", appConf.getUrl());
        String template2 = """
                Hi #USER_NAME,
                Your proxy is expiring in 24hours next. Please renew to not interrupt using proxy.
                #PACKAGE_NAME : #START_DATE - #END_DATE
                Format HTTP: #FORMAT_HTTP
                Format Socks5: #FORMAT_SOCK5
                You can check detail on website $URL too.
                Thank you so much.""".replace("$URL", appConf.getUrl());

        conf.insertConf(ConfigurationType.NOW_PAYMENTS_API_KEY, "6Z98V44-X1XMR1R-GSR3X4E-321E0NH");
        conf.insertConf(ConfigurationType.EMAIL_TEMPLATE_PURCHASE, template1);
        conf.insertConf(ConfigurationType.EMAIL_TEMPLATE_EXPIRING, template2);
        conf.insertConf(ConfigurationType.EMAIL_SERVER_HOST, "HOST");
        conf.insertConf(ConfigurationType.EMAIL_SERVER_PORT, "PORT");
        conf.insertConf(ConfigurationType.EMAIL_SERVER_USERNAME, "USERNAME");
        conf.insertConf(ConfigurationType.EMAIL_SERVER_PASSWORD, "PASSWORD");
        conf.insertConf(ConfigurationType.EMAIL_SERVER_SENDER, "USERNAME");
        conf.insertConf(ConfigurationType.HTML_CUSTOMER_PAGE, "");
        conf.insertConf(ConfigurationType.STRIPE_ENABLE, "1");
        conf.insertConf(ConfigurationType.STRIPE_API_SECRET_KEY, "sk_test_51MPRBYJtQOTZHhCo1B8hTOnsBaowH9aFe1BKT7ZwDSB4HLh1mqveNXZ9kX2CMiZV4aEDSuFk8UGEilzsRTTKOzPS00PPQsgnoU");
        conf.insertConf(ConfigurationType.STRIPE_WEBHOOK_SECRET_KEY, "whsec_fb7870ba9a1b9525e896c8f5a7be78be2a354e5d8655bc775830f6cf5e0a2ac0");

//        System.out.println("-----START TEST EMAIL");
//        String emailBody = conf.getEmailTemplate(ConfigurationType.EMAIL_TEMPLATE_PURCHASE.name());
//        EmailDetails emailDetails = EmailDetails.builder()
//                .subject("[] Thank You For Your Purchase")
//                .msgBody(emailBody)
//                .recipient("lmh0912190@gmail.com")
//                .build();
//        String result = emailService.sendSimpleMail(emailDetails);

        return ResponseEntity.ok("PONG");
    }
}
