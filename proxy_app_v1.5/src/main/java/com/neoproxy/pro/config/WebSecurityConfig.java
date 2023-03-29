package com.neoproxy.pro.config;

import com.neoproxy.pro.service.UserService;
import com.neoproxy.pro.service.authentication.email.UserEmailDetailsServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

//    @Autowired
//    WalletAuthenticationProvider walletAuthenticationProvider;

    @Autowired JwtRequestFilter jwtRequestFilter;

    @Autowired
    UserService userService;

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) {
//        // support login by wallet
//        auth.authenticationProvider(walletAuthenticationProvider);

        // support login by email/pasword
        auth.authenticationProvider(daoAuthenticationProvider());
    }

    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(bCryptPasswordEncoder);
        provider.setUserDetailsService(new UserEmailDetailsServiceImpl(userService));
        return provider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return bCryptPasswordEncoder;
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        // We don't need CSRF for this example
        httpSecurity
                .csrf()
                .disable()
                // dont authenticate this particular request
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/v1/ping")
                .permitAll()
                .antMatchers(HttpMethod.POST, "/v1/users/register")
                .permitAll()
                .antMatchers(HttpMethod.POST, "/v1/users/change-password")
                .permitAll()
                .antMatchers(HttpMethod.GET, "/v1/api/**")
                .permitAll()
                .antMatchers(HttpMethod.GET, "/v1/client/licenses/excel")
                .permitAll()
                .antMatchers(HttpMethod.GET, "/v1/admin/licenses/get-import-template")
                .permitAll()
                .antMatchers(HttpMethod.GET, "/v1/admin/licenses/tracking")
                .permitAll()
                .antMatchers(HttpMethod.POST, "/v1/users/authentication")
                .permitAll()
                .antMatchers(HttpMethod.POST, "/v1/users/authentication/email")
                .permitAll()
                .antMatchers(HttpMethod.POST, "/v1/users/refreshToken")
                .permitAll()
                .antMatchers(HttpMethod.POST, "/v1/client/payments/webhook")
                .permitAll()
//                .antMatchers(HttpMethod.POST, "/v1/packages/**")
//                .hasRole("ADMIN")
                .
                // all other requests need to be authenticated
                anyRequest()
                .authenticated()
                .and()
                .
                // make sure we use stateless session; session won't be used to
                // store user's state.
                exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // Add a filter to validate the tokens with every request
        httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .antMatchers("/v1/rh-websocket/**")
                .and()
                .ignoring()
                .antMatchers("/index.html")
                .and()
                .ignoring()
                .antMatchers("/app.js")
                .and()
                .ignoring()
                .antMatchers("/favicon.ico")
                .and();
    }
}
