package com.neoproxy.pro.service.impl;

import com.neoproxy.pro.domain.License;
import com.neoproxy.pro.domain.Modem;
import com.neoproxy.pro.domain.Proxy;
import com.neoproxy.pro.dto.*;
import com.neoproxy.pro.enums.*;
import com.neoproxy.pro.mapper.ModemMapper;
import com.neoproxy.pro.mapper.ModemMapperImpl;
import com.neoproxy.pro.repository.LicenseRepository;
import com.neoproxy.pro.repository.ModemRepository;
import com.neoproxy.pro.repository.ProxyRepository;
import com.neoproxy.pro.service.ConfigurationService;
import com.neoproxy.pro.service.ModemService;
import com.neoproxy.pro.service.ProxyService;
import com.neoproxy.pro.service.exception.NeoProxyServiceException;
import com.neoproxy.pro.utils.CommonUtil;
import com.neoproxy.pro.xproxy.model.*;
import com.neoproxy.pro.xproxy.service.XProxyService;
import lombok.AccessLevel;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.xml.validation.SchemaFactoryLoader;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ModemServiceImpl implements ModemService {
    ModemMapper modemMapper = new ModemMapperImpl();
    ModemRepository modemRepository;
    ProxyRepository proxyRepository;
    XProxyService xProxyService;
    ProxyService proxyService;
    LicenseRepository licenseRepository;
    ConfigurationService configurationService;

    @Override
    public TableData<ModemDto> getModems(ModemQueryRequest request) {
        TableData<ModemDto> tableData = new TableData<>();
        Sort sortBy = Sort.by(Sort.Direction.ASC, "name");
        Pageable paging = PageRequest.of(request.getPage(), request.getPageSize(), sortBy);

        ExampleMatcher matcher = ExampleMatcher
                .matching()
                .withMatcher("name", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase());
        Modem searchModem = new Modem();
        if (!request.getSearch().isEmpty()) {
            searchModem.setName(request.getSearch());
        }
        if (!request.getStatus().isEmpty()) {
            searchModem.setStatus(ModemStatus.findByName(request.getStatus()));
        }

        Example<Modem> example = Example.of(searchModem, matcher);
        Page<Modem> page = modemRepository.findAll(example, paging);

        page.getContent().forEach(modem -> {
            tableData.getData().add(modemMapper.toDto(modem));
        });
        tableData.setPages(page.getTotalPages());

        return tableData;
    }

    @Override
    public ModemDto getModem(@NonNull UUID uuid) {
        Modem modem = modemRepository.findByUuid(uuid);
        if (modem == null) {
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.MODEM_ERROR_CONNECT)
                            .message("Modem have not existed.")
                            .build());
        }

        ModemRequest modemRequest = ModemRequest.builder()
                .domain(modem.getDomain())
                .userName(modem.getUserName())
                .password(modem.getPassword())
                .build();
        List<ProxyRootItem> listPosition = xProxyService.getProxyRoot(modemRequest);
        if (listPosition.isEmpty()) {
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.MODEM_ERROR_CONNECT)
                            .message("Cannot connect to modem!")
                            .build());
        }

        ModemDto modemDto = modemMapper.toDto(modem);
        modemDto.setPositions(listPosition.stream().map(ProxyRootItem::getPosition).collect(Collectors.toList()));
        return modemDto;
    }

    @Override
    public ModemDto createNewModem(@NonNull ModemRequest modemRequest) {
        Optional<Modem> modemOptional = modemRepository.findByDomain(modemRequest.getDomain());
        if (modemOptional.isPresent()) {
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.MODEM_HAVE_EXISTED)
                            .message("Modem have existed.")
                            .build());
        }

        // Call API list position to checking modem connected.
        List<ProxyRootItem> listPosition = xProxyService.getProxyRoot(modemRequest);
        if (listPosition.isEmpty()) {
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.MODEM_ERROR_CONNECT)
                            .message("Cannot connect to modem!")
                            .build());
        }

        Modem modem =
                Modem.builder()
                        .name(modemRequest.getName())
                        .userName(modemRequest.getUserName())
                        .password(modemRequest.getPassword())
                        .domain(modemRequest.getDomain())
                        .location(modemRequest.getLocation())
                        .type(modemRequest.getType())
                        .isp(modemRequest.getIsp())
                        .status(ModemStatus.READY)
                        .build();
        modemRepository.save(modem);

        return modemMapper.toDto(modem);
    }

    @Override
    public ModemDto updateModem(@NonNull UUID uuid, @NonNull ModemRequest modemRequest) {
        Modem modem = modemRepository.findByUuid(uuid);
        if (modem == null)
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.BAD_DATA)
                            .message("Could not find modem with this uuid")
                            .build());

        modem.setName(modemRequest.getName());
        modem.setLocation(modemRequest.getLocation());
        modem.setIsp(modemRequest.getIsp());
        modem.setUserName(modemRequest.getUserName());
        modem.setPassword(modemRequest.getPassword());
        modem.setType(modemRequest.getType());

        modemRepository.save(modem);

        return modemMapper.toDto(modem);
    }

    @Override
    public ModemDto syncNewPorts(@NonNull Modem modem, Integer distancePortTo) {
        // 1.0 Get list proxy
        List<ProxySharedItem> proxySharedItems = xProxyService.getProxyShared(modem);
        if (proxySharedItems.isEmpty()) {
            log.info("_____ Retry getting proxy list again {}", modem.getUuid());
            proxySharedItems = xProxyService.getProxyShared(modem);
        }

        // 2.0 Get list proxy
        List<Proxy> proxyDbList = proxyRepository.findByModem(modem.getUuid());

        // 3.0 Loop proxy
        for (ProxySharedItem proxySharedItem : proxySharedItems) {
            Proxy proxyDb = proxyDbList
                    .stream()
                    .filter(item -> item.getXproxyId().equals(proxySharedItem.getId())).findFirst().orElse(null);
            if (proxyDb == null) {
                insertNewProxy(modem, proxySharedItem, distancePortTo);
            }
        }

        return modemMapper.toDto(modem);
    }

    @Override
    public ModemDto sync(@NonNull UUID uuid) {
        /**
         * Proxy selling
         */
        Modem modem = modemRepository.findByUuid(uuid);
        if (!modem.getStatus().equals(ModemStatus.READY)) {
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.MODEM_NOT_ACTIVE)
                            .message("Modem not active")
                            .build());
        }

        // 2.0 Get list proxy
        List<ProxySharedItem> proxySharedItems = xProxyService.getProxyShared(modem);
        // 3.0 Get list proxy
        List<Proxy> proxyDbList = proxyRepository.findByModem(uuid);
        // 4.0 Loop proxy
        for (ProxySharedItem proxySharedItem : proxySharedItems) {
            // 4.1 Sync proxy
            Proxy proxyDb = proxyDbList
                    .stream()
                    .filter(item -> item.getXproxyId().equals(proxySharedItem.getId())).findFirst().orElse(null);

            // 4.2 Update proxy information
            if (!checkConsistentBetweenProxyDbAndXProxy(proxyDb, proxySharedItem)) {
                updateProxyInfo(proxyDb, proxySharedItem);
            }
        }

        /**
         * Sync status
         */
        ModemRequest modemRequest = ModemRequest.builder()
                .userName(modem.getUserName())
                .password(modem.getPassword())
                .domain(modem.getDomain())
                .build();
        List<XProxyWanInfo> listPosition = xProxyService.getListPosition(modemRequest);
        log.info("[GET LIST POSITION] Total position: " + listPosition.size());
        for (Proxy proxyDb : proxyDbList) {
            XProxyWanInfo xProxyWanInfo = listPosition
                    .stream()
                    .filter(item -> item.getPosition().equals(proxyDb.getXproxyPosition())).findFirst().orElse(null);
            if (xProxyWanInfo != null) {
                ProxyStatus proxyStatus = ProxyStatus.findByName(xProxyWanInfo.getStatus());
                if (!proxyStatus.equals(proxyDb.getStatus())) {
                    proxyDb.setStatus(proxyStatus);
                    proxyRepository.save(proxyDb);
                }
                if (xProxyWanInfo.getPublic_ip() != null
                        || !xProxyWanInfo.getPublic_ip().equals(proxyDb.getPublicIp())) {
                    proxyDb.setPublicIp(xProxyWanInfo.getPublic_ip());
                    proxyRepository.save(proxyDb);
                }
            }
        }

        return modemMapper.toDto(modem);
    }

    private boolean checkConsistentBetweenProxyDbAndXProxy(Proxy proxy, ProxySharedItem proxySharedItem) {
        if (proxy == null || proxySharedItem == null)
            return true;

        if (proxySharedItem.getCounter_all_updated() != null
                && !proxySharedItem.getCounter_all_updated().equals(proxy.getCounterAllUpdated())) {
            return false;
        }
        if (proxySharedItem.getCounter_all_used_bytes() != null
                && !proxySharedItem.getCounter_all_used_bytes().equals(proxy.getCounterAllUsedBytes())) {
            return false;
        }
        if (proxySharedItem.getCounter_dl_used_bytes() != null
                && !proxySharedItem.getCounter_dl_used_bytes().equals(proxy.getCounterDlUsedBytes())) {
            return false;
        }
        if (proxySharedItem.getCounter_ul_used_bytes() != null
                && !proxySharedItem.getCounter_ul_used_bytes().equals(proxy.getCounterUlUsedBytes())) {
            return false;
        }
        return true;
    }


    @Override
    @Transactional
    public ModemDto pause(@NonNull UUID uuid) {
        Modem modemSource = modemRepository.findByUuid(uuid);
        if (modemSource == null)
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.BAD_DATA)
                            .message("Could not find modem with this uuid")
                            .build());

        // 0. Pending modem
        modemSource.setStatus(ModemStatus.PAUSE);
        modemRepository.save(modemSource);

        // 1. Check have convert license
        List<License> licenseNeedToSwitchList = licenseRepository.getLicenseByModem(modemSource, LicenseStatus.ACTIVE);
        int totalActiveLicense = licenseNeedToSwitchList.size();
        log.info("Total license need to convert {}", totalActiveLicense);
        if (totalActiveLicense > 0) {
            List<Proxy> proxyList = proxyRepository.getActiveProxyInOtherModem(modemSource, modemSource.getType(), ModemStatus.READY);
            int totalActiveProxyRemain = proxyList.size();

            if (totalActiveProxyRemain < totalActiveLicense) {
                throw new NeoProxyServiceException(
                        ExceptionDetail.builder()
                                .status(HttpStatus.BAD_REQUEST)
                                .errorCode(ErrorCode.MODEM_PENDING)
                                .message("List of licenses that cannot be changed IP")
                                .build());
            }

            List<UUID> uuids = new ArrayList<>();
            ProxyRequest request = new ProxyRequest();
            request.setLocation(""); // Chuyển license thành Không giới hạn
            licenseNeedToSwitchList.forEach(i -> {
                uuids.add(i.getHttpProxy().getUuid());
                uuids.add(i.getSockProxy().getUuid());
            });
            request.setUuids(uuids);
            proxyService.changeProxyIp(request, true);
        }

        modemSource.setStatus(ModemStatus.STOP);
        modemRepository.save(modemSource);

        return modemMapper.toDto(modemSource);
    }

    @Override
    public ModemDto resume(@NonNull UUID uuid) {
        Modem modem = modemRepository.findByUuid(uuid);
        if (modem == null)
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.BAD_DATA)
                            .message("Could not find modem with this uuid")
                            .build());

        modem.setStatus(ModemStatus.READY);
        modemRepository.save(modem);

        return modemMapper.toDto(modem);
    }

    @Override
    public Integer getTotalModem(ModemType modemType) {
        return modemRepository.countModem(modemType);
    }

    @Override
    public Integer getTotalPendingModems(ModemType modemType) {
        return modemRepository.countModemByStatuses(List.of(ModemStatus.PAUSE, ModemStatus.STOP), modemType);
    }

    @Override
    public boolean delete(UUID uuid) {
        Modem modem = modemRepository.findByUuid(uuid);
        if (modem == null)
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.BAD_DATA)
                            .message("could not find modem with this uuid")
                            .build());

        List<License> licenseList = licenseRepository.getLicenseByModem(modem, LicenseStatus.ACTIVE);
        if (!licenseList.isEmpty()) {
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.BAD_DATA)
                            .message("The modem cannot be deleted because an active license exists.")
                            .build());
        }

        proxyService.deleteProxyByModem(modem);
        modemRepository.delete(modem);

        return true;
    }

    @Override
    public boolean generatePorts(GeneratePortRequest request) {
        Modem modem = modemRepository.findByUuid(request.getModemId());
        if (!modem.getStatus().equals(ModemStatus.READY)) {
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.MODEM_NOT_ACTIVE)
                            .message("The modem is not active")
                            .build());
        }

        int distancePortTo = request.getSockPortStart() - request.getHttpPortStart();
        log.info("_____ DISTANCE PORT: " + distancePortTo);
        // 1.0 Http port generate
        ProxyInfoReq proxyInfoReq = new ProxyInfoReq(request, PortType.HTTP, request.getHttpPortStart());
        xProxyService.generateProxy(modem, proxyInfoReq);
        // 2.0 Sock port generate
        proxyInfoReq = new ProxyInfoReq(request, PortType.SocksV5, request.getSockPortStart());
        xProxyService.generateProxy(modem, proxyInfoReq);
        // 3.0 Sync modem
        syncNewPorts(modem, distancePortTo);
        return false;
    }

    private void insertNewProxy(Modem modem, ProxySharedItem item, Integer distancePortTo) {
        Proxy proxy = Proxy.builder()
                .modem(modem)
                .modemType(ModemType.MOBILE)
                .raw(item.toString())
                .xproxyId(item.getId())
                .xproxyPosition(item.getPosition())
                .sharedPort(item.getShared_port())
                .authenticationUsers(item.getAuth_user_list())
                .authorizationIps(item.getAuth_ip_list())
                .saleStatus(ProxySaleStatus.AVAILABLE)
                .host(CommonUtil.getHostFromDomain(modem.getDomain()))
                .status(ProxyStatus.CONNECTED)
                .counterAllUpdated(item.getCounter_all_updated())
                .counterAllUsedBytes(item.getCounter_all_used_bytes())
                .counterDlUsedBytes(item.getCounter_dl_used_bytes())
                .counterUlUsedBytes(item.getCounter_ul_used_bytes())
                .webBlacklist(item.getWeb_blacklist())
                .webWhitelist(item.getWeb_whitelist())
                .portType(PortType.findByName(item.getPort_type()))
                .build();
        if (distancePortTo != null && proxy.getPortType().equals(PortType.HTTP)) {
            proxy.setBrotherPort(proxy.getSharedPort() + distancePortTo);
        }
        proxyRepository.save(proxy);
    }

    private void updateProxyInfo(Proxy proxy, ProxySharedItem item) {
        proxy.setCounterAllUpdated(item.getCounter_all_updated());
        proxy.setCounterAllUsedBytes(item.getCounter_all_used_bytes());
        proxy.setCounterDlUsedBytes(item.getCounter_dl_used_bytes());
        proxy.setCounterUlUsedBytes(item.getCounter_ul_used_bytes());
        proxy.setWebBlacklist(item.getWeb_blacklist());
        proxy.setWebWhitelist(item.getWeb_whitelist());
        proxyRepository.save(proxy);
    }
}
