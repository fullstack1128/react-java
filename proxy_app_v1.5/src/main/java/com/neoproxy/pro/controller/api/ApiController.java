package com.neoproxy.pro.controller.api;

import com.neoproxy.pro.controller.BaseController;
import com.neoproxy.pro.dto.MessageResponse;
import com.neoproxy.pro.service.ApiService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/v1/api")
@Slf4j
public class ApiController extends BaseController {
    ApiService apiService;

    @GetMapping("/proxy/change-ip")
    public ResponseEntity<MessageResponse> changeIp(
            @RequestParam("license") String license) {
        try {
            return createSuccessResponse(apiService.changeIp(license));
        } catch (Exception e) {
            log.error("ChangeIp", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }

    }

    @GetMapping("/proxy/status")
    public ResponseEntity<MessageResponse> getStatus(
            @RequestParam("license") String license) {
        try {
            return createSuccessResponse(apiService.getStatus(license));
        } catch (Exception e) {
            log.error("ChangeIp", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }

    }
}
