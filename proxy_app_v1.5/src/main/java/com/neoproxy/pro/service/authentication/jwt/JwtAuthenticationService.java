package com.neoproxy.pro.service.authentication.jwt;

import org.springframework.security.core.Authentication;

import java.util.Optional;

public interface JwtAuthenticationService {
    Optional<Authentication> authenticate(String token);
}
