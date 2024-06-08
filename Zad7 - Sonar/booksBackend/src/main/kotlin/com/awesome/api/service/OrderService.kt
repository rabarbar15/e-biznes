package com.awesome.api.service

import com.awesome.api.model.Order
import com.awesome.api.repository.MockOrderRepo
import org.springframework.stereotype.Service

@Service
class OrderService(private val orderRepo: MockOrderRepo) {

    fun createOrder(order: Order): Order {
        return orderRepo.createOrder(order)
    }

    fun getOrders(): List<Order> {
        return orderRepo.getAllOrders()
    }
}