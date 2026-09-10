package com.example.todolist

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestMapping


class Cart(val id: Int, val items: List<String>, val status: String)

val currentCart = Cart(1, listOf("shoes", "Pants"), "pending")

@RestController
@SpringBootApplication
class TodolistApplication {
    @RequestMapping("/")
    fun home(): String {
        return "API is live!!!!"
    }

}

fun main(args: Array<String>) {
    runApplication<TodolistApplication>(*args)
}
