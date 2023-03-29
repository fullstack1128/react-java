package com.neoproxy.pro.service.xproxy;

import com.neoproxy.pro.domain.License;
import com.neoproxy.pro.dto.ProxyRequest;
import com.neoproxy.pro.enums.LicenseStatus;
import com.neoproxy.pro.repository.LicenseRepository;
import com.neoproxy.pro.service.ProxyService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AutoRotationIpService {
    @Autowired
    LicenseRepository licenseRepository;
    @Autowired
    ProxyService proxyService;

    @Scheduled(cron = "${app.scheduler.autoRotationIpCron}")
    public void autoRotationIpCron() throws Exception {
        List<License> licenseList = licenseRepository.getLicensesForAutoRotationIp(LicenseStatus.ACTIVE);
        List<UUID> licensesChangeIps = new ArrayList<>();

        licenseList.forEach(license -> {
            long autoRotationTime = license.getAutoRotationTime();
            long numberOfSecond = autoRotationTime * 60;
            if (license.getLastChangeIp() == null) {
                license.setLastChangeIp(LocalDateTime.now().minusYears(10));
            }
            LocalDateTime localDateTime = license.getLastChangeIp().plusSeconds(numberOfSecond);
            if (LocalDateTime.now().isAfter(localDateTime)) {
                licensesChangeIps.add(license.getUuid());
            }
        });

        if (!licensesChangeIps.isEmpty()) {
            log.info("----- Auto rotation ip with list: " + licensesChangeIps.size());
            ProxyRequest request = new ProxyRequest();
            request.setUuids(licensesChangeIps);
            proxyService.changeProxyIp(request, true);
        }
    }
}
