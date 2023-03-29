package com.neoproxy.pro.repository;

import com.neoproxy.pro.domain.Package;
import com.neoproxy.pro.enums.ModemType;
import com.neoproxy.pro.enums.PackageStatus;
import com.neoproxy.pro.enums.PackageType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PackageRepository extends JpaRepository<Package, Long>, JpaSpecificationExecutor<Package> {
    Package findByUuid(UUID uuid);

    @Query(
            """
                    SELECT p
                    FROM Package p
                    WHERE p.status = :packageStatus
                    """)
    List<Package> findActivePackages(PackageStatus packageStatus);
}
