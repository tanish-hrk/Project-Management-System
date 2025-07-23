package com.nexuspm.nexus_pm_backend;

import org.springframework.boot.SpringApplication;

public class TestNexusPmBackendApplication {

	public static void main(String[] args) {
		SpringApplication.from(NexusPmBackendApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
