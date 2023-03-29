package com.neoproxy.pro.service.impl;

import com.neoproxy.pro.domain.Configuration;
import com.neoproxy.pro.domain.Configuration;
import com.neoproxy.pro.dto.*;
import com.neoproxy.pro.enums.ConfigurationType;
import com.neoproxy.pro.enums.ErrorCode;
import com.neoproxy.pro.mapper.ConfigurationMapper;
import com.neoproxy.pro.mapper.ConfigurationMapperImpl;
import com.neoproxy.pro.repository.ConfigurationRepository;
import com.neoproxy.pro.service.AuthenticationService;
import com.neoproxy.pro.service.ConfigurationService;
import com.neoproxy.pro.service.exception.NeoProxyServiceException;
import com.neoproxy.pro.utils.CommonUtil;
import lombok.AccessLevel;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ConfigurationServiceImpl implements ConfigurationService {
    AuthenticationService authenticationService;
    ConfigurationRepository configurationRepository;
    ConfigurationMapper configurationMapper = new ConfigurationMapperImpl();

    @Override
    public TableData<ConfigurationDto> getConfigurations(ConfigurationQueryRequest request) {
        TableData<ConfigurationDto> tableData = new TableData<>();
        Sort sortBy = Sort.by(Sort.Direction.DESC, "key");
        Pageable paging = PageRequest.of(request.getPage(), request.getPageSize(), sortBy);

        ExampleMatcher matcher = ExampleMatcher
                .matching()
                .withMatcher("key", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase());
        Configuration searchConfig = new Configuration();
        if (!CommonUtil.isEmpty(request.getSearch())) {
            searchConfig.setKey(request.getSearch());
        }

        Example<Configuration> example = Example.of(searchConfig, matcher);
        Page<Configuration> item = configurationRepository.findAll(example, paging);

        item.getContent().forEach(configuration -> {
            tableData.getData().add(configurationMapper.toDto(configuration));
        });
        tableData.setPages(item.getTotalPages());

        return tableData;
    }

    @Override
    public ConfigurationDto updateConfiguration(@NonNull UUID uuid, @NonNull ConfigurationRequest configurationRequest) {
        Configuration configuration = configurationRepository.findByUuid(uuid);
        if (configuration == null)
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.BAD_DATA)
                            .message("Could not find configuration with this uuid")
                            .build());

        configuration.setValue(configurationRequest.getValue());
        configuration.setDescription(configurationRequest.getDescription());

        configurationRepository.save(configuration);

        return configurationMapper.toDto(configuration);
    }

    @Override
    public String findValueByKey(String key) {
        String value = configurationRepository.findValueByKey(key);
        if (CommonUtil.isEmpty(value)) {
            Configuration newConfiguration = Configuration.builder()
                    .key(key)
                    .value("DEFAULT")
                    .description("No define!")
                    .build();
            configurationRepository.save(newConfiguration);
            return newConfiguration.getValue();
        }
        return value;
    }

    @Override
    public Configuration findConfigByKey(String key) {
        return configurationRepository.findByKey(key);
    }

    @Override
    public boolean insertConf(ConfigurationType configurationType, String value) {
        String val = configurationRepository.findValueByKey(configurationType.name());
        if (CommonUtil.isEmpty(val)) {
            Configuration newConfiguration = Configuration.builder()
                    .key(configurationType.name())
                    .value(value)
                    .description(configurationType.getDescription())
                    .build();
            configurationRepository.save(newConfiguration);
        }
        return true;
    }

    @Override
    public boolean insertConf(String key, String value, String description) {
        String val = configurationRepository.findValueByKey(key);
        if (CommonUtil.isEmpty(val)) {
            Configuration newConfiguration = Configuration.builder()
                    .key(key)
                    .value(value)
                    .description(description)
                    .build();
            configurationRepository.save(newConfiguration);
        }
        return true;
    }

    @Override
    public String getEmailTemplate(String key) {
        String value = configurationRepository.findValueByKey(key);
        if (CommonUtil.isEmpty(value)) {
            return "";
        }
        return value.replaceAll("<p>", "")
                .replaceAll("</p>", "")
                .replaceAll("<br />", "")
                .replaceAll("<br/>", "");
    }
}
