package com.neoproxy.pro.dto;

import com.neoproxy.pro.enums.ModemStatus;
import com.neoproxy.pro.enums.ModemType;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ModemDto {
    UUID uuid;
    String name;
    String domain;
    String location;
    ModemType type;
    ModemStatus status;
    String isp;
    String userName;
    String password;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    List<Integer> positions;
}
