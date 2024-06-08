package com.awesome.api.repository

import com.awesome.api.model.Order

interface OrderRepo {
    fun getAllOrders(): List<Order>
    fun createOrder(order: Order): Order

}