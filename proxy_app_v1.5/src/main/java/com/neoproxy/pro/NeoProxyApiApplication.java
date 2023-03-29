package com.neoproxy.pro;

import com.neoproxy.pro.utils.httpClient.ApiClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableJpaAuditing
@EnableScheduling
public class NeoProxyApiApplication {
    public static void main(String[] args) {
        ApiClient.init();
        SpringApplication.run(NeoProxyApiApplication.class, args);
    }

}
