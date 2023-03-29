package com.neoproxy.pro.controller.admin;

import com.neoproxy.pro.controller.BaseController;
import com.neoproxy.pro.dto.MessageResponse;
import com.neoproxy.pro.dto.OverviewDto;
import com.neoproxy.pro.enums.ModemType;
import com.neoproxy.pro.service.CustomerService;
import com.neoproxy.pro.service.LicenseService;
import com.neoproxy.pro.service.ModemService;
import com.neoproxy.pro.service.ProxyService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/v1/admin/overview")
@Slf4j
public class OverviewController extends BaseController {
    ModemService modemService;
    ProxyService proxyService;
    CustomerService customerService;
    LicenseService licenseService;

    @GetMapping
    public ResponseEntity<MessageResponse> overview() {
        try {
            OverviewDto overviewDto = OverviewDto.builder()
                    .totalCustomers(customerService.getTotalCustomers())
                    .totalCusHaveActiveLicenses(customerService.getTotalCusHaveActiveLicenses())

                    .totalModems(modemService.getTotalModem(ModemType.MOBILE))
                    .totalPendingModems(modemService.getTotalPendingModems(ModemType.MOBILE))
                    .totalActiveLicenses(licenseService.getTotalActiveLicense(ModemType.MOBILE))
                    .totalExpiredLicenses(licenseService.getTotalExpiredLicenses(ModemType.MOBILE))
                    .totalProxies(proxyService.getTotalProxy(ModemType.MOBILE))
                    .totalAvailableProxies(proxyService.getTotalAvailableProxy(ModemType.MOBILE))

//                    .mTotalModems(modemService.getTotalModem(ModemType.MOBILE))
//                    .mTotalPendingModems(modemService.getTotalPendingModems(ModemType.MOBILE))
//                    .mTotalActiveLicenses(licenseService.getTotalActiveLicense(ModemType.MOBILE))
//                    .mTotalExpiredLicenses(licenseService.getTotalExpiredLicenses(ModemType.MOBILE))
//                    .mTotalProxies(proxyService.getTotalProxy(ModemType.MOBILE))
//                    .mTotalAvailableProxies(proxyService.getTotalAvailableProxy(ModemType.MOBILE))
                    .build();
            return createSuccessResponse(overviewDto);
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }
}
