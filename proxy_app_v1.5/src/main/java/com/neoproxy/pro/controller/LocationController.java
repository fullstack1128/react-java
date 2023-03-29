package com.neoproxy.pro.controller;

import com.neoproxy.pro.dto.LocationQueryRequest;
import com.neoproxy.pro.dto.MessageResponse;
import com.neoproxy.pro.service.LocationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/v1/locations")
@Slf4j
public class LocationController extends BaseController {
    LocationService locationService;

    @PostMapping("/list")
    public ResponseEntity<MessageResponse> getLocations() {
        return createSuccessResponse(locationService.getLocations());
    }
}
