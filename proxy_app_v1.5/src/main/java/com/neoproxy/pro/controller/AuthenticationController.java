package com.neoproxy.pro.controller;

import com.neoproxy.pro.dto.EmailAuthenticationRequest;
import com.neoproxy.pro.dto.LoggedUserDto;
import com.neoproxy.pro.dto.UserDto;
import com.neoproxy.pro.enums.UserRole;
import com.neoproxy.pro.service.AuthenticationService;
import com.neoproxy.pro.service.authentication.email.UserEmailDetails;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/v1/users")
public class AuthenticationController {
    List<String> adminRoles = List.of(
            "ADMIN_OVERVIEW", "ADMIN_MODEM", "ADMIN_PROXY", "ADMIN_CUSTOMER", "ADMIN_LICENSE", "ADMIN_PACKAGE", "ADMIN_TRANSACTION", "CLIENT_ACCOUNT", "ADMIN_CONFIGURATION", "CHANGE_PASSWORD");
    List<String> clientRoles = List.of("CLIENT_DASHBOARD", "CLIENT_PROXY", "CLIENT_RECHARGE", "CLIENT_ACCOUNT", "CLIENT_FAQ");

    AuthenticationService authenticationService;
    AuthenticationManager authenticationManager;

    @PostMapping(path = "authentication/email")
    public ResponseEntity<LoggedUserDto> authenticateByEmail(
            @Valid @RequestBody EmailAuthenticationRequest authenticationRequest) {

        Principal principal = authenticationRequest::getUsername;
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                        principal, authenticationRequest.getPassword());

        UserEmailDetails userDetails =
                (UserEmailDetails)
                        authenticationManager.authenticate(authentication).getPrincipal();
        UserDto userDto = UserDto.builder()
                .fullName(userDetails.getUser().getName())
                .active(true)
                .role(userDetails.getUser().getRole())
                .permissions(UserRole.ADMIN.equals(userDetails.getUser().getRole()) ? adminRoles : clientRoles)
                .uuid(userDetails.getUser().getUuid())
                .build();
        LoggedUserDto loggedUserDto = LoggedUserDto.builder()
                .user(userDto)
                .token(authenticationService.generateAccessToken(userDetails.getUser()))
                .build();
        return ResponseEntity.ok(loggedUserDto);
    }
}
