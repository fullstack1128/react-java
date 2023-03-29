package com.neoproxy.pro.config;

import com.neoproxy.pro.service.exception.NeoProxyServiceException;
import com.neoproxy.pro.dto.ExceptionDetail;
import com.neoproxy.pro.enums.ErrorCode;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class RestResponseStatusExceptionResolver extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {IllegalArgumentException.class, IllegalStateException.class})
    protected ResponseEntity<Object> handleIllegalArgumentException(
            RuntimeException ex, WebRequest request) {
        String bodyOfResponse = ex.getMessage();
        return handleExceptionInternal(
                ex, bodyOfResponse, new HttpHeaders(), HttpStatus.CONFLICT, request);
    }

    @ExceptionHandler(value = {NeoProxyServiceException.class})
    protected ResponseEntity<Object> handleRuneHunterServiceException(
            NeoProxyServiceException ex, WebRequest request) {
        ExceptionDetail detail = ex.getDetail();
        return handleExceptionInternal(ex, detail, new HttpHeaders(), detail.getStatus(), request);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult()
                .getAllErrors()
                .forEach(
                        (error) -> {
                            String fieldName = ((FieldError) error).getField();
                            String message = error.getDefaultMessage();
                            errors.put(fieldName, message);
                        });

        return new ResponseEntity<>(
                ExceptionDetail.builder()
                        .errorCode(ErrorCode.BAD_DATA)
                        .message("Invalid arguments")
                        .detail(errors)
                        .build(),
                HttpStatus.BAD_REQUEST);
    }
}
