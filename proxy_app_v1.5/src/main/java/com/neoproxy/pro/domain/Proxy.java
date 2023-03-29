package com.neoproxy.pro.domain;

import com.neoproxy.pro.enums.ModemType;
import com.neoproxy.pro.enums.ProxySaleStatus;
import com.neoproxy.pro.enums.ProxyStatus;
import com.neoproxy.pro.xproxy.model.PortType;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "proxys")
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@FieldDefaults(level = AccessLevel.PRIVATE)
@EntityListeners(AuditingEntityListener.class)
public class Proxy implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;

    @Column(name = "uuid", updatable = false)
    UUID uuid;

    @ManyToOne
    @JoinColumn(name = "modem_id")
    Modem modem;

    @Column(name = "raw")
    String raw;

    @Column(name = "xproxy_id")
    Integer xproxyId;

    @Column(name = "public_ip")
    String publicIp;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    ProxyStatus status;

    @Column(name = "xproxy_position")
    Integer xproxyPosition;

    @Column(name = "shared_port")
    Integer sharedPort;

    @Enumerated(EnumType.STRING)
    @Column(name = "port_type")
    PortType portType;

    @Column(name = "authentication_users")
    String authenticationUsers;

    @Column(name = "authorization_ips")
    String authorizationIps;

    @Enumerated(EnumType.STRING)
    @Column(name = "sale_status")
    ProxySaleStatus saleStatus;

    @OneToOne(mappedBy = "httpProxy")
    License license;

    @OneToOne(mappedBy = "sockProxy")
    License licenseSock;

    @Column(name = "counter_ul_used_bytes")
    Long counterUlUsedBytes;

    @Column(name = "counter_dl_used_bytes")
    Long counterDlUsedBytes;

    @Column(name = "counter_all_used_bytes")
    Long counterAllUsedBytes;

    @Column(name = "counter_all_updated")
    String counterAllUpdated;

    @Column(name = "host")
    String host;

    @Enumerated(EnumType.STRING)
    @Column(name = "modem_type")
    ModemType modemType;

    @Column(name = "web_blacklist")
    String webBlacklist;

    @Column(name = "web_whitelist")
    String webWhitelist;

    @Column(name = "brother_port")
    Integer brotherPort;

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
