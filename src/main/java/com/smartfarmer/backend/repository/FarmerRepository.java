package com.smartfarmer.backend.repository;

import com.smartfarmer.backend.entity.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FarmerRepository
        extends JpaRepository<Farmer, Long> {

    Optional<Farmer> findByMobileNumber(
            String mobileNumber
    );
}