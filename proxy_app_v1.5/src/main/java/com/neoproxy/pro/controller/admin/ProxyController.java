package com.neoproxy.pro.controller.admin;

import com.neoproxy.pro.controller.BaseController;
import com.neoproxy.pro.dto.*;
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
@RequestMapping("/v1/admin/proxies")
@Slf4j
public class ProxyController extends BaseController {
    ProxyService proxyService;

    @PostMapping("/list")
    public ResponseEntity<MessageResponse> getProxies(@RequestBody ProxyQueryRequest proxyQueryRequest) {
        try {
            return createSuccessResponse(proxyService.getProxies(proxyQueryRequest));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<MessageResponse> deleteProxies(@RequestBody ProxyRequest request) {
        try {
            return createSuccessResponse(proxyService.deleteProxies(request));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }
}
