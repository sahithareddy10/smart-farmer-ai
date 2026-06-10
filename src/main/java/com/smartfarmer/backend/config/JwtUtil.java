package com.smartfarmer.backend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET =
            "smartfarmersecretkey2024supersecure123456";

    private final Key key =
            Keys.hmacShaKeyFor(SECRET.getBytes());

    private final long EXPIRATION =
            1000 * 60 * 60 * 24;

    public String generateToken(
            String mobileNumber,
            String fullName) {

        return Jwts.builder()
                .setSubject(mobileNumber)
                .claim("name", fullName)
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(
                                System.currentTimeMillis()
                                        + EXPIRATION))
                .signWith(
                        key,
                        SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractMobile(String token) {

        Claims claims =
                Jwts.parserBuilder()
                        .setSigningKey(key)
                        .build()
                        .parseClaimsJws(token)
                        .getBody();

        return claims.getSubject();
    }

    public boolean validateToken(String token) {

        try {

            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);

            return true;

        } catch (Exception e) {

            return false;
        }
    }
}