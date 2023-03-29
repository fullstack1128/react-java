package com.neoproxy.pro.service;

import com.neoproxy.pro.domain.User;
import com.neoproxy.pro.dto.UserDto;

public interface AuthenticationService {

    User getLoggedUser();

    String generateRefreshToken(User user);

    String generateAccessToken(User user);
}
