package com.neoproxy.pro.mapper;

import com.neoproxy.pro.domain.Configuration;
import com.neoproxy.pro.dto.ConfigurationDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ConfigurationMapper {

    ConfigurationDto toDto(Configuration configuration);
}
