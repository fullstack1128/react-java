package com.neoproxy.pro.service.impl;

import com.neoproxy.pro.domain.Modem;
import com.neoproxy.pro.dto.LocationDto;
import com.neoproxy.pro.dto.TableData;
import com.neoproxy.pro.enums.ModemStatus;
import com.neoproxy.pro.enums.ModemType;
import com.neoproxy.pro.mapper.LocationMapper;
import com.neoproxy.pro.mapper.LocationMapperImpl;
import com.neoproxy.pro.repository.LocationRepository;
import com.neoproxy.pro.repository.ModemRepository;
import com.neoproxy.pro.service.LocationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class LocationServiceImpl implements LocationService {
    LocationRepository locationRepository;
    ModemRepository modemRepository;
    LocationMapper locationMapper = new LocationMapperImpl();

    @Override
    public TableData<LocationDto> getLocations() {
        TableData<LocationDto> data = new TableData<>();

        List<Modem> activeModems = modemRepository.findAllByStatus(ModemStatus.READY);
        List<String> deduped = activeModems.stream().map(Modem::getLocation).distinct().toList();
        deduped.forEach(location -> {
            Optional<Modem> modemWan = activeModems.stream()
                    .filter(i -> i.getLocation().equals(location) && i.getType().equals(ModemType.WAN)).findFirst();
            modemWan.ifPresent(i -> {
                data.getData().add(LocationDto.builder()
                        .name(i.getLocation())
                        .id(i.getLocation())
                        .modemType(i.getType())
                        .build());
            });
            Optional<Modem> modemMobile = activeModems.stream()
                    .filter(i -> i.getLocation().equals(location) && i.getType().equals(ModemType.MOBILE)).findFirst();
            modemMobile.ifPresent(i -> {
                data.getData().add(LocationDto.builder()
                        .name(i.getLocation())
                        .id(i.getLocation())
                        .modemType(i.getType())
                        .build());
            });
        });
        data.setPages(deduped.size());

        return data;
    }
}
