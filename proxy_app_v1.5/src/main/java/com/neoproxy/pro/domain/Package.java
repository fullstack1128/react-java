package com.neoproxy.pro.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.neoproxy.pro.enums.PackageStatus;
import com.neoproxy.pro.enums.PackageType;
import com.neoproxy.pro.enums.PackageUnit;
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
@Table(name = "packages")
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@FieldDefaults(level = AccessLevel.PRIVATE)
@EntityListeners(AuditingEntityListener.class)
public class Package implements Serializable, Principal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;

    @Column(name = "uuid", updatable = false)
    UUID uuid;

    @Column(name = "name")
    String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "time_unit")
    PackageUnit packageUnit;

    @Column(name = "duration")
    Integer duration;

    @Column(name = "price")
    BigDecimal price;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    PackageStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    PackageType type;

    @Column(name = "location")
    String location;

    @Column(name = "allow_change_ip")
    Integer allowChangeIp;

    @Column(name = "allow_change_location")
    Integer allowChangeLocation;

    @Column(name = "min_time_change_ip")
    Long minTimeChangeIp;

    @Column(name = "isp")
    String isp;

    @Column(name = "seq")
    Integer seq;

    @Column(name = "content")
    String content;

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
