package com.neoproxy.pro.utils;

import lombok.extern.log4j.Log4j2;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Log4j2
public class DateUtil {

    private final static String patternIso = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";
    private final static String patternCSV = "dd-MM-yyyy HH:mm";

    public static LocalDateTime convertIsoStringToDate(String strDate) {
        try {
            return LocalDateTime.parse(strDate, DateTimeFormatter.ofPattern(patternIso));
        } catch (Exception e) {
            log.error("Error when parse date");
        }
        return null;
    }

    public static LocalDateTime convertImportDateToDate(String strDate) {
        try {
            return LocalDateTime.parse(strDate, DateTimeFormatter.ofPattern(patternCSV));
        } catch (Exception e) {
            log.error("Error when parse date");
        }
        return LocalDateTime.now().plusDays(30);
    }
}
