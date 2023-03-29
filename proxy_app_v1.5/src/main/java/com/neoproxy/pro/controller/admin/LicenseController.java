package com.neoproxy.pro.controller.admin;

import com.neoproxy.pro.controller.BaseController;
import com.neoproxy.pro.dto.*;
import com.neoproxy.pro.service.LicenseService;
import lombok.AccessLevel;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/v1/admin/licenses")
@Slf4j
public class LicenseController extends BaseController {
    LicenseService licenseService;

    @PostMapping("/list")
    public ResponseEntity<MessageResponse> getLicenses(@RequestBody LicenseQueryRequest licenseQueryRequest, HttpServletRequest request) {
        try {
            return createSuccessResponse(licenseService.getLicenses(licenseQueryRequest));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }

    }

    @PutMapping("/{uuid}")
    public ResponseEntity<MessageResponse> updateLicense(@NonNull @PathVariable UUID uuid, @NonNull @RequestBody LicenseRequest request) {
        try {
            return createSuccessResponse(licenseService.updateLicense(uuid, request));
        } catch (Exception e) {
            log.error("Update", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }

    @PostMapping("/switch-modem")
    public ResponseEntity<MessageResponse> switchNewModem(@RequestBody SwitchModemRequest request) {
        try {
            return createSuccessResponse(licenseService.switchToNewModem(request));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }

    @PostMapping("/update-license")
    public ResponseEntity<MessageResponse> updateLicenseStatus(@RequestBody UpdateLicenseStatusRequest request) {
        try {
            return createSuccessResponse(licenseService.updateLicenseStatus(request));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }

    @PostMapping("/import-license")
    public ResponseEntity<MessageResponse> importLicense(@RequestParam("file") MultipartFile file) {
        try {
            ImportLicenseRequest request = new ImportLicenseRequest();
            request.setContents(file.getInputStream().readAllBytes());
            request.setMimeType(file.getContentType());
            request.setFileName(file.getOriginalFilename());
            request.setSize(file.getSize());

            return createSuccessResponse(licenseService.importLicense(request));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }

    @RequestMapping("/get-import-template")
    public void excel(HttpServletResponse servletResponse) throws IOException {
        servletResponse.setContentType("text/csv; charset=UTF-8");
        servletResponse.setCharacterEncoding( "UTF-8" );
        servletResponse.addHeader("Content-Disposition","attachment; filename=\"import-license-template.csv\"");
        licenseService.getImportTemplate(servletResponse.getWriter());
    }
}
