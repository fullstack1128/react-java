package com.neoproxy.pro.mapper;

import com.neoproxy.pro.domain.License;
import com.neoproxy.pro.dto.LicenseDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LicenseMapper {

    LicenseDto toDto(License license);
}
