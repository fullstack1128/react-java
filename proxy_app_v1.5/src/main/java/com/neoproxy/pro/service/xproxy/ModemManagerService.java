package com.neoproxy.pro.service.xproxy;

import com.neoproxy.pro.domain.Modem;
import com.neoproxy.pro.enums.ModemStatus;
import com.neoproxy.pro.repository.ModemRepository;
import com.neoproxy.pro.service.ModemService;
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
public class ModemManagerService {
    @Autowired
    ModemService modemService;
    @Autowired
    ModemRepository modemRepository;

    @Scheduled(cron = "${app.scheduler.modemSyncCron}")
    public void syncJob() throws Exception {
        log.info("------ Check sync modem -----");
        List<Modem> activeModems = modemRepository.findAllByStatus(ModemStatus.READY);
        log.info("------ Total: {}", activeModems.size());
        if(!activeModems.isEmpty()){
            activeModems.forEach(modem -> {
                log.info("------ Do sync: {}", modem.getUuid().toString());
                modemService.sync(modem.getUuid());
            });
        }
    }
}
