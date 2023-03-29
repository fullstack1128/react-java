package com.neoproxy.pro.service;

import com.neoproxy.pro.dto.*;

public interface CustomerService {
    TableData<CustomerDto> getCustomers(CustomerQueryRequest request);

    Integer getTotalCustomers();

    Integer getTotalCusHaveActiveLicenses();
}
