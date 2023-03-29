package com.neoproxy.pro.controller;

import com.neoproxy.pro.dto.MessageResponse;
import com.neoproxy.pro.service.ISPService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/v1/isp")
@Slf4j
public class ISPController extends BaseController {
    ISPService ispService;

    @GetMapping("/list")
    public ResponseEntity<MessageResponse> getLocations() {
        return createSuccessResponse(ispService.getIspData());
    }
}
