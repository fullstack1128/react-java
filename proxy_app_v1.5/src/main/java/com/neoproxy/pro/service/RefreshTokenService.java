package com.neoproxy.pro.service;

import com.neoproxy.pro.domain.RefreshToken;
import lombok.NonNull;

import javax.validation.constraints.NotBlank;

public interface RefreshTokenService {
    RefreshToken getByRefreshToken(@NotBlank String requestRefreshToken);

    boolean isRefreshTokenExpired(@NonNull RefreshToken refreshToken);
}
