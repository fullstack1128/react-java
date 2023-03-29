package com.neoproxy.pro.service.nowpayments;

import com.neoproxy.pro.domain.License;
import com.neoproxy.pro.domain.Transaction;
import com.neoproxy.pro.enums.TransactionStatus;
import com.neoproxy.pro.enums.TransactionType;
import com.neoproxy.pro.repository.TransactionRepository;
import com.neoproxy.pro.service.LicenseService;
import com.neoproxy.pro.service.TopupService;
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
public class TopupManagerService {
    TransactionRepository transactionRepository;
    TopupService topupService;

    @Scheduled(cron = "${app.scheduler.checkTopupStatusCron}")
    public void checkLicenseExpired() throws Exception {
        log.info("------ Check topup status -----");
        List<Transaction> pendingTransactions = transactionRepository.findTransactionsByType(TransactionType.TOPUP, TransactionStatus.PROCESSING);
        log.info("------ Total: {}", pendingTransactions.size());
        if(!pendingTransactions.isEmpty()){
            pendingTransactions.forEach(topupService::updateTopupStatus);
        }
    }
}
