package com.smartfarmer.backend.controller;

import com.smartfarmer.backend.config.JwtUtil;
import com.smartfarmer.backend.entity.Farmer;
import com.smartfarmer.backend.repository.FarmerRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final FarmerRepository farmerRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthController(
            FarmerRepository farmerRepository,
            JwtUtil jwtUtil,
            PasswordEncoder passwordEncoder) {

        this.farmerRepository = farmerRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of(
                "status", "UP",
                "message", "Backend Running"
        );
    }

    @PostMapping("/register")
    public Map<String, Object> register(
            @RequestBody Farmer farmer) {

        try {

            if (farmerRepository.findByMobileNumber(
                    farmer.getMobileNumber()).isPresent()) {

                return Map.of(
                        "success", false,
                        "message",
                        "Mobile number already registered"
                );
            }

            farmer.setPassword(
                    passwordEncoder.encode(
                            farmer.getPassword()
                    )
            );

            Farmer savedFarmer =
                    farmerRepository.save(farmer);

            String token =
                    jwtUtil.generateToken(
                            savedFarmer.getMobileNumber(),
                            savedFarmer.getFullName()
                    );

            return Map.of(
                    "success", true,
                    "message",
                    "Registration Successful",
                    "token", token,
                    "name",
                    savedFarmer.getFullName()
            );

        } catch (Exception e) {

            e.printStackTrace();

            return Map.of(
                    "success", false,
                    "message",
                    e.getMessage()
            );
        }
    }

    @PostMapping("/login")
    public Map<String, Object> login(
            @RequestBody Map<String, String> body) {

        try {

            String mobile =
                    body.get("mobileNumber");

            String password =
                    body.get("password");

            Optional<Farmer> farmerOpt =
                    farmerRepository.findByMobileNumber(
                            mobile
                    );

            if (farmerOpt.isEmpty()) {

                return Map.of(
                        "success", false,
                        "message",
                        "Mobile Number Not Found"
                );
            }

            Farmer farmer =
                    farmerOpt.get();

            if (!passwordEncoder.matches(
                    password,
                    farmer.getPassword()
            )) {

                return Map.of(
                        "success", false,
                        "message",
                        "Wrong Password"
                );
            }

            String token =
                    jwtUtil.generateToken(
                            farmer.getMobileNumber(),
                            farmer.getFullName()
                    );

            return Map.of(
                    "success", true,
                    "message",
                    "Login Successful",
                    "token", token,
                    "name",
                    farmer.getFullName()
            );

        } catch (Exception e) {

            e.printStackTrace();

            return Map.of(
                    "success", false,
                    "message",
                    e.getMessage()
            );
        }
    }
}