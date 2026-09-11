package com.example.todolist

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class WebConfig : WebMvcConfigurer {
    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:5173")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true)
    }
}

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
