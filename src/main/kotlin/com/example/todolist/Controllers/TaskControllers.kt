package com.example.todolist

import org.springframework.web.bind.annotation.*
import com.example.todolist.model.Task
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.fasterxml.jackson.databind.SerializationFeature
import java.io.File

@RestController
@RequestMapping("/tasks")
class TaskController {

    private val mapper = jacksonObjectMapper()
        .enable(SerializationFeature.INDENT_OUTPUT)

    private val dataFile = File("data/tasks.json")

    @GetMapping
    fun getTasks(): List<Task> {
        return mapper.readValue(dataFile)
    }

    @PostMapping
    fun addTask(@RequestBody task: Task): List<Task> {
        val tasks = mapper.readValue<MutableList<Task>>(dataFile)
        tasks.add(task)
        mapper.writeValue(dataFile, tasks)
        return tasks
    }
}