package com.neoproxy.pro.repository;

import com.neoproxy.pro.domain.*;
import com.neoproxy.pro.domain.Package;
import com.neoproxy.pro.enums.LicenseStatus;
import com.neoproxy.pro.enums.ModemType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface LicenseRepository extends JpaRepository<License, Long>, JpaSpecificationExecutor<License> {
    License findByUuid(UUID uuid);

    @Query(
            """
                    SELECT count(l)
                    FROM License l
                    WHERE l.status = :licenseStatus
                     and l.modemType = :modemType
                    """)
    Integer countLicenseByStatus(LicenseStatus licenseStatus, ModemType modemType);

    @Query(
            """
                    SELECT count(l)
                    FROM License l
                    WHERE l.expiredDate between :startDate and :endDate
                      and l.modemType = :modemType
                    """)
    Integer countExpiredLicenseByDate(LocalDateTime startDate, LocalDateTime endDate, ModemType modemType);

    @Query(
            """
                    SELECT count(l)
                    FROM License l
                    WHERE l.customer = :user
                      and l.status = :status
                    """)
    Integer countLicenseByUser(User user, LicenseStatus status);

    @Query(
            """
                    SELECT count(l)
                    FROM License l
                    WHERE l.customer = :user 
                      and l.expiredDate between :startDate and :endDate
                    """)
    Integer countExpiredLicenseByUser(User user, LocalDateTime startDate, LocalDateTime endDate);

    @Query(
            """
                    SELECT l
                    FROM License l
                    WHERE l.uuid IN :uuids
                      and l.customer = :user
                      and l.status = :status
                    """)
    List<License> getLicenseByUuids(User user, List<UUID> uuids, LicenseStatus status);

    @Query(
            """
                    SELECT l, p
                    FROM License l
                    JOIN FETCH l.httpProxy p
                    WHERE p.modem = :modem
                      and l.status = :licenseStatus
                    """)
    List<License> getLicenseByModem(Modem modem, LicenseStatus licenseStatus);

    @Query(
            """
                    SELECT l
                    FROM License l
                    WHERE l.expiredDate < :time
                      AND l.status = :licenseStatus
                    """)
    List<License> getExpiredLicenses(LocalDateTime time, LicenseStatus licenseStatus);

    @Query(
            """
                    SELECT l
                    FROM License l
                    JOIN FETCH l.customer c
                    WHERE c.reminder = 1
                      AND l.expiredDate < :time
                      AND l.status = :licenseStatus
                    """)
    List<License> getReminderLicenses(LocalDateTime time, LicenseStatus licenseStatus);

    @Query(
            """
                    SELECT count(l)
                    FROM License l
                    WHERE l.salePackage = :salePackage
                    """)
    Integer countLicenseByPackage(Package salePackage);


    @Query(
            """
                    SELECT l
                    FROM License l
                    WHERE l.status = :licenseStatus
                    AND l.autoRotationTime is not null
                    AND l.autoRotationTime > 0
                    """)
    List<License> getLicensesForAutoRotationIp(LicenseStatus licenseStatus);

    @Query(
            """
            SELECT l
            FROM License l
            JOIN FETCH l.customer c
            WHERE c.uuid = :uuid
              AND l.status =:licenseStatus
            """)
    List<License> findLicensesByUser(UUID uuid, LicenseStatus licenseStatus);
}
