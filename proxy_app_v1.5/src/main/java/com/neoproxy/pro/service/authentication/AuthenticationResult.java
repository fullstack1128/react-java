package com.neoproxy.pro.service.authentication;

import com.neoproxy.pro.domain.User;

import lombok.Getter;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.util.Assert;

import java.util.Collection;

@Getter
public class AuthenticationResult extends AbstractAuthenticationToken {

    protected final User user;

    public AuthenticationResult(User user, Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
        super.setAuthenticated(true); // must use super, as we override
        this.user = user;
    }

    @Override
    public Object getCredentials() {
        // TODO: update credential
        return null;
    }

    @Override
    public Object getPrincipal() {
        return this.user;
    }

    @Override
    public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
        Assert.isTrue(
                !isAuthenticated,
                "Cannot set this token to trusted - use constructor which takes a GrantedAuthority list instead");
        super.setAuthenticated(false);
    }

    public User getUser() {
        return user;
    }
}
