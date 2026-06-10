package com.smartfarmer.backend.controller;

import com.smartfarmer.backend.entity.Task;
import com.smartfarmer.backend.repository.TaskRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin("*")
public class TaskController {

    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping
    public List<Task> getTasks() {

        return taskRepository.findAll();
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {

        task.setStatus("Pending");

        return taskRepository.save(task);
    }
}