package com.example.todolist.model

class Task(
    val id: Int,
    val title: String,
    val description: String,
    val finished: Boolean,
    val subTasks: MutableList<SubTask> = mutableListOf()
)

class SubTask(
    val title: String,
    val description: String,
    val finished: Boolean
)