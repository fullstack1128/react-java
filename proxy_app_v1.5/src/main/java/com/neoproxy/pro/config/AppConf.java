package com.neoproxy.pro.config;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "spring.application")
@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AppConf {
    String name;
    String url;
}
