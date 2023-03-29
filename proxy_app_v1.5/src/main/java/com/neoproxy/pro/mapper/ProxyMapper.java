package com.neoproxy.pro.mapper;

import com.neoproxy.pro.domain.Proxy;
import com.neoproxy.pro.dto.ProxyDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProxyMapper {

    ProxyDto toDto(Proxy realm);
}
