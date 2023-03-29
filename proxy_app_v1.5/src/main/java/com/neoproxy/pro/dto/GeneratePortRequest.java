package com.neoproxy.pro.dto;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GeneratePortRequest {
    UUID modemId;
    Integer positionFrom;
    Integer positionTo;
    Integer numberOfPorts;
    String ipAuthenticationEntry;
    String userAuthenticationEntry;
    Integer httpPortStart;
    Integer sockPortStart;
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
    int maxConnection;
}
