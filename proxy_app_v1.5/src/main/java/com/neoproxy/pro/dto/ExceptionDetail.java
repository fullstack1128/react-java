package com.neoproxy.pro.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.neoproxy.pro.enums.ErrorCode;

import lombok.*;
import lombok.experimental.FieldDefaults;

import org.springframework.http.HttpStatus;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ExceptionDetail {

    @JsonIgnore HttpStatus status;
    ErrorCode errorCode;
    String message;
    Object detail;
}
