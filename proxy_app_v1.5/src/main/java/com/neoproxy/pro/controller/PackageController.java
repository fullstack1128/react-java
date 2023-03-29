package com.neoproxy.pro.controller;

import com.neoproxy.pro.dto.*;
import com.neoproxy.pro.enums.MessageResponseStatus;
import com.neoproxy.pro.service.PackageService;
import io.jsonwebtoken.Claims;
import lombok.AccessLevel;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/v1/packages")
@Slf4j
public class PackageController extends BaseController {
    PackageService packageService;

    @PostMapping()
    public ResponseEntity<MessageResponse> createNewPackage(
            @NonNull @RequestBody PackageRequest packageRequest) {
        try {
            return createSuccessResponse(packageService.createNewPackage(packageRequest));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }

    @PutMapping("/{uuid}")
    public ResponseEntity<MessageResponse> updatePackage(@NonNull @PathVariable UUID uuid, @NonNull @RequestBody PackageRequest packageRequest) {
        try {
            return createSuccessResponse(packageService.updatePackage(uuid, packageRequest));
        } catch (Exception e) {
            log.error("Update Package", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }

    @PostMapping("/list")
    public ResponseEntity<MessageResponse> getPackages(@RequestBody PackageQueryRequest packageQueryRequest) {
        return createSuccessResponse(packageService.getPackages(packageQueryRequest));
    }

    @DeleteMapping("/{uuid}")
    public ResponseEntity<MessageResponse> deletePackage(@NonNull @PathVariable UUID uuid) {
        try {
            return createSuccessResponse(packageService.deletePackage(uuid));
        } catch (Exception e) {
            log.error("Update Package", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }
}
