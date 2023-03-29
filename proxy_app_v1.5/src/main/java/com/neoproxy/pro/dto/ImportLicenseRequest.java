package com.neoproxy.pro.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImportLicenseRequest {
    private String fileName;
    private String mimeType;
    private long size;
    private byte[] contents;
}
