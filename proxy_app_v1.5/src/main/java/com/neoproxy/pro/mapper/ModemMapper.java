package com.neoproxy.pro.mapper;

import com.neoproxy.pro.domain.Modem;
import com.neoproxy.pro.dto.ModemDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ModemMapper {

    ModemDto toDto(Modem realm);
}
