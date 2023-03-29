package com.neoproxy.pro.controller.client;

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

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/v1/client/licenses")
@Slf4j
public class ClientLicenseController extends BaseController {
    LicenseService licenseService;

    @PostMapping("/list")
    public ResponseEntity<MessageResponse> getClientLicenses(@RequestBody LicenseQueryRequest licenseQueryRequest) {
        try {
            return createSuccessResponse(licenseService.getLicenses(licenseQueryRequest));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }

    @PostMapping("/extend")
    public ResponseEntity<MessageResponse> renewIp(@RequestBody ExtendLicenseRequest request) {
        try {
            return createSuccessResponse(licenseService.extendByLicenseIds(request));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }

    @PostMapping("/change-rotation-time")
    public ResponseEntity<MessageResponse> changeRotationTime(@RequestBody ChangeRotationTimeRequest request) {
        try {
            return createSuccessResponse(licenseService.changeRotationTime(request));
        } catch (Exception e) {
            log.error("Update", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }

    @RequestMapping("/excel")
    public void excel(HttpServletResponse servletResponse, @RequestParam("customer") String customer,  @RequestParam("format") String format) throws IOException {
        servletResponse.setContentType("text/csv; charset=UTF-8");
        servletResponse.setCharacterEncoding( "UTF-8" );
        if (format.equals("undefined")){
            servletResponse.addHeader("Content-Disposition","attachment; filename=\"licenses.csv\"");
        }else{
            servletResponse.addHeader("Content-Disposition","attachment; filename=\"licenses.txt\"");
        }
        licenseService.writeLicenseToCsv(customer, format, servletResponse.getWriter());
    }
}
