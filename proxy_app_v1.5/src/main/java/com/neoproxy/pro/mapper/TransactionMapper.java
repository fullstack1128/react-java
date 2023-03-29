package com.neoproxy.pro.mapper;

import com.neoproxy.pro.domain.Transaction;
import com.neoproxy.pro.dto.TransactionDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TransactionMapper {

    TransactionDto toDto(Transaction realm);
}
