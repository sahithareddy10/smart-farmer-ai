package com.smartfarmer.backend.controller;

import com.smartfarmer.backend.service.GeminiService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AIController {

    private final GeminiService geminiService;

    public AIController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/chat")
    public Map<String, String> chat(@RequestBody Map<String, String> request) {

        String message = request.getOrDefault("message", "");

        if (message.trim().isEmpty()) {
            return Map.of(
                    "reply", "Please enter a valid question.",
                    "source", "Smart Farmer AI"
            );
        }

        String reply = geminiService.askGemini(message);

        return Map.of(
                "reply", reply,
                "source", "Groq AI"
        );
    }
}