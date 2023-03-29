package com.neoproxy.pro.service;

import com.neoproxy.pro.domain.User;
import com.neoproxy.pro.dto.NewUserRequest;
import com.neoproxy.pro.dto.ResetPasswordRequest;
import com.neoproxy.pro.dto.UserDto;

import java.util.UUID;

public interface UserService {
    User createNewUser(NewUserRequest newUserRequest);

    User getUser(UUID uuid);

    User updateUserEmail(UUID uuid, String email, String password);

    User getUserByEmail(String email);

    UserDto resetPassword(ResetPasswordRequest request);

    UserDto resetPassword(UUID userUuid, String newPassword);

    UserDto changePassword(ResetPasswordRequest request);

    UserDto changeEmail(UUID uuid, String newEmail);
}
