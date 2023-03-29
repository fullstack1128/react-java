package com.neoproxy.pro.service.impl;

import com.neoproxy.pro.domain.Modem;
import com.neoproxy.pro.repository.ModemRepository;
import com.neoproxy.pro.service.ISPService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ISPServiceImpl implements ISPService {
    ModemRepository modemRepository;

    @Override
    public List<String> getIspData() {
        List<Modem> modems = modemRepository.findAll();
        return modems.stream().map(Modem::getIsp).distinct().toList();
    }
}
