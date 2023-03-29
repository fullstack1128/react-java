package com.neoproxy.pro.repository;

import com.neoproxy.pro.domain.User;
import com.neoproxy.pro.enums.LicenseStatus;
import com.neoproxy.pro.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import javax.swing.text.html.Option;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    Optional<User> findByUuid(UUID uuid);

    Optional<User> findByEmail(String email);

    Optional<User> findByUserName(String userName);

    @Query(
            """
            SELECT count(u)
            FROM User u
            WHERE u.role = :userRole
            """)
    Integer countUserByRole(UserRole userRole);

    @Query(
            """
            SELECT count(u)
            FROM User u
            WHERE u in (SELECT l.customer FROM License l WHERE l.status = :licenseStatus)
            """)
    Integer countUserHaveLicenseStatus(LicenseStatus licenseStatus);
}
