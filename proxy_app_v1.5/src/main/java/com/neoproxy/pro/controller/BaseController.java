package com.neoproxy.pro.controller;

import com.neoproxy.pro.dto.MessageResponse;
import com.neoproxy.pro.enums.MessageResponseStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Slf4j
public abstract class BaseController {
    public <T> ResponseEntity<MessageResponse> createSuccessResponse(T body) {
        MessageResponse<T> result = new MessageResponse<>(MessageResponseStatus.SUCCESS.getKey(), MessageResponseStatus.SUCCESS.getValue(), body);
        return createResponse(result, HttpStatus.OK);
    }

    public <T> ResponseEntity<MessageResponse> createFailResponse(String message, T body, HttpStatus httpStatus) {
        MessageResponse<T> result = new MessageResponse<>(MessageResponseStatus.FAIL.getKey(), message, body);
        return createResponse(result, httpStatus);
    }

    public <T> ResponseEntity<T> createResponse(T body, HttpStatus httpStatus) {
        return new ResponseEntity<>(body, httpStatus);
    }
}
