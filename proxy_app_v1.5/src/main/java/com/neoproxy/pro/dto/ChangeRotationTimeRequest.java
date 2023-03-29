package com.neoproxy.pro.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChangeRotationTimeRequest {
    List<UUID> uuids;
    Integer autoRotationTime;
}
