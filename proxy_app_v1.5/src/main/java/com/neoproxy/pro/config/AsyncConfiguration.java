package com.neoproxy.pro.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import java.util.concurrent.Executor;

@Configuration
@EnableAsync
public class AsyncConfiguration {

    private static final Logger LOGGER = LoggerFactory.getLogger(AsyncConfiguration.class);

    @Value("${app.thread.corePoolSize}")
    private int corePoolSize;

    @Value("${app.thread.maxPoolSize}")
    private int maxPoolSize;

    @Value("${app.thread.queueCapacity}")
    private int queueCapacity;

    @Bean (name = "taskExecutor")
    public Executor taskExecutor() {
        LOGGER.debug("___________________________Creating Async Task Executor");
        final ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(corePoolSize);
        executor.setMaxPoolSize(maxPoolSize);
        executor.setQueueCapacity(queueCapacity);
        executor.setThreadNamePrefix("ProxyThread-");
        executor.initialize();
        return executor;
    }

}