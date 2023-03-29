package com.neoproxy.pro.xproxy.config;

import com.neoproxy.pro.utils.httpClient.ApiConfig;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app.xproxy-configuration")
@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class XProxyConf {
    ApiConfig infoList;
    ApiConfig sharedProxies;
    ApiConfig generatePort;
    ApiConfig bulkEdit;
    ApiConfig resetDataCounter;
    ApiConfig resetPort;
    ApiConfig rebootPort;
    ApiConfig getListPosition;
}
