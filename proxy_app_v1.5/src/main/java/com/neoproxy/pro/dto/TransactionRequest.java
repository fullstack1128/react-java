package com.neoproxy.pro.dto;

import com.neoproxy.pro.domain.User;
import com.neoproxy.pro.enums.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionRequest {
    User customer;
    BigDecimal amount;
    String currency;
    TransactionType type;
    TransactionStatus status;
    String description;
    String note;
}
