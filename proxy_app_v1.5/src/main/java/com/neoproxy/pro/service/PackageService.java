package com.neoproxy.pro.service;

import com.neoproxy.pro.dto.*;
import lombok.NonNull;

import java.util.List;
import java.util.UUID;

public interface PackageService {
    TableData<PackageDto> getPackages(PackageQueryRequest request);

    PackageDto getPackage(@NonNull UUID uuid);

    PackageDto createNewPackage(@NonNull PackageRequest packageRequest);

    PackageDto updatePackage(@NonNull UUID uuid, @NonNull PackageRequest packageRequest);

    boolean deletePackage(@NonNull UUID uuid);
}
