package com.neoproxy.pro.dto;

import com.neoproxy.pro.enums.ModemStatus;
import com.neoproxy.pro.enums.ModemType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ModemRequest {
    String name;
    String userName;
    String password;
    String domain;
    String location;
    ModemType type;
    ModemStatus status;
    String isp;
}
