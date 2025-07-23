package com.nexuspm.nexus_pm_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.elasticsearch.ElasticsearchDataAutoConfiguration;
import org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration;
import org.springframework.boot.autoconfigure.elasticsearch.ElasticsearchRestClientAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(exclude = {
    RedisAutoConfiguration.class,
    ElasticsearchDataAutoConfiguration.class,
    ElasticsearchRestClientAutoConfiguration.class
})
@EnableJpaRepositories
@EnableAsync
@EnableScheduling
public class NexusPmBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(NexusPmBackendApplication.class, args);
	}

}
