package com.neoproxy.pro.xproxy.model;

public enum PortType {
    HTTP(1, "HTTP"),
    SocksV5(2, "SocksV5");

    final int type;
    final String name;

    PortType(int type, String name) {
        this.type = type;
        this.name = name;
    }

    public int getType() {
        return type;
    }

    public String getName() {
        return name;
    }

    public static PortType findByName(String name) {
        for (PortType ps : values()) {
            if (ps.name().equalsIgnoreCase(name)) {
                return ps;
            }
        }
        return PortType.HTTP;
    }
}
