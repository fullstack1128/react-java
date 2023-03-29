package com.neoproxy.pro.mapper;

import com.neoproxy.pro.domain.User;
import com.neoproxy.pro.dto.UserDto;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    //    @Mapping(target = "uuid", expression = "java(UUID.fromString(user.getUuid()))")
    UserDto toDto(User user);
}
