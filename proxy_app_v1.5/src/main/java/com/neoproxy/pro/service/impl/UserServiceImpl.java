package com.neoproxy.pro.service.impl;

import com.neoproxy.pro.dto.NewUserRequest;
import com.neoproxy.pro.dto.ResetPasswordRequest;
import com.neoproxy.pro.dto.UserDto;
import com.neoproxy.pro.enums.UserRole;
import com.neoproxy.pro.mapper.UserMapper;
import com.neoproxy.pro.mapper.UserMapperImpl;
import com.neoproxy.pro.repository.UserRepository;
import com.neoproxy.pro.service.exception.NeoProxyServiceException;
import com.neoproxy.pro.domain.User;
import com.neoproxy.pro.dto.ExceptionDetail;
import com.neoproxy.pro.enums.ErrorCode;
import com.neoproxy.pro.enums.UserStatus;
import com.neoproxy.pro.service.AuthenticationService;
import com.neoproxy.pro.service.UserService;

import com.neoproxy.pro.utils.CommonUtil;
import lombok.AccessLevel;
import lombok.NonNull;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

import javax.validation.constraints.NotBlank;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserServiceImpl implements UserService {
    UserMapper userMapper = new UserMapperImpl();
    PasswordEncoder passwordEncoder;
    UserRepository userRepository;
    AuthenticationService authenticationService;

    public UserServiceImpl(
            @Lazy PasswordEncoder passwordEncoder,
            UserRepository userRepository,
            AuthenticationService authenticationService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationService = authenticationService;
    }

    @Override
    @Transactional
    public User createNewUser(NewUserRequest newUserRequest) {
        Optional<User> userOptional = userRepository.findByEmail(newUserRequest.getEmail());
        if (userOptional.isPresent())
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.USER_EXISTED)
                            .message("The email has been registered. Please use another one.")
                            .build());

        userOptional = userRepository.findByUserName(newUserRequest.getUserName());
        if (userOptional.isPresent())
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.USER_EXISTED)
                            .message("The userName has been registered. Please use another one.")
                            .build());

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        User user =
                User.builder()
                        .userName("user" + generateLastName())
                        .name(newUserRequest.getName())
                        .email(newUserRequest.getEmail())
                        .password(passwordEncoder.encode(newUserRequest.getPassword()))
                        .balance(BigDecimal.ZERO)
                        .status(UserStatus.ACTIVE)
                        .role(UserRole.CLIENT)
                        .phoneNumber(newUserRequest.getPhone())
                        .address(newUserRequest.getAddress())
                        .city(newUserRequest.getCity())
                        .country(newUserRequest.getCountry())
                        .build();

        log.debug("Creating new user: {}", user);
        userRepository.save(user);

        return user;
    }

    @Override
    public User getUser(@NonNull UUID userUuid) {
        Optional<User> userOpt = userRepository.findByUuid(userUuid);
        if (userOpt.isEmpty()) throw new IllegalArgumentException("User not found");
        return userOpt.get();
    }

    @Override
    public User updateUserEmail(
            @NonNull UUID userUuid, @NotBlank String email, @NotBlank String password) {
        User user = getUser(userUuid);
        validateEmail(email);

        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        return userRepository.save(user);
    }

    private void validateEmail(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent())
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.EMAIL_ADDRESS_EXISTED)
                            .message("Email address has been registered")
                            .build());

        if (!EmailValidator.getInstance().isValid(email))
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.BAD_DATA)
                            .message("Invalid email format")
                            .build());
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository
                .findByEmail(email)
                .orElseThrow(
                        () ->
                                new NeoProxyServiceException(
                                        ExceptionDetail.builder()
                                                .status(HttpStatus.NOT_FOUND)
                                                .errorCode(ErrorCode.USER_NOT_FOUND)
                                                .message("User not found")
                                                .build()));
    }

    @Override
    public UserDto resetPassword(ResetPasswordRequest request) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        User user = authenticationService.getLoggedUser();

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.WRONG_PASSWORD)
                            .message("Wrong password")
                            .build());
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        return userMapper.toDto(user);
    }

    @Override
    public UserDto resetPassword(UUID userUuid, String newPassword) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        Optional<User> userOptional = userRepository.findByUuid(userUuid);
        User user = userOptional.get();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        return userMapper.toDto(user);
    }

    @Override
    public UserDto changePassword(ResetPasswordRequest request) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() ->
                        new NeoProxyServiceException(
                                ExceptionDetail.builder()
                                        .status(HttpStatus.NOT_FOUND)
                                        .errorCode(ErrorCode.USER_NOT_FOUND)
                                        .message("User not found")
                                        .build()));
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.WRONG_PASSWORD)
                            .message("Wrong password")
                            .build());
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        return userMapper.toDto(user);
    }

    @Override
    public UserDto changeEmail(UUID uuid, String newEmail) {
        Optional<User> userOptional = userRepository.findByUuid(uuid);
        User user = userOptional.get();
        user.setEmail(newEmail);
        userRepository.save(user);

        return userMapper.toDto(user);
    }

    private String generateLastName() {
        return String.valueOf(new Random().nextInt(10000, 100_000));
    }
}
