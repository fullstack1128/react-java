package com.neoproxy.pro.dto;

import com.neoproxy.pro.enums.ModemType;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class LocationDto {
    String id;
    String name;
    Integer seq;
    ModemType modemType;
}
