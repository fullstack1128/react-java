package com.neoproxy.pro.repository;

import com.neoproxy.pro.domain.Proxy;
import com.neoproxy.pro.domain.Transaction;
import com.neoproxy.pro.enums.TransactionStatus;
import com.neoproxy.pro.enums.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long>, JpaSpecificationExecutor<Transaction> {
    Transaction findByUuid(UUID uuid);

    @Query(
            """
                    SELECT t
                    FROM Transaction t
                    WHERE t.type = :type
                     AND t.status = :status
                    """)
    List<Transaction> findTransactionsByType(TransactionType type, TransactionStatus status);

    @Query(
            """
                    SELECT t
                    FROM Transaction t
                    WHERE t.type = :type
                     AND t.status = :status
                     AND t.referenceId = :referenceId
                    """)
    Optional<Transaction> findByRefId(TransactionType type, TransactionStatus status, String referenceId);
}
