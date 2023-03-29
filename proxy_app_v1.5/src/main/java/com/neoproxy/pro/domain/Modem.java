package com.neoproxy.pro.domain;

import com.neoproxy.pro.enums.ModemStatus;
import com.neoproxy.pro.enums.ModemType;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "modems")
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@FieldDefaults(level = AccessLevel.PRIVATE)
@EntityListeners(AuditingEntityListener.class)
public class Modem implements Serializable, Principal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;

    @Column(name = "uuid", updatable = false)
    UUID uuid;

    @Column(name = "name")
    String name;

    @Column(name = "user_name")
    String userName;

    @Column(name = "password")
    String password;

    @Column(name = "domain")
    String domain;

    @Column(name = "location")
    String location;

    @Column(name = "isp")
    String isp;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    ModemType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    ModemStatus status;

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
}
