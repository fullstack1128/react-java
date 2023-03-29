package com.neoproxy.pro.enums;

public enum UserStatus {
    ACTIVE,
    BLOCKED,
    DEACTIVATED,
    DELETED;

    public boolean isBlocked() {
        return BLOCKED.equals(this);
    }

    public boolean isActive() {
        return ACTIVE.equals(this);
    }
}
