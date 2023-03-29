package com.neoproxy.pro.controller.admin;

import com.neoproxy.pro.controller.BaseController;
import com.neoproxy.pro.dto.*;
import com.neoproxy.pro.service.CustomerService;
import com.neoproxy.pro.service.TransactionService;
import com.neoproxy.pro.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/v1/admin/customers")
@Slf4j
public class CustomerController extends BaseController {
    CustomerService customerService;
    UserService userService;
    TransactionService transactionService;

    @PostMapping("/list")
    public ResponseEntity<MessageResponse> getList(@RequestBody CustomerQueryRequest request) {
        try {
            return createSuccessResponse(customerService.getCustomers(request));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }

    @PostMapping("/{uuid}/reset-password/{new-password}")
    public ResponseEntity<MessageResponse> resetPassword(@PathVariable UUID uuid, @PathVariable("new-password") String newPassword) {
        try {
            return createSuccessResponse(userService.resetPassword(uuid, newPassword));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }

    @PostMapping("/{uuid}/change-email/{new-email}")
    public ResponseEntity<MessageResponse> changeEmail(@PathVariable UUID uuid, @PathVariable("new-email") String newEmail) {
        try {
            return createSuccessResponse(userService.changeEmail(uuid, newEmail));
        } catch (Exception e) {
            log.error("Create ", e);
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }

    @PostMapping("/{uuid}/topup/{amount}")
    public ResponseEntity<MessageResponse> topup(@PathVariable UUID uuid, @PathVariable BigDecimal amount) {
        return createSuccessResponse(transactionService.topup(uuid, amount));
    }

    @PostMapping("/{uuid}/refund/{amount}")
    public ResponseEntity<MessageResponse> refund(@PathVariable UUID uuid, @PathVariable BigDecimal amount) {
        return createSuccessResponse(transactionService.refund(uuid, amount));
    }
}
