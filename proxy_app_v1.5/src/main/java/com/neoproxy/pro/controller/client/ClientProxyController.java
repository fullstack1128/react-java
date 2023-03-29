package com.neoproxy.pro.controller.client;

import com.neoproxy.pro.controller.BaseController;
import com.neoproxy.pro.dto.*;
import com.neoproxy.pro.service.LicenseService;
import com.neoproxy.pro.service.ProxyService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/v1/client/proxies")
@Slf4j
public class ClientProxyController extends BaseController {
    ProxyService proxyService;
    LicenseService licenseService;

    @PostMapping("/list")
    public ResponseEntity<MessageResponse> getProxyWans(@RequestBody ProxyQueryRequest proxyQueryRequest) {
        try {
            return createSuccessResponse(proxyService.getProxies(proxyQueryRequest));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }

    @PostMapping("/change-ip")
    public ResponseEntity<MessageResponse> changeProxyIp(@RequestBody ProxyRequest request) {
        try {
            return createSuccessResponse(proxyService.changeProxyIp(request, false));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }

    @PostMapping("/reboot-device")
    public ResponseEntity<MessageResponse> rebootDevice(@RequestBody ProxyRequest request) {
        try {
            return createSuccessResponse(proxyService.rebootDevice(request));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }

    @PostMapping("/change-location")
    public ResponseEntity<MessageResponse> changeLocation(@RequestBody ProxyRequest request) {
        try {
            log.info("------ Change location with location {}", request.getLocation());
            return createSuccessResponse(proxyService.changeProxyIp(request, false));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }

    @PostMapping("/update-authenticate")
    public ResponseEntity<MessageResponse> updateAuthenticate(@RequestBody ProxyRequest request) {
        try {
            return createSuccessResponse(proxyService.updateAuthentication(request));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }

    @PostMapping("/extend-license")
    public ResponseEntity<MessageResponse> extendLicense(@RequestBody ExtendLicenseRequest request) {
        try {
            return createSuccessResponse(licenseService.extendByLicenseIds(request));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }

}
