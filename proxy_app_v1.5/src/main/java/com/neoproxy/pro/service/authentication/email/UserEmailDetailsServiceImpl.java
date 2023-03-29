package com.neoproxy.pro.service.authentication.email;

import com.neoproxy.pro.domain.User;
import com.neoproxy.pro.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collections;

@RequiredArgsConstructor
public class UserEmailDetailsServiceImpl implements UserDetailsService {

    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userService.getUserByEmail(email);
        return new UserEmailDetails(
                user, Collections.singleton((GrantedAuthority) () -> "ROLE_USER"));
    }
}
