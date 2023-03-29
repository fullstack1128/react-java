package com.neoproxy.pro.service;

import com.neoproxy.pro.domain.License;
import com.neoproxy.pro.dto.*;
import com.neoproxy.pro.enums.ModemType;
import com.neoproxy.pro.xproxy.model.PortType;
import lombok.NonNull;

import java.io.PrintWriter;
import java.io.Writer;
import java.util.List;
import java.util.UUID;

public interface LicenseService {
    TableData<LicenseDto> getLicenses(LicenseQueryRequest request);

    LicenseDto updateLicense(@NonNull UUID uuid, @NonNull LicenseRequest packageRequest);

    boolean extendByLicenseIds(ExtendLicenseRequest request);

    Integer getTotalActiveLicense(ModemType modemType);

    Integer getTotalExpiredLicenses(ModemType modemType);

    Integer getTotalLicenseByUser();

    Integer getTotalExpiredLicensesByUser();

    List<License> getExpiredLicenses();

    List<License> getRemindLicenses();

    boolean updateExpiredLicense(License license);

    boolean remindExpiredLicense(License license);

    boolean switchToNewModem(SwitchModemRequest request);

    boolean updateLicenseStatus(UpdateLicenseStatusRequest request);

    boolean changeRotationTime(ChangeRotationTimeRequest request);

    String importLicense(ImportLicenseRequest request);

    void getImportTemplate(PrintWriter writer);

    void writeLicenseToCsv(String customer, String format, PrintWriter writer);
}
