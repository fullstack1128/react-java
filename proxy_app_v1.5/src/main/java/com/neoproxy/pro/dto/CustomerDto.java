package com.neoproxy.pro.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerDto {
    String userName;
    String name;
    String email;
    UUID uuid;
    BigDecimal balance;
    String phoneNumber;
    String address;
    String city;
    String country;
    LocalDateTime createdAt;
}
