package com.neoproxy.pro.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.neoproxy.pro.enums.TransactionStatus;
import com.neoproxy.pro.enums.TransactionType;
import com.neoproxy.pro.enums.UserStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "transactions")
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@FieldDefaults(level = AccessLevel.PRIVATE)
@EntityListeners(AuditingEntityListener.class)
public class Transaction implements Serializable, Principal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;

    @Column(name = "uuid", updatable = false)
    UUID uuid;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    User customer;

    @Column(name = "amount")
    BigDecimal amount;

    @Column(name = "currency")
    String currency;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    TransactionType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    TransactionStatus status;

    @Column(name = "description")
    String description;

    @Column(name = "note")
    String note;

    @Column(name = "reference_id")
    String referenceId;

    @Column(name = "pay_address")
    String payAddress;

    @Column(name = "pay_amount")
    BigDecimal payAmount;

    @Column(name = "pay_currency")
    String payCurrency;

    @Column(name = "created_at")
    @CreatedDate
    LocalDateTime createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        setUuid(UUID.randomUUID());
    }

    @Override
    @JsonIgnore
    public String getName() {
        return getUuid().toString();
    }
}
