package com.neoproxy.pro.mapper;

import com.neoproxy.pro.domain.Location;
import com.neoproxy.pro.dto.LocationDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LocationMapper {

    LocationDto toDto(Location realm);
}
