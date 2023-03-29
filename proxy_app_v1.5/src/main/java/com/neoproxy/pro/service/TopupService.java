package com.neoproxy.pro.service;

import com.neoproxy.pro.domain.Transaction;
import com.neoproxy.pro.dto.TopupDto;
import com.neoproxy.pro.dto.TopupRequest;

public interface TopupService {
    TopupDto createTopup(TopupRequest topupRequest);

    void updateTopupStatus(Transaction transaction);
}
