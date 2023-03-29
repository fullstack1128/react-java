package com.neoproxy.pro.enums;

public enum ModemStatus {
    READY,
    STOP,
    PAUSE;

    ModemStatus() {
    }

    public static ModemStatus findByName(String name) {
        for (ModemStatus ps : values()) {
            if (ps.name().equalsIgnoreCase(name)) {
                return ps;
            }
        }
        return ModemStatus.READY;
    }
}
