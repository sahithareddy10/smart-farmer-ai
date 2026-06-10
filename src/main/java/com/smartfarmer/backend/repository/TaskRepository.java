package com.smartfarmer.backend.repository;

import com.smartfarmer.backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

}