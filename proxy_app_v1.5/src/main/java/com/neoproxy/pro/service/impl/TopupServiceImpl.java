package com.neoproxy.pro.service.impl;

import com.neoproxy.pro.domain.Transaction;
import com.neoproxy.pro.domain.User;
import com.neoproxy.pro.dto.ExceptionDetail;
import com.neoproxy.pro.dto.TopupDto;
import com.neoproxy.pro.dto.TopupRequest;
import com.neoproxy.pro.enums.ErrorCode;
import com.neoproxy.pro.enums.TransactionStatus;
import com.neoproxy.pro.enums.TransactionType;
import com.neoproxy.pro.nowpayments.model.PaymentReq;
import com.neoproxy.pro.nowpayments.model.PaymentResp;
import com.neoproxy.pro.nowpayments.model.PaymentStatusResp;
import com.neoproxy.pro.nowpayments.service.NowPaymentService;
import com.neoproxy.pro.repository.TransactionRepository;
import com.neoproxy.pro.repository.UserRepository;
import com.neoproxy.pro.service.AuthenticationService;
import com.neoproxy.pro.service.TopupService;
import com.neoproxy.pro.service.exception.NeoProxyServiceException;
import com.neoproxy.pro.utils.CommonUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class TopupServiceImpl implements TopupService {
    AuthenticationService authenticationService;
    NowPaymentService nowPaymentService;
    TransactionRepository transactionRepository;
    UserRepository userRepository;

    @Override
    public TopupDto createTopup(TopupRequest topupRequest) {
        User user = authenticationService.getLoggedUser();

        // 0. Validation
        if (topupRequest.getPriceAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.INSUFFICIENT_BALANCE)
                            .message("INSUFFICIENT_BALANCE")
                            .build());
        }

        // 1. Create topup transaction
        String description = "TOPUP " + topupRequest.getPriceAmount() + " " + topupRequest.getPriceCurrency();
        Transaction transaction = Transaction.builder()
                .customer(user)
                .amount(topupRequest.getPriceAmount())
                .currency(topupRequest.getPriceCurrency())
                .type(TransactionType.TOPUP)
                .status(TransactionStatus.PROCESSING)
                .description(description)
                .note("")
                .build();
        transactionRepository.save(transaction);

        // 2. Create payment in nowpayment
        PaymentReq paymentReq = PaymentReq.builder()
                .priceAmount(topupRequest.getPriceAmount())
                .priceCurrency(topupRequest.getPriceCurrency())
                .payCurrency(topupRequest.getPayCurrency())
                .orderId(transaction.getUuid().toString())
                .orderDescription(description)
                .build();
        PaymentResp paymentResp = nowPaymentService.createPayment(paymentReq);
        if (!CommonUtil.isEmpty(paymentResp)) {
            transaction.setReferenceId(paymentResp.getPaymentId());
            transaction.setPayAddress(paymentResp.getPayAddress());
            transaction.setPayCurrency(paymentResp.getPayCurrency().toUpperCase());
            transaction.setPayAmount(paymentResp.getPayAmount());
            String note = String.format("Deposit Address: %s <br/> Amount: %s <br/> Coin: %s", paymentResp.getPayAddress(), paymentResp.getPayAmount(), paymentResp.getPayCurrency().toUpperCase());
            transaction.setNote(note);
            transactionRepository.save(transaction);

            return TopupDto.builder()
                    .payAddress(paymentResp.getPayAddress())
                    .paymentId(paymentResp.getPaymentId())
                    .payAmount(paymentReq.getPriceAmount())
                    .payCurrency(paymentReq.getPayCurrency())
                    .build();
        } else {
            transactionRepository.delete(transaction);
        }

        throw new NeoProxyServiceException(
                ExceptionDetail.builder()
                        .status(HttpStatus.BAD_REQUEST)
                        .errorCode(ErrorCode.PAYMENT_SERVER_ERROR)
                        .message("Payment server error!")
                        .build());
    }

    @Override
    public void updateTopupStatus(Transaction transaction) {
        if (!CommonUtil.isEmpty(transaction.getReferenceId())) {
            // 1.0 Check status in nowpayment
            PaymentStatusResp paymentStatusResp = nowPaymentService.getPaymentStatus(transaction.getReferenceId());
            if (paymentStatusResp != null) {
                transaction.setNote(paymentStatusResp.getPaymentStatus());

                switch (paymentStatusResp.getPaymentStatus()) {
                    case "partially_paid" -> {
                        // Update balance
                        User user = transaction.getCustomer();
                        user.setBalance(user.getBalance().add(paymentStatusResp.getOutcomeAmount()));
                        userRepository.save(user);

                        // Update transaction complete
                        transaction.setStatus(TransactionStatus.PART_PAID);
                        transaction.setAmount(paymentStatusResp.getOutcomeAmount());
                        transactionRepository.save(transaction);

                        log.info("_____ COMPLETE TOPUP OF USER {} WITH AMOUNT {}", user.getName(), paymentStatusResp.getOutcomeAmount());
                    }
                    case "finished" -> {
                        // Update balance
                        User user = transaction.getCustomer();
                        user.setBalance(user.getBalance().add(paymentStatusResp.getPriceAmount()));
                        userRepository.save(user);

                        // Update transaction complete
                        transaction.setStatus(TransactionStatus.COMPLETED);
                        if (paymentStatusResp.getPriceAmount().compareTo(transaction.getAmount()) > 0) {
                            transaction.setAmount(paymentStatusResp.getPriceAmount());
                            transaction.setDescription(transaction.getDescription() + "| From crypto: " + paymentStatusResp.getPriceAmount());
                        }
                        transactionRepository.save(transaction);

                        log.info("_____ COMPLETE TOPUP OF USER {} WITH AMOUNT {}", user.getName(), paymentStatusResp.getPriceAmount());
                    }
                    case "expired" -> {
                        transaction.setStatus(TransactionStatus.EXPIRED);
                        transactionRepository.save(transaction);
                    }
                    case "failed", "refunded" -> {
                        transaction.setStatus(TransactionStatus.FAILED);
                        transactionRepository.save(transaction);
                    }
                }
            }
        }
    }


}
