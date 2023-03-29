package com.neoproxy.pro.repository;

import com.neoproxy.pro.domain.Modem;
import com.neoproxy.pro.enums.ModemStatus;
import com.neoproxy.pro.enums.ModemType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ModemRepository extends JpaRepository<Modem, Long> {
    Modem findByUuid(UUID uuid);

    Optional<Modem> findByDomain(String domain);

    @Query(
            """
                    SELECT count(m)
                    FROM Modem m
                    WHERE m.type = :type
                    """)
    Integer countModem(ModemType type);

    @Query(
            """
                    SELECT count(m)
                    FROM Modem m
                    WHERE m.status IN :modemStatuses
                      and m.type = :type
                    """)
    Integer countModemByStatuses(List<ModemStatus> modemStatuses, ModemType type);

    @Query(
            """
                    SELECT m
                    FROM Modem m
                    WHERE m.status = :modemStatus
                    """)
    List<Modem> findAllByStatus(ModemStatus modemStatus);
}
