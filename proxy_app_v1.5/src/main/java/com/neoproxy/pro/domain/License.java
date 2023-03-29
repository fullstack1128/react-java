package com.neoproxy.pro.domain;

import com.neoproxy.pro.enums.LicenseStatus;
import com.neoproxy.pro.enums.ModemType;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "licenses")
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@FieldDefaults(level = AccessLevel.PRIVATE)
@EntityListeners(AuditingEntityListener.class)
public class License implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;

    @Column(name = "uuid", updatable = false)
    UUID uuid;

    @Column(name = "start_date")
    LocalDateTime startDate;

    @Column(name = "expired_date")
    LocalDateTime expiredDate;

    @Column(name = "location")
    String location;

    @Column(name = "isp")
    String isp;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    LicenseStatus status;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    User customer;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "http_proxy_id", referencedColumnName = "id")
    Proxy httpProxy;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "sock_proxy_id", referencedColumnName = "id")
    Proxy sockProxy;

    @ManyToOne
    @JoinColumn(name = "package_id")
    Package salePackage;

    @ManyToOne
    @JoinColumn(name = "transaction_id")
    Transaction transaction;

    @Column(name = "auth_user")
    String authUser;

    @Column(name = "ip_whitelist")
    String ipWhitelist;

    @Column(name = "last_change_ip")
    LocalDateTime lastChangeIp;

    @Column(name = "last_change_location")
    LocalDateTime lastChangeLocation;

    @Column(name = "last_change_isp")
    LocalDateTime lastChangeIsp;

    @Column(name = "note")
    String note;

    @Enumerated(EnumType.STRING)
    @Column(name = "modem_type")
    ModemType modemType;

    @Column(name = "auto_rotation_time")
    Integer autoRotationTime;

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
