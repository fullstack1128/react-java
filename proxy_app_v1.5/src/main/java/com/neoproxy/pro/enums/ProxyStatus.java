package com.neoproxy.pro.enums;

public enum ProxyStatus {
    CONNECTED,
    DISCONNECTED,
    UNPLUGGED,
    UNKNOWN;

    ProxyStatus() {
    }

    public static ProxyStatus findByName(String name) {
        for (ProxyStatus ps : values()) {
            if (ps.name().equalsIgnoreCase(name)) {
                return ps;
            }
        }
        return ProxyStatus.UNKNOWN;
    }
}
