package com.neoproxy.pro.utils;

import java.security.SecureRandom;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

public class CommonUtil {
    public static int lengthOfTransferContent = 7;
    public static int lengthOfAffiliateCode = 10;
    static final String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    static SecureRandom rnd = new SecureRandom();

    public static String USER = "user";
    public static String PASS = "pass";

    public static boolean isEmpty(Object object) {
        if (object == null)
            return true;
        else if (object instanceof String) {
            if (((String) object).isEmpty())
                return true;
        }
        return false;
    }

    public static String formatUserPass(Map<String, String> map) {
        return String.format("{}:{}", map.get(USER), map.get(PASS));
    }

    public static String generatePassword() {
        return String.valueOf(ThreadLocalRandom.current().nextInt(10000, 50000));
    }

    public static String generatingTransferContent() {
        return "NAP" + ThreadLocalRandom.current().nextInt(100000, 999000);
    }

    public static String generatingRandomString() {
        StringBuilder sb = new StringBuilder(lengthOfTransferContent);
        for (int i = 0; i < lengthOfTransferContent; i++)
            sb.append(AB.charAt(rnd.nextInt(AB.length())));
        return sb.toString();
    }

    public static String generateAuthProxy() {
        return "u" + generatingRandomString().toLowerCase() + ":" + "p" + CommonUtil.generatePassword();
    }

    public static String getHostFromDomain(String domain) {
        if (isEmpty(domain))
            return null;
        String host = domain.replace("http://", "").replace("https://", "");
        return host.split(":")[0];
    }

    public static String generatingAffiliateCode() {
        StringBuilder sb = new StringBuilder(lengthOfAffiliateCode);
        for (int i = 0; i < lengthOfAffiliateCode; i++)
            sb.append(AB.charAt(rnd.nextInt(AB.length())));
        return sb.toString();
    }

    public static String nullToEmpty(String text) {
        if (isEmpty(text))
            return "";
        return text;
    }
}
