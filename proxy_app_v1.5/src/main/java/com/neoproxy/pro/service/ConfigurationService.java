package com.neoproxy.pro.service;

import com.neoproxy.pro.domain.Configuration;
import com.neoproxy.pro.dto.*;
import com.neoproxy.pro.enums.ConfigurationType;
import lombok.NonNull;

import java.util.UUID;

public interface ConfigurationService {
    TableData<ConfigurationDto> getConfigurations(ConfigurationQueryRequest request);

    ConfigurationDto updateConfiguration(@NonNull UUID uuid, @NonNull ConfigurationRequest modemRequest);

    String findValueByKey(String key);

    Configuration findConfigByKey(String key);

    boolean insertConf(ConfigurationType configurationType, String value);

    boolean insertConf(String key, String value, String description);

    String getEmailTemplate(String key);
}
