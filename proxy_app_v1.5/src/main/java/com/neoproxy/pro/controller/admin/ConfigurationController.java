package com.neoproxy.pro.controller.admin;

import com.neoproxy.pro.controller.BaseController;
import com.neoproxy.pro.dto.*;
import com.neoproxy.pro.service.ConfigurationService;
import lombok.AccessLevel;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/v1/admin/configurations")
@Slf4j
public class ConfigurationController extends BaseController {
    ConfigurationService configurationService;

    @PostMapping("/list")
    public ResponseEntity<MessageResponse> getList(@RequestBody ConfigurationQueryRequest request) {
        try {
            return createSuccessResponse(configurationService.getConfigurations(request));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }

    @PutMapping("/{uuid}")
    public ResponseEntity<MessageResponse> updateConfiguration(@NonNull @PathVariable UUID uuid, @NonNull @RequestBody ConfigurationRequest request) {
        try {
            return createSuccessResponse(configurationService.updateConfiguration(uuid, request));
        } catch (Exception e) {
            log.error("Update", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }
}