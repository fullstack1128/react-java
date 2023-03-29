package com.neoproxy.pro.service.impl;

import com.neoproxy.pro.dto.UserDto;
import com.neoproxy.pro.mapper.UserMapper;
import com.neoproxy.pro.mapper.UserMapperImpl;
import com.neoproxy.pro.repository.RefreshTokenRepository;
import com.neoproxy.pro.repository.UserRepository;
import com.neoproxy.pro.service.authentication.AuthenticationResult;
import com.neoproxy.pro.service.exception.NeoProxyServiceException;
import com.neoproxy.pro.domain.RefreshToken;
import com.neoproxy.pro.domain.User;
import com.neoproxy.pro.dto.ExceptionDetail;
import com.neoproxy.pro.enums.ErrorCode;
import com.neoproxy.pro.service.AuthenticationService;
import com.neoproxy.pro.service.RefreshTokenService;
import com.neoproxy.pro.utils.CommonUtil;
import com.neoproxy.pro.utils.JwtTokenUtil;

import io.jsonwebtoken.ExpiredJwtException;

import lombok.AccessLevel;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

import javax.validation.constraints.NotBlank;

/** @author Hung Nguyen */
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AuthenticationServiceImpl implements AuthenticationService, RefreshTokenService {

    public static final String BEARER = "Bearer ";
    public static final String UEID = "ueid";
    UserMapper userMapper = new UserMapperImpl();
    RefreshTokenRepository refreshTokenRepository;
    UserRepository userRepository;
    JwtTokenUtil jwtTokenUtil;

    @Override
    public String generateRefreshToken(@NonNull User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put(UEID, UUID.randomUUID());
        String refreshToken = jwtTokenUtil.generateRefreshToken(claims, user.getUuid().toString());
        refreshTokenRepository.save(
                RefreshToken.builder().refreshToken(refreshToken).user(user).build());
        return refreshToken;
    }

    @Override
    public String generateAccessToken(@NonNull User user) {
        Map<String, Object> claims = new HashMap<>();
        return jwtTokenUtil.generateToken(claims, user.getUuid().toString());
    }

    @Override
    public User getLoggedUser() {
        AuthenticationResult authentication =
                (AuthenticationResult) SecurityContextHolder.getContext().getAuthentication();
        return authentication.getUser();
    }

    @Override
    public RefreshToken getByRefreshToken(@NotBlank String requestRefreshToken) {
        Optional<RefreshToken> refreshTokenOptional =
                refreshTokenRepository.findByRefreshToken(requestRefreshToken);
        if (refreshTokenOptional.isEmpty())
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.NOT_FOUND)
                            .errorCode(ErrorCode.REFRESH_TOKEN_NOT_FOUND)
                            .message("Refresh token not found")
                            .build());
        return refreshTokenOptional.get();
    }

    @Override
    public boolean isRefreshTokenExpired(@NonNull RefreshToken refreshToken) {
        try {
            Boolean isValid =
                    jwtTokenUtil.validateToken(
                            refreshToken.getRefreshToken(),
                            refreshToken.getUser().getUuid().toString());
            if (!isValid) {
                refreshTokenRepository.delete(refreshToken);
                return true;
            }
        } catch (ExpiredJwtException e) {
            refreshTokenRepository.delete(refreshToken);
            return true;
        }
        return false;
    }


}
