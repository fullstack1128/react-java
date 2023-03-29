package com.neoproxy.pro.service.impl;

import com.neoproxy.pro.domain.License;
import com.neoproxy.pro.dto.ExceptionDetail;
import com.neoproxy.pro.dto.ProxyRequest;
import com.neoproxy.pro.dto.api.ApiProxyDto;
import com.neoproxy.pro.enums.ErrorCode;
import com.neoproxy.pro.enums.LicenseStatus;
import com.neoproxy.pro.repository.LicenseRepository;
import com.neoproxy.pro.service.ApiService;
import com.neoproxy.pro.service.ProxyService;
import com.neoproxy.pro.service.exception.NeoProxyServiceException;
import com.neoproxy.pro.utils.CommonUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApiServiceImpl implements ApiService {
    ProxyService proxyService;
    LicenseRepository licenseRepository;

    private License getLicense(String license) {
        if (CommonUtil.isEmpty(license)) {
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.LICENSE_ACTIVE_NOT_FOUND)
                            .message("License not found. Please double check the information!")
                            .build());
        }

        UUID uuidLicense;
        try {
            uuidLicense = UUID.fromString(license);
        } catch (Exception e) {
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.LICENSE_ACTIVE_NOT_FOUND)
                            .message("License not found. Please double check the information!")
                            .build());
        }

        Optional<License> licenseOptional = Optional.ofNullable(licenseRepository.findByUuid(uuidLicense));
        if (licenseOptional.isEmpty() || !licenseOptional.get().getStatus().equals(LicenseStatus.ACTIVE)) {
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.LICENSE_ACTIVE_NOT_FOUND)
                            .message("License not found. Please double check the information!")
                            .build());
        }

        return licenseOptional.get();
    }

    @Override
    public boolean changeIp(String licenseKey) {
        License license = getLicense(licenseKey);
        ProxyRequest request = new ProxyRequest();
        request.setUuids(List.of(license.getHttpProxy().getUuid()));
        return proxyService.changeProxyIpOnePort(request, license);
    }


    @Override
    public ApiProxyDto getStatus(String licenseKey) {
        License license = getLicense(licenseKey);
        if (license.getHttpProxy() != null || license.getHttpProxy().getStatus() != null) {
            return ApiProxyDto.builder()
                    .ip(license.getHttpProxy().getPublicIp())
                    .httpPort(license.getHttpProxy() != null ? license.getHttpProxy().getSharedPort() : null)
                    .sockPort(license.getSockProxy().getSharedPort() != null ? license.getSockProxy().getSharedPort() : null)
                    .authenticationUser(license.getHttpProxy() != null ? license.getHttpProxy().getAuthenticationUsers() : null)
                    .authenticationIps(license.getHttpProxy() != null ? license.getHttpProxy().getAuthorizationIps() : null)
                    .status(license.getHttpProxy() != null ? license.getHttpProxy().getStatus().name() : null)
                    .build();
        }
        return null;
    }
}
