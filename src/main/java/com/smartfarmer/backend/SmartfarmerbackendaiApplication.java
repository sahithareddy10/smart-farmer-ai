package com.smartfarmer.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SmartfarmerbackendaiApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmartfarmerbackendaiApplication.class, args);

        System.out.println("=================================");
        System.out.println(" SMART FARMER BACKEND RUNNING ");
        System.out.println(" http://localhost:8080 ");
        System.out.println("=================================");
    }
}