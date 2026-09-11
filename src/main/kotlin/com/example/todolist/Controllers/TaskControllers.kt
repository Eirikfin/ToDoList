package com.example.todolist

import org.springframework.web.bind.annotation.*import org.springframework.web.bind.annotation.*
import com.example.todolist.model.Task
import com.example.todolist.model.SubTask
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.fasterxml.jackson.databind.SerializationFeature
import org.springframework.web.server.ResponseStatusException
import org.springframework.http.HttpStatus
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

        //give the task an id
        val newId = (tasks.maxOfOrNull { it.id } ?: 0) + 1

        val newTask = Task(
            id = newId,
            title= task.title,
            description = task.description,
            finished = task.finished,
            subTasks = task.subTasks
        )

        tasks.add(newTask)
        mapper.writeValue(dataFile, tasks)
        return tasks
    }

    @DeleteMapping
    fun deleteTask(@RequestParam taskId: Int): List<Task> {
        val tasks = mapper.readValue<MutableList<Task>>(dataFile)
        val task = tasks.find { it.id == taskId }
            ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Task $taskId not found")

        tasks.remove(task)
        mapper.writeValue(dataFile, tasks)
        return tasks
    }

    data class TaskPatch(
        val title: String? = null,
        val description: String? = null,
        val finished: Boolean? = null,
        val subTasks: MutableList<SubTask>? = null
    )

    @PatchMapping
    fun patchTask(@RequestParam taskId: Int, @RequestBody patch: TaskPatch): List<Task> {
        val tasks = mapper.readValue<MutableList<Task>>(dataFile)
        val index = tasks.indexOfFirst { it.id == taskId }

        if (index == -1) {
            throw ResponseStatusException(HttpStatus.NOT_FOUND, "Task $taskId not found")
        }

        val existing = tasks[index]

        val updated = Task(
            id = existing.id,
            title = patch.title ?: existing.title,
            description = patch.description ?: existing.description,
            finished = patch.finished ?: existing.finished,
            subTasks = patch.subTasks ?: existing.subTasks
        )

        tasks[index] = updated
        mapper.writeValue(dataFile, tasks)
        return tasks
    }

}