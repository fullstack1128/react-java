package com.neoproxy.pro.service;

import com.neoproxy.pro.domain.Modem;
import com.neoproxy.pro.dto.*;
import com.neoproxy.pro.enums.ModemType;
import lombok.NonNull;

import java.util.List;
import java.util.UUID;

public interface ModemService {
    TableData<ModemDto> getModems(ModemQueryRequest request);

    ModemDto getModem(@NonNull UUID uuid);

    ModemDto createNewModem(@NonNull ModemRequest modemRequest);

    ModemDto updateModem(@NonNull UUID uuid, @NonNull ModemRequest modemRequest);

    ModemDto syncNewPorts(@NonNull Modem modem, Integer distancePortTo);

    ModemDto sync(@NonNull UUID uuid);

    ModemDto pause(@NonNull UUID uuid);

    ModemDto resume(@NonNull UUID uuid);

    Integer getTotalModem(ModemType modemType);

    Integer getTotalPendingModems(ModemType modemType);

    boolean delete(UUID uuid);

    boolean generatePorts(GeneratePortRequest request);

}
