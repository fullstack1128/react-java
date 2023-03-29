package com.neoproxy.pro.service.authentication.jwt;

import com.neoproxy.pro.domain.User;
import com.neoproxy.pro.dto.ExceptionDetail;
import com.neoproxy.pro.enums.ErrorCode;
import com.neoproxy.pro.service.UserService;
import com.neoproxy.pro.service.authentication.AuthenticationResult;
import com.neoproxy.pro.service.exception.NeoProxyServiceException;
import com.neoproxy.pro.utils.JwtTokenUtil;

import io.jsonwebtoken.ExpiredJwtException;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class JwtAuthenticationServiceImpl implements JwtAuthenticationService {

    public static final String BEARER = "Bearer ";
    UserService userService;
    JwtTokenUtil jwtTokenUtil;

    @Override
    public Optional<Authentication> authenticate(String jwtToken) {
        if (jwtToken == null || jwtToken.isBlank()) return Optional.empty();

        try {
            String token =
                    jwtToken.startsWith(JwtAuthenticationServiceImpl.BEARER)
                            ? jwtToken.substring(BEARER.length())
                            : jwtToken;
            String userUuid = jwtTokenUtil.getSubjectFromToken(token);

            if (userUuid != null) {
                User user = userService.getUser(UUID.fromString(userUuid));
                if (jwtTokenUtil.validateToken(token, user.getUuid().toString())) {
                    return Optional.of(
                            new AuthenticationResult(
                                    user,
                                    Collections.singleton((GrantedAuthority) () -> "ROLE_USER")));
                }
            }
        } catch (IllegalArgumentException e) {
            log.error("Error when extract jwt token: {}", e);
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.UNAUTHORIZED)
                            .errorCode(ErrorCode.UNAUTHORIZED)
                            .message("Unable to get JWT Token")
                            .build());
        } catch (ExpiredJwtException e) {
            log.error("Error when extract jwt token: {}", e);
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.UNAUTHORIZED)
                            .errorCode(ErrorCode.UNAUTHORIZED)
                            .message("JWT Token has expired")
                            .build());
        } catch (Exception e) {
            log.error("Error when extract jwt token: {}", e);
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.UNAUTHORIZED)
                            .errorCode(ErrorCode.UNAUTHORIZED)
                            .message(e.getMessage())
                            .build());
        }

        return Optional.empty();
    }
}
