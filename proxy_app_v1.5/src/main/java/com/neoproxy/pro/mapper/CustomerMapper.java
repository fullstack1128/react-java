package com.neoproxy.pro.mapper;

import com.neoproxy.pro.domain.User;
import com.neoproxy.pro.dto.CustomerDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CustomerMapper {
    CustomerDto toDto(User user);
}
