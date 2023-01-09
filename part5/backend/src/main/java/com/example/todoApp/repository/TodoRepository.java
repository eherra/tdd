package com.example.todoApp.repository;

import com.example.todoApp.model.Todo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TodoRepository extends MongoRepository<Todo, Integer> {
    // implement
}
