package com.smartfarmer.backend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin
public class WeatherController {

    @Value("${weather.api.key}")
    private String apiKey;

    @GetMapping("/{city}")
    public String getWeather(@PathVariable String city) {

        String url =
                "https://api.openweathermap.org/data/2.5/weather?q="
                + city +
                "&appid=" + apiKey +
                "&units=metric";

        RestTemplate restTemplate = new RestTemplate();

        return restTemplate.getForObject(url, String.class);
    }
}