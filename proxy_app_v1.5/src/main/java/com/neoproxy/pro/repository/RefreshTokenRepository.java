package com.neoproxy.pro.repository;

import com.neoproxy.pro.domain.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    @Query(
            """
            SELECT rt
            FROM RefreshToken rt
            JOIN FETCH rt.user u
            WHERE rt.refreshToken = :refreshToken
            """)
    Optional<RefreshToken> findByRefreshToken(String refreshToken);
}
