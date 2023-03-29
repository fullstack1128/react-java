package com.neoproxy.pro.service.xproxy;

import com.neoproxy.pro.domain.License;
import com.neoproxy.pro.service.LicenseService;
import com.neoproxy.pro.xproxy.model.PortType;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class LicenseManagerService {
    @Autowired
    LicenseService licenseService;

    @Scheduled(cron = "${app.scheduler.checkLicenseExpiredCron}")
    public void checkLicenseExpired() throws Exception {
        log.info("------ Check license expired -----");
        List<License> expiredLicenseList = licenseService.getExpiredLicenses();
        log.info("------ Total: {}", expiredLicenseList.size());
        if(!expiredLicenseList.isEmpty()){
            expiredLicenseList.forEach(licenseService::updateExpiredLicense);
        }
    }

    @Scheduled(cron = "${app.scheduler.remindLicenseExpiredCron}")
    public void remindLicenseExpired() throws Exception {
        log.info("------ Check license remind -----");
        List<License> remindLicenses = licenseService.getRemindLicenses();
        log.info("------ Total: {}", remindLicenses.size());
        if(!remindLicenses.isEmpty()){
            remindLicenses.forEach(licenseService::remindExpiredLicense);
        }
    }
}
