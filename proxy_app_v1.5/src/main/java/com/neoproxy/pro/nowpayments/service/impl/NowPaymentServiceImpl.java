package com.neoproxy.pro.nowpayments.service.impl;

import com.neoproxy.pro.dto.ExceptionDetail;
import com.neoproxy.pro.enums.ConfigurationType;
import com.neoproxy.pro.enums.ErrorCode;
import com.neoproxy.pro.nowpayments.config.NowPaymentConf;
import com.neoproxy.pro.nowpayments.model.*;
import com.neoproxy.pro.nowpayments.service.NowPaymentService;
import com.neoproxy.pro.service.ConfigurationService;
import com.neoproxy.pro.service.exception.NeoProxyServiceException;
import com.neoproxy.pro.utils.JsonUtil;
import com.neoproxy.pro.utils.httpClient.ApiClient;
import com.neoproxy.pro.utils.httpClient.ApiConfig;
import com.neoproxy.pro.utils.httpClient.KeyValue;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class NowPaymentServiceImpl implements NowPaymentService {
    @Autowired
    NowPaymentConf nowPaymentConf;
    @Autowired
    ConfigurationService confService;

    private String getApiKey() {
        return confService.findValueByKey(ConfigurationType.NOW_PAYMENTS_API_KEY.name());
    }

    @Override
    public List<String> getAvailableCurrencies() {
//        try {
//            String response = ApiClient.getInstance().callAPI(
//                    nowPaymentConf.getAvailableCurrencies(), "", new HashMap<>(),
//                    new KeyValue("x-api-key", getApiKey()));
//            CurrenciesResp partnerResponse = JsonUtil.fromString(response, CurrenciesResp.class);
//            return partnerResponse.getCurrencies();
//        } catch (Exception e) {
//            log.error("[NowPayment] Error: " + e.getMessage());
//            throw new NeoProxyServiceException(
//                    ExceptionDetail.builder()
//                            .status(HttpStatus.BAD_REQUEST)
//                            .errorCode(ErrorCode.FORBIDDEN)
//                            .message("Error server")
//                            .build());
//        }
        return nowPaymentConf.getCurrencies();
    }

    @Override
    public MinAmountResp getMinimumAmount(String currencyFrom) {
        try {
            Map<String, String> queryParams = new HashMap<>();
            queryParams.put("currency_from", currencyFrom);

            String response = ApiClient.getInstance().callAPI(
                    nowPaymentConf.getMinimumAmount(), "",
                    queryParams,
                    new KeyValue("x-api-key", getApiKey()));
            return JsonUtil.fromString(response, MinAmountResp.class);
        } catch (Exception e) {
            log.error("[NowPayment] Error: " + e.getMessage());
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.FORBIDDEN)
                            .message("Error server")
                            .build());
        }
    }

    @Override
    public EstimatePriceResp getEstimatedPrice(String currencyFrom, String currencyTo, BigDecimal amount) {
        try {
            Map<String, String> queryParams = new HashMap<>();
            queryParams.put("currency_from", currencyFrom);
            queryParams.put("currency_to", currencyTo);
            queryParams.put("amount", String.valueOf(amount));

            String response = ApiClient.getInstance().callAPI(
                    nowPaymentConf.getEstimatedPrice(), "",
                    queryParams,
                    new KeyValue("x-api-key", getApiKey()));
            return JsonUtil.fromString(response, EstimatePriceResp.class);
        } catch (Exception e) {
            log.error("[NowPayment] Error: " + e.getMessage());
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.FORBIDDEN)
                            .message("Error server")
                            .build());
        }
    }

    @Override
    public PaymentResp createPayment(PaymentReq paymentReq) {
        try {
            String response = ApiClient.getInstance().callAPI(
                    nowPaymentConf.getPayment(),
                    JsonUtil.toString(paymentReq),
                    null,
                    new KeyValue("x-api-key", getApiKey()));
            return JsonUtil.fromString(response, PaymentResp.class);
        } catch (Exception e) {
            log.error("[NowPayment] Error: " + e.getMessage());
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.FORBIDDEN)
                            .message("Error server")
                            .build());
        }
    }

    @Override
    public PaymentStatusResp getPaymentStatus(String paymentId) {
        try {
            ApiConfig apiConfig = new ApiConfig();
            apiConfig.setUrl(nowPaymentConf.getPaymentStatus().getUrl() + "/" + paymentId);
            apiConfig.setMethod(nowPaymentConf.getPaymentStatus().getMethod());
            apiConfig.setRequestHeaders(nowPaymentConf.getPaymentStatus().getRequestHeaders());

            String response = ApiClient.getInstance().callAPI(
                    apiConfig, "",
                    null,
                    new KeyValue("x-api-key", getApiKey()));
            log.info("----- Payment {} - response {}", paymentId, response);
            return JsonUtil.fromString(response, PaymentStatusResp.class);
        } catch (Exception e) {
            log.error("[NowPayment] Error: " + e.getMessage());
            throw new NeoProxyServiceException(
                    ExceptionDetail.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .errorCode(ErrorCode.FORBIDDEN)
                            .message("Error server")
                            .build());
        }
    }


}
