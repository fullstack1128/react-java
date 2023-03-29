package com.neoproxy.pro.mapper;

import com.neoproxy.pro.domain.Package;
import com.neoproxy.pro.dto.PackageDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PackageMapper {

    PackageDto toDto(Package realm);
}
