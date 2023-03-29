package com.neoproxy.pro.service.exception;

import com.neoproxy.pro.dto.ExceptionDetail;

import lombok.Getter;
import lombok.NonNull;

@Getter
public class NeoProxyServiceException extends RuntimeException {

    ExceptionDetail detail;

    public NeoProxyServiceException(@NonNull ExceptionDetail detail) {
        super(detail.getMessage());
        this.detail = detail;
    }
}
