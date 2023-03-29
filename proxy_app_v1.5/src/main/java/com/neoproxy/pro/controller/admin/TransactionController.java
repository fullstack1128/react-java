package com.neoproxy.pro.controller.admin;

import com.neoproxy.pro.controller.BaseController;
import com.neoproxy.pro.dto.MessageResponse;
import com.neoproxy.pro.dto.TransactionQueryRequest;
import com.neoproxy.pro.service.TransactionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/v1/admin/transactions")
@Slf4j
public class TransactionController extends BaseController {
    TransactionService transactionService;

    @PostMapping("/list")
    public ResponseEntity<MessageResponse> getList(@RequestBody TransactionQueryRequest request) {
        try {
            return createSuccessResponse(transactionService.getTransactions(request));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }

    }
}
