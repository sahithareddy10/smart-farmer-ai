package com.smartfarmer.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    @Value("${groq.api.key}")
    private String apiKey;

    public String askGemini(String question) {

        String url = "https://api.groq.com/openai/v1/chat/completions";

        try {

            ObjectMapper mapper = new ObjectMapper();

            Map<String, Object> requestBody = Map.of(
                    "model", "llama-3.3-70b-versatile",
                    "messages", List.of(
                            Map.of(
                                    "role", "system",
                                    "content",
                                    "You are Smart Farmer AI. Help farmers identify crop diseases, fertilizers, irrigation methods, pest management, weather impacts and treatment recommendations. Give simple and practical answers."
                            ),
                            Map.of(
                                    "role", "user",
                                    "content", question
                            )
                    ),
                    "temperature", 0.7,
                    "max_tokens", 1024
            );

            String jsonBody =
                    mapper.writeValueAsString(requestBody);

            System.out.println("REQUEST:");
            System.out.println(jsonBody);

            HttpHeaders headers = new HttpHeaders();

            headers.setContentType(MediaType.APPLICATION_JSON);

            headers.setBearerAuth(apiKey);

            HttpEntity<String> entity =
                    new HttpEntity<>(jsonBody, headers);

            RestTemplate restTemplate =
                    new RestTemplate();

            ResponseEntity<String> response =
                    restTemplate.postForEntity(
                            url,
                            entity,
                            String.class
                    );

            JsonNode root =
                    mapper.readTree(response.getBody());

            return root
                    .path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

        } catch (Exception e) {

            e.printStackTrace();

            return "⚠️ AI Service Error: "
                    + e.getMessage();
        }
    }
}