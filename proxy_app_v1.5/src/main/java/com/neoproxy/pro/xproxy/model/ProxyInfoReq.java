package com.neoproxy.pro.xproxy.model;

import com.neoproxy.pro.dto.GeneratePortRequest;
import com.neoproxy.pro.utils.CommonUtil;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProxyInfoReq {
    int positionFrom;
    int positionTo;
    int numberOfPorts;
    int authMethod;
    String authEntry;
    String ipAuthenticationEntry;
    String userAuthenticationEntry;
    int portType;
    int ipType;
    int genPort;
    int genPortStart;
    long expiredDate;
    String whitelistLimitAccessEntry;
    String blacklistLimitAccessEntry;
    int counterUploadLimit;
    int counterUploadLimitBy;
    int counterUploadQuotaInMB;
    int counterDownloadLimit;
    int counterDownloadLimitBy;
    int counterDownloadQuotaInMB;
    int counterAllLimit;
    int counterAllLimitBy;
    int counterAllQuotaInMB;
    int bwLimitEnabled;
    int bwLimitRate;
    String customDNS;
    int maxConnection;
    String memo;

    boolean default_position;
    boolean default_whitelistLimitAccess;
    boolean default_blacklistLimitAccess;
    boolean default_ipAuthentication;
    boolean default_userAuthentication;
    boolean default_portType;
    boolean default_ipType;
    boolean default_customDNS;
    boolean default_expiredDate;
    boolean default_limitAccess;
    boolean default_bwLimitEnabled;
    boolean default_counterDownloadLimit;
    boolean default_counterUploadLimit;
    boolean default_counterAllLimit;
    boolean default_maxConnection;
    boolean default_memo;

    List<Integer> ids;

    public ProxyInfoReq() {
        initialize();
    }

    public ProxyInfoReq(GeneratePortRequest request, PortType portType, int genPortStart) {
        initialize();
        this.positionFrom = request.getPositionFrom();
        this.positionTo = request.getPositionTo();
        this.numberOfPorts = request.getNumberOfPorts();
        this.ipAuthenticationEntry = CommonUtil.nullToEmpty(request.getIpAuthenticationEntry());
        this.userAuthenticationEntry = CommonUtil.nullToEmpty(request.getUserAuthenticationEntry());
        this.portType = portType.getType();
        this.genPortStart = genPortStart;

        this.whitelistLimitAccessEntry = CommonUtil.nullToEmpty(request.getWhitelistLimitAccessEntry());
        this.blacklistLimitAccessEntry = CommonUtil.nullToEmpty(request.getBlacklistLimitAccessEntry());
        this.counterUploadLimit = request.getCounterUploadLimit();
        this.counterUploadLimitBy = request.getCounterUploadLimitBy();
        this.counterUploadQuotaInMB = request.getCounterUploadQuotaInMB();
        this.counterDownloadLimit = request.getCounterDownloadLimit();
        this.counterDownloadLimitBy = request.getCounterDownloadLimitBy();
        this.counterDownloadQuotaInMB = request.getCounterDownloadQuotaInMB();
        this.counterAllLimit = request.getCounterAllLimit();
        this.counterAllLimitBy = request.getCounterAllLimitBy();
        this.counterAllQuotaInMB = request.getCounterAllQuotaInMB();
        this.bwLimitEnabled = request.getBwLimitEnabled();
        this.bwLimitRate = request.getBwLimitRate();
        this.maxConnection = request.getMaxConnection();

    }

    public ProxyInfoReq(String ipAuthenticationEntry, String userAuthenticationEntry, List<Integer> ids) {
        initialize();
        this.ipAuthenticationEntry = CommonUtil.nullToEmpty(ipAuthenticationEntry);
        this.userAuthenticationEntry = CommonUtil.nullToEmpty(userAuthenticationEntry);
        if (CommonUtil.isEmpty(userAuthenticationEntry) && CommonUtil.isEmpty(ipAuthenticationEntry)) {
            this.userAuthenticationEntry = CommonUtil.generateAuthProxy();
        }
        this.ids = ids;
    }

    private void initialize() {
        positionFrom = 1;
        positionTo = 1;
        numberOfPorts = 1;
        authMethod = 0;
        authEntry = "";
        ipAuthenticationEntry = "";
        userAuthenticationEntry = "";
        portType = 1; // 1 is shared proxy, 2 is shared socks
        ipType = 1; // [default] 1 | 1 is IPv4, 2 is IPv6
        genPort = 2; // [default] 2 | 1 is randomize port from genPortStart, 2 is start in a range with sequence incremental
        genPortStart = 30000;
        expiredDate = 2524582800000L; // Next 20 year
        whitelistLimitAccessEntry = "";
        blacklistLimitAccessEntry = "";
        counterUploadLimit = 0;
        counterUploadLimitBy = 1;
        counterUploadQuotaInMB = 100;
        counterDownloadLimit = 0;
        counterDownloadLimitBy = 1;
        counterDownloadQuotaInMB = 100;
        counterAllLimit = 0;
        counterAllLimitBy = 1;
        counterAllQuotaInMB = 100;
        bwLimitEnabled = 0;
        bwLimitRate = 0;
        customDNS = "";
        maxConnection = 1000;
        memo = "";

        default_position = true;
        default_ipAuthentication = false;
        default_userAuthentication = false;
        default_portType = true;
        default_ipType = true;
        default_customDNS = true;
        default_expiredDate = true;
        default_limitAccess = true;
        default_bwLimitEnabled = true;
        default_counterDownloadLimit = true;
        default_counterUploadLimit = true;
        default_counterAllLimit = true;
        default_maxConnection = false;
        default_whitelistLimitAccess = true;
        default_blacklistLimitAccess = true;
        default_memo = true;
    }
}
