package com.neoproxy.pro.dto;

import com.neoproxy.pro.enums.AuthenticationProvider;

import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@SuperBuilder(toBuilder = true)
public class WalletDto {

    @NotBlank String publicAddress;

    @NotNull AuthenticationProvider authenticationProvider;
}
