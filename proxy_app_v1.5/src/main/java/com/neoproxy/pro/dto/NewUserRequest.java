package com.neoproxy.pro.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.validation.constraints.NotBlank;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NewUserRequest {
    @NotBlank String name;
    @NotBlank String userName;
    @NotBlank String email;
    @NotBlank String password;
    String phone;
    String affiliateCode;
    String address;
    String city;
    String country;
}
