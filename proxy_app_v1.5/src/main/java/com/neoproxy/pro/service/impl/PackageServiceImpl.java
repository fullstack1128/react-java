package com.neoproxy.pro.service.impl;

import com.neoproxy.pro.domain.Package;
import com.neoproxy.pro.dto.*;
import com.neoproxy.pro.enums.ErrorCode;
import com.neoproxy.pro.enums.PackageStatus;
import com.neoproxy.pro.mapper.PackageMapper;
import com.neoproxy.pro.mapper.PackageMapperImpl;
import com.neoproxy.pro.repository.LicenseRepository;
import com.neoproxy.pro.repository.PackageRepository;
import com.neoproxy.pro.repository.ProxyRepository;
import com.neoproxy.pro.service.PackageService;
import com.neoproxy.pro.service.exception.NeoProxyServiceException;
import com.neoproxy.pro.utils.CommonUtil;
import lombok.AccessLevel;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.convert.QueryByExamplePredicateBuilder;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class PackageServiceImpl implements PackageService {
    PackageRepository packageRepository;
    LicenseRepository licenseRepository;
    ProxyRepository proxyRepository;
    PackageMapper packageMapper = new PackageMapperImpl();

    public Specification<Package> getSpecAndExample(PackageQueryRequest request, Example<Package> example) {
        return (Specification<Package>) (root, query, builder) -> {
            final List<Predicate> predicates = new ArrayList<>();
            if (!request.getName().isEmpty()) {
                predicates.add(builder.like(root.get("name"), "%" + request.getName() + "%"));
            }
            if (!request.getLocation().isEmpty()) {
                predicates.add(builder.like(root.get("location"), "%" + request.getLocation() + "%"));
            }
            predicates.add(QueryByExamplePredicateBuilder.getPredicate(root, builder, example));
            return builder.and(predicates.toArray(new Predicate[predicates.size()]));
        };
    }

    @Override
    public TableData<PackageDto> getPackages(PackageQueryRequest request) {
        List<ProxyStatistics> proxyStatistics = proxyRepository.getAvailableProxyByIsp();

        TableData<PackageDto> data = new TableData<>();
        Sort sortBy = Sort.by(Sort.Direction.ASC, "seq");
        Pageable paging = PageRequest.of(request.getPage(), request.getPageSize(), sortBy);

        ExampleMatcher matcher = ExampleMatcher
                .matching()
                .withMatcher("name", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase());
        Package searchPackage = new Package();
        if (!CommonUtil.isEmpty(request.getStatus())) {
            searchPackage.setStatus(PackageStatus.valueOf(request.getStatus()));
        }
        Example<Package> example = Example.of(searchPackage, matcher);
        Page<Package> item = packageRepository.findAll(getSpecAndExample(request, example), paging);

        item.getContent().forEach(salePackage -> {
            PackageDto packageDto = packageMapper.toDto(salePackage);
            for (ProxyStatistics proItem : proxyStatistics) {
                if (proItem.getIsp().equals(packageDto.getIsp())) {
                    packageDto.setAvailableProxy(proItem.getCount());
                }
            }
            data.getData().add(packageDto);
        });
        data.setPages(item.getTotalPages());


        return data;
    }

    @Override
    public PackageDto getPackage(@NonNull UUID uuid) {
        return null;
    }

    @Override
    public PackageDto createNewPackage(@NonNull PackageRequest packageRequest) {
        Package salePackage = Package.builder()
                .name(packageRequest.getName())
                .packageUnit(packageRequest.getPackageUnit())
                .duration(packageRequest.getDuration())
                .price(packageRequest.getPrice())
                .status(packageRequest.getStatus())
                .type(packageRequest.getType())
                .allowChangeIp(packageRequest.getAllowChangeIp())
                .allowChangeLocation(packageRequest.getAllowChangeLocation())
                .minTimeChangeIp(packageRequest.getMinTimeChangeIp())
                .location(packageRequest.getLocation())
                .seq(packageRequest.getSeq())
                .isp(packageRequest.getIsp())
                .content(packageRequest.getContent())
                .build();
        packageRepository.save(salePackage);

        return packageMapper.toDto(salePackage);
    }

    @Override
    public PackageDto updatePackage(@NonNull UUID uuid, @NonNull PackageRequest packageRequest) {
        Package salePackage = packageRepository.findByUuid(uuid);
        if (salePackage == null)
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.BAD_DATA)
                            .message("could not find salePackage with this uuid")
                            .build());


        if (!salePackage.getType().equals(packageRequest.getType())) {
            int total = licenseRepository.countLicenseByPackage(salePackage);
            if (total > 0) {
                throw new NeoProxyServiceException(
                        ExceptionDetail.builder()
                                .status(HttpStatus.BAD_REQUEST)
                                .errorCode(ErrorCode.BAD_DATA)
                                .message("Can not delete with this package due to be used for license")
                                .build());
            }
        }

        salePackage.setName(packageRequest.getName());
        salePackage.setPackageUnit(packageRequest.getPackageUnit());
        salePackage.setDuration(packageRequest.getDuration());
        salePackage.setPrice(packageRequest.getPrice());
        salePackage.setAllowChangeIp(packageRequest.getAllowChangeIp());
        salePackage.setAllowChangeLocation(packageRequest.getAllowChangeLocation());
        salePackage.setMinTimeChangeIp(packageRequest.getMinTimeChangeIp());
        salePackage.setType(packageRequest.getType());
        salePackage.setStatus(packageRequest.getStatus());
        salePackage.setLocation(packageRequest.getLocation());
        salePackage.setSeq(packageRequest.getSeq());
        salePackage.setIsp(packageRequest.getIsp());
        salePackage.setContent(packageRequest.getContent());

        packageRepository.save(salePackage);

        return packageMapper.toDto(salePackage);
    }

    @Override
    public boolean deletePackage(@NonNull UUID uuid) {
        Package salePackage = packageRepository.findByUuid(uuid);
        if (salePackage == null)
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.BAD_DATA)
                            .message("could not find salePackage with this uuid")
                            .build());

        int total = licenseRepository.countLicenseByPackage(salePackage);
        if (total > 0) {
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.BAD_DATA)
                            .message("Can not delete with this package due to be used for license")
                            .build());
        }

        packageRepository.delete(salePackage);

        return true;
    }
}
