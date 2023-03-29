package com.neoproxy.pro.service;

import com.neoproxy.pro.dto.LocationDto;
import com.neoproxy.pro.dto.TableData;

public interface LocationService {
    TableData<LocationDto> getLocations();
}
