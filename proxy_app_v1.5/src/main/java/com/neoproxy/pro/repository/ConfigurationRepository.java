package com.neoproxy.pro.repository;

import com.neoproxy.pro.domain.Configuration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ConfigurationRepository extends JpaRepository<Configuration, Long>, JpaSpecificationExecutor<Configuration> {
    Configuration findByUuid(UUID uuid);

    @Query(
            """
            SELECT l.value
            FROM Configuration l
            WHERE l.key = :key
            """)
    String findValueByKey(String key);

    @Query(
            """
            SELECT l
            FROM Configuration l
            WHERE l.key = :key
            """)
    Configuration findByKey(String key);
}
