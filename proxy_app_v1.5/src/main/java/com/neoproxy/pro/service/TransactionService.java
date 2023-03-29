package com.neoproxy.pro.service;

import com.neoproxy.pro.dto.*;
import lombok.NonNull;
import org.springframework.web.bind.annotation.PathVariable;

import java.math.BigDecimal;
import java.util.UUID;

public interface TransactionService {
    TableData<TransactionDto> getTransactions(TransactionQueryRequest request);

    TransactionDto createNewTransaction(@NonNull OrderProxyRequest request);

    TransactionDto updateTransaction(@NonNull UUID uuid, @NonNull TransactionRequest packageRequest);

    boolean deleteTransaction(@NonNull UUID uuid);

    TransactionDto topup(UUID customerUUID, BigDecimal amount);

    TransactionDto refund(UUID customerUUID, BigDecimal amount);

}
