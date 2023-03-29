package com.neoproxy.pro.controller.admin;

import com.neoproxy.pro.controller.BaseController;
import com.neoproxy.pro.dto.*;
import com.neoproxy.pro.service.ModemService;
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
@RequestMapping("/v1/admin/modems")
@Slf4j
public class ModemController extends BaseController {
    ModemService modemService;

    @PostMapping()
    public ResponseEntity<MessageResponse> createNewModem(
            @NonNull @RequestBody ModemRequest modemRequest) {
        try {
            return createSuccessResponse(modemService.createNewModem(modemRequest));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }

    @PutMapping("/{uuid}")
    public ResponseEntity<MessageResponse> updateModem(@NonNull @PathVariable UUID uuid, @NonNull @RequestBody ModemRequest request) {
        try {
            return createSuccessResponse(modemService.updateModem(uuid, request));
        } catch (Exception e) {
            log.error("Update", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }

    @PostMapping("/list")
    public ResponseEntity<MessageResponse> getModems(@RequestBody ModemQueryRequest modemQueryRequest) {
        try {
            return createSuccessResponse(modemService.getModems(modemQueryRequest));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }

    }

    @PostMapping("/overview")
    public ResponseEntity<MessageResponse> overview(@RequestBody ProxyQueryRequest proxyQueryRequest) {
        return null;
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<MessageResponse> detail(@PathVariable UUID uuid) {
        try {
            return createSuccessResponse(modemService.getModem(uuid));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }

    @GetMapping("/{uuid}/sync")
    public ResponseEntity<MessageResponse> sync(@PathVariable UUID uuid) {
        try {
            return createSuccessResponse(modemService.sync(uuid));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }

    @GetMapping("/{uuid}/pause")
    public ResponseEntity<MessageResponse> pause(@PathVariable UUID uuid) {
        try {
            return createSuccessResponse(modemService.pause(uuid));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }

    @GetMapping("/{uuid}/resume")
    public ResponseEntity<MessageResponse> resume(@PathVariable UUID uuid) {
        try {
            return createSuccessResponse(modemService.resume(uuid));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }

    @DeleteMapping("/{uuid}")
    public ResponseEntity<MessageResponse> delete(@NonNull @PathVariable UUID uuid) {
        try {
            return createSuccessResponse(modemService.delete(uuid));
        } catch (Exception e) {
            log.error("Update Package", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }

    @PostMapping("/generate-port")
    public ResponseEntity<MessageResponse> generatePort(@RequestBody GeneratePortRequest request) {
        try {
            return createSuccessResponse(modemService.generatePorts(request));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }
}
