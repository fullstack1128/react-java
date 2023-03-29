package com.neoproxy.pro.controller;

import com.neoproxy.pro.domain.Configuration;
import com.neoproxy.pro.domain.User;
import com.neoproxy.pro.dto.*;
import com.neoproxy.pro.enums.ConfigurationType;
import com.neoproxy.pro.mapper.UserMapper;
import com.neoproxy.pro.repository.UserRepository;
import com.neoproxy.pro.service.AuthenticationService;
import com.neoproxy.pro.service.ConfigurationService;
import com.neoproxy.pro.service.LicenseService;
import com.neoproxy.pro.service.UserService;

import lombok.AccessLevel;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/v1/users")
public class UserController extends BaseController {
    AuthenticationService authenticationService;
    LicenseService licenseService;
    UserService userService;
    UserMapper userMapper;
    ConfigurationService configService;
    UserRepository userRepository;

    @GetMapping("me")
    public ResponseEntity<UserDto> getLoggedUser() {
        User user = authenticationService.getLoggedUser();
        UserDto userDto = userMapper.toDto(user);
        userDto.setTotalLicense(licenseService.getTotalLicenseByUser());
        userDto.setTotalExpiredLicense(licenseService.getTotalExpiredLicensesByUser());
        userDto.setStripeEnable(Integer.parseInt(configService.findValueByKey(ConfigurationType.STRIPE_ENABLE.name())));

        return ResponseEntity.ok(userDto);
    }

    @GetMapping("change-reminder")
    public ResponseEntity<UserDto> changeReminder() {
        User user = authenticationService.getLoggedUser();
        user.setReminder(user.getReminder() == 1 ? 0 : 1);
        userRepository.save(user);

        UserDto userDto = userMapper.toDto(user);
        userDto.setTotalLicense(licenseService.getTotalLicenseByUser());
        userDto.setTotalExpiredLicense(licenseService.getTotalExpiredLicensesByUser());

        return ResponseEntity.ok(userDto);
    }

    @PostMapping("register")
    public ResponseEntity<UserDto> registerNewUser(
            @RequestBody @NonNull @Valid NewUserRequest newUserRequest) {
        User user =
                userService.createNewUser(newUserRequest);
        return new ResponseEntity<>(userMapper.toDto(user), HttpStatus.CREATED);
    }

    @PutMapping("email")
    public ResponseEntity<UserDto> registerNewUserByEmail(
            @RequestBody @NonNull @Valid UserEmailUpdateRequest userEmailUpdateRequest) {

        User loggedUser = authenticationService.getLoggedUser();
        User user =
                userService.updateUserEmail(
                        loggedUser.getUuid(),
                        userEmailUpdateRequest.getEmail(),
                        userEmailUpdateRequest.getPassword());

        return new ResponseEntity<>(userMapper.toDto(user), HttpStatus.OK);
    }

    @PutMapping("reset-password")
    public ResponseEntity<MessageResponse> resetPassword(
            @RequestBody @NonNull ResetPasswordRequest request) {
        try {
            return createSuccessResponse(userService.resetPassword(request));
        } catch (Exception e) {
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }

    @PostMapping("change-password")
    public ResponseEntity<MessageResponse> changePassword(
            @RequestBody @NonNull ResetPasswordRequest request) {
        try {
            return createSuccessResponse(userService.changePassword(request));
        } catch (Exception e) {
            return createFailResponse(e.getMessage(), null, HttpStatus.OK);
        }
    }

    @GetMapping("faq")
    public ResponseEntity<MessageResponse> faq() {
        String faq = configService.findValueByKey(ConfigurationType.HTML_CUSTOMER_PAGE.name());
        return createSuccessResponse(faq);
    }
}
