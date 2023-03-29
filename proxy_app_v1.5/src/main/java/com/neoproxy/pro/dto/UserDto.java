package com.neoproxy.pro.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.neoproxy.pro.domain.Configuration;
import com.neoproxy.pro.enums.AuthenticationProvider;
import com.neoproxy.pro.enums.UserRole;
import com.neoproxy.pro.enums.UserStatus;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDto {
    UUID uuid;
    String userName;
    String name;
    String email;
    String phoneNumber;
    UserStatus status;
    UserRole role;
    List<String> permissions;
    boolean active;
    String fullName;
    BigDecimal balance;
    String transferContent;
    String affiliateCode;
    String address;
    String city;
    String country;
    int reminder;
    int stripeEnable;

    Integer totalLicense;
    Integer totalExpiredLicense;

    List<Configuration> promotions;
}
