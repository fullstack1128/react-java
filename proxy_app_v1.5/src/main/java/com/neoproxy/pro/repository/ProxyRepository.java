package com.neoproxy.pro.repository;

import com.neoproxy.pro.domain.License;
import com.neoproxy.pro.domain.Modem;
import com.neoproxy.pro.domain.Proxy;
import com.neoproxy.pro.domain.User;
import com.neoproxy.pro.dto.PackageDto;
import com.neoproxy.pro.dto.ProxyStatistics;
import com.neoproxy.pro.enums.LicenseStatus;
import com.neoproxy.pro.enums.ModemStatus;
import com.neoproxy.pro.enums.ModemType;
import com.neoproxy.pro.xproxy.model.PortType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProxyRepository extends JpaRepository<Proxy, Long>, JpaSpecificationExecutor<Proxy> {
    Proxy findByUuid(UUID uuid);

    @Query(
            """
                    SELECT p
                    FROM Proxy p
                    WHERE p.sharedPort = :sharedPort
                      and p.portType = :portType
                      and p.modem = :modem
                    """)
    Optional<Proxy> findBySharedPort(Modem modem, int sharedPort, PortType portType);

    @Query(
            """
                    SELECT l
                    FROM License l
                    JOIN FETCH l.httpProxy p1
                    JOIN FETCH l.sockProxy p2
                    WHERE l.customer = :user and l.status = :licenseStatus and l.uuid IN :uuids
                    """)
    List<License> findProxyWanByLicenses(User user, LicenseStatus licenseStatus, List<UUID> uuids);

    @Query(
            """
                    SELECT l
                    FROM License l
                    JOIN FETCH l.httpProxy p1
                    JOIN FETCH l.sockProxy p2
                    WHERE l.status = :licenseStatus and l.uuid IN :uuids
                    """)
    List<License> findProxyWanByLicenses(LicenseStatus licenseStatus, List<UUID> uuids);

    @Query(
            """
                    SELECT p, m
                    FROM Proxy p
                    JOIN FETCH p.modem m
                    WHERE m.uuid = :modemUuid
                    """)
    List<Proxy> findByModem(UUID modemUuid);

    @Query(
            """
                    SELECT p, m
                    FROM Proxy p
                    JOIN FETCH p.modem m
                    WHERE m.uuid = :modemUuid
                     and p.portType = :portType
                     AND not exists (
                        select 1 from License l
                        WHERE l.httpProxy = p
                     )
                     AND not exists (
                        select 1 from License l
                        WHERE l.sockProxy = p
                     )
                    """)
    List<Proxy> findAvailableProxyByModem(UUID modemUuid, PortType portType);

    @Query(
            """
                    SELECT p, m
                    FROM Proxy p
                    JOIN FETCH p.modem m
                    WHERE m.uuid = :modemUuid
                     and m.isp = :isp
                     and p.portType = :portType
                     AND not exists (
                        select 1 from License l
                        WHERE l.httpProxy = p
                     )
                     AND not exists (
                        select 1 from License l
                        WHERE l.sockProxy = p
                     )
                    """)
    List<Proxy> findAvailableProxyByModemAndIsp(UUID modemUuid, PortType portType, String isp);

    @Query(
            """
                    SELECT count(m)
                    FROM Proxy m
                    WHERE m.modemType = :modemType
                    """)
    Integer countProxy(ModemType modemType);

    @Query(
            """
                    SELECT count(p)
                    FROM Proxy p
                    WHERE not exists(
                         select 1 from License l
                         where l.httpProxy = p
                    )
                    and not exists(
                         select 1 from License l
                         where l.sockProxy = p
                    )
                    and exists (
                        select 1 from Modem m
                        where m = p.modem
                        and m.status = :modemStatus
                        and m.type = :modemType
                    )
                    """)
    Integer countAvailableProxy(ModemStatus modemStatus, ModemType modemType);

    @Query(
            value = """
                    SELECT cast(x.uuid as varchar ) modemCode
                            FROM (
                                     SELECT m.uuid, count(p) as totalActiveProxy
                                     FROM proxys p
                                     JOIN modems m on p.modem_id = m.id and m.status = 'READY'
                                     WHERE p.modem_type = :modemType
                                     and not exists(
                                         select 1 from licenses l
                                         where l.http_proxy_id = p.id
                                     )
                                     and not exists(
                                         select 1 from licenses l
                                         where l.sock_proxy_id = p.id
                                     )
                                     GROUP BY m.uuid
                                     ORDER BY count(p) DESC
                                 ) x
                            LIMIT 1
                     """, nativeQuery = true)
    String getModemForSale(String modemType);

    @Query(
            value = """
                    SELECT cast(x.uuid as varchar ) modemCode
                            FROM (
                                     SELECT m.uuid, count(p) as totalActiveProxy
                                     FROM proxys p
                                     JOIN modems m on p.modem_id = m.id and m.status = 'READY'
                                     WHERE p.modem_type = :modemType
                                     and m.isp = :isp
                                     and not exists(
                                         select 1 from licenses l
                                         where l.http_proxy_id = p.id
                                     )
                                     and not exists(
                                         select 1 from licenses l
                                         where l.sock_proxy_id = p.id
                                     )
                                     GROUP BY m.uuid
                                     ORDER BY count(p) DESC
                                 ) x
                            LIMIT 1
                     """, nativeQuery = true)
    String getModemForSaleByISP(String modemType, String isp);

    @Query(
            """
                    SELECT p
                    FROM Proxy p
                    JOIN FETCH p.modem m
                    WHERE p.modem <> :modem
                      and m.type = :modemType
                      and m.status = :modemStatus  
                      and not exists(
                         select 1 from License l
                         where l.httpProxy = p
                      )
                    """)
    List<Proxy> getActiveProxyInOtherModem(Modem modem, ModemType modemType, ModemStatus modemStatus);



    @Query(
            """
                    SELECT p, m
                    FROM Proxy p
                    JOIN FETCH p.modem m
                    WHERE m.uuid = :modemUuid
                     and p.portType = :portType
                     and p.xproxyPosition = :position
                     AND not exists (
                        select 1 from License l
                        WHERE l.httpProxy = p
                     )
                     AND not exists (
                        select 1 from License l
                        WHERE l.sockProxy = p
                     )
                    """)
    List<Proxy> findAvailableProxyByPosition(UUID modemUuid, PortType portType, int position);


    @Query(
            value = """
                    select isp, count(1) as count
                                   from proxys p
                                   join modems m on p.modem_id = m.id
                                   where p.sale_status != 'USED'
                                   and p.port_type = 'HTTP'
                                   group by m.isp
                     """, nativeQuery = true)
    List<ProxyStatistics> getAvailableProxyByIsp();




}
