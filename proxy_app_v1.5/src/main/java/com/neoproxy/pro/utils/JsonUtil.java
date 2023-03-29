package com.neoproxy.pro.utils;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.databind.*;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.Map;

public class JsonUtil {

    private JsonUtil() {
        // NO OP
    }

    private static final ObjectMapper MAPPER = new ObjectMapper();

    static {
        MAPPER.configure(SerializationFeature.WRITE_DATES_WITH_ZONE_ID, false);
        MAPPER.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        MAPPER.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    public static void init(Module... customModules) {
        MAPPER.registerModules(customModules);
    }

    public static <T> T fromString(String jSon, Class<T> type) throws IOException {
        return MAPPER.readValue(jSon, type);
    }

    public static <T> T fromByteArray(byte[] json, Class<T> type) throws IOException {
        return MAPPER.readValue(json, type);
    }

    public static <T> T fromNode(JsonNode json, Class<T> type) throws IOException {
        return MAPPER.treeToValue(json, type);
    }

    public static <T> T fromFile(File jSon, Class<T> type) throws IOException {
        return MAPPER.readValue(jSon, type);
    }

    public static <T> T fromMap(Map map, Class<T> type) throws IOException {
        return MAPPER.convertValue(map, type);
    }

    public static String toString(Object object) throws JsonProcessingException {
        return MAPPER.writeValueAsString(object);
    }

    public static byte[] toByteArray(Object object) throws JsonProcessingException {
        return MAPPER.writeValueAsBytes(object);
    }

    public static Map toMap(Object object) throws IllegalArgumentException {
        return MAPPER.convertValue(object, Map.class);
    }

    public static JsonNode getJsonNode(String json) throws IOException {
        return MAPPER.readTree(json);
    }

    public static JsonNode getJsonNode(File json) throws IOException {
        return MAPPER.readTree(json);
    }

    public static JsonNode getJsonNode(URL json) throws IOException {
        return MAPPER.readTree(json);
    }

    public static JsonNode getJsonNodeFromObject(Object object) {
        return MAPPER.convertValue(object, JsonNode.class);
    }

}
