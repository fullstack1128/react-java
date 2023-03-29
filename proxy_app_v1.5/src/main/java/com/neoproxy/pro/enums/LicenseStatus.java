package com.neoproxy.pro.enums;

public enum LicenseStatus {
    PENDING("Pending"),
    ACTIVE("Active"),
    EXPIRED("Expired");

    String name;

    LicenseStatus(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
