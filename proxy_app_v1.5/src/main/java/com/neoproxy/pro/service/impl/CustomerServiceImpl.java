package com.neoproxy.pro.service.impl;

import com.neoproxy.pro.domain.User;
import com.neoproxy.pro.dto.CustomerDto;
import com.neoproxy.pro.dto.CustomerQueryRequest;
import com.neoproxy.pro.dto.TableData;
import com.neoproxy.pro.enums.LicenseStatus;
import com.neoproxy.pro.enums.UserRole;
import com.neoproxy.pro.mapper.CustomerMapper;
import com.neoproxy.pro.mapper.CustomerMapperImpl;
import com.neoproxy.pro.repository.UserRepository;
import com.neoproxy.pro.service.AuthenticationService;
import com.neoproxy.pro.service.CustomerService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.convert.QueryByExamplePredicateBuilder;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CustomerServiceImpl implements CustomerService {
    AuthenticationService authenticationService;
    UserRepository userRepository;
    CustomerMapper customerMapper = new CustomerMapperImpl();

    public Specification<User> getSpecAndExample(CustomerQueryRequest request, Example<User> example) {
        return (Specification<User>) (root, query, builder) -> {
            final List<Predicate> predicates = new ArrayList<>();
            if (!request.getName().isEmpty()) {
                Predicate pre1 = builder.like(root.get("uuid").as(String.class), "%" + request.getName() + "%");
                Predicate pre2 = builder.like(root.get("name").as(String.class), "%" + request.getName() + "%");
                predicates.add(builder.or(pre1, pre2));
            }
            if (!request.getEmail().isEmpty()) {
                predicates.add(builder.like(root.get("email").as(String.class), "%" + request.getEmail() + "%"));
            }
            predicates.add(QueryByExamplePredicateBuilder.getPredicate(root, builder, example));
            return builder.and(predicates.toArray(new Predicate[predicates.size()]));
        };
    }

    @Override
    public TableData<CustomerDto> getCustomers(CustomerQueryRequest request) {
        User searchUser = new User();
        searchUser.setRole(UserRole.CLIENT);

        TableData<CustomerDto> dataTable = new TableData<>();
        Sort sortBy = Sort.by(Sort.Direction.DESC, "createdAt");
        Pageable paging = PageRequest.of(request.getPage(), request.getPageSize(), sortBy);

        ExampleMatcher matcher = ExampleMatcher
                .matching();

        Example<User> example = Example.of(searchUser, matcher);
        Page<User> item = userRepository.findAll(getSpecAndExample(request, example), paging);

        item.getContent().forEach(user -> {
            dataTable.getData().add(customerMapper.toDto(user));
        });
        dataTable.setPages(item.getTotalPages());

        return dataTable;
    }

    @Override
    public Integer getTotalCustomers() {
        return userRepository.countUserByRole(UserRole.CLIENT);
    }

    @Override
    public Integer getTotalCusHaveActiveLicenses() {
        return userRepository.countUserHaveLicenseStatus(LicenseStatus.ACTIVE);
    }
}
