package com.awesome.api.controller

import com.awesome.api.model.Book
import com.awesome.api.model.Order
import com.awesome.api.service.BookService
import com.awesome.api.service.OrderService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/api")
class BookController(private val bookService: BookService, private val orderService: OrderService) {

    @GetMapping("/books")
        fun getAllBooks(): List<Book> {
        return bookService.getAllBooks()
    }

    @GetMapping("/books/{id}")
    fun getSingleBook(@PathVariable id: Int): Book {
        return bookService.getBookById(id)
    }

    @GetMapping("/orders")
        fun getOrders(): List<Order> {
        return orderService.getOrders()
    }



    @PostMapping("/order")
    fun createOrder(@RequestBody order: Order): ResponseEntity<Order> {
        val createdOrder = orderService.createOrder(order)
        return ResponseEntity(createdOrder, HttpStatus.CREATED)
    }

}