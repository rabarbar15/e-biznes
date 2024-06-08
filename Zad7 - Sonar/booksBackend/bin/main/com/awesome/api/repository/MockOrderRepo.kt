package com.awesome.api.repository

import com.awesome.api.model.Order
import org.springframework.stereotype.Repository

@Repository
class MockOrderRepo : OrderRepo {

    private val orders = mutableMapOf<Int, Order>()
    private var nextId: Int = 1

    override fun getAllOrders(): List<Order> {
        return orders.values.toList()
    }

    override fun createOrder(order: Order): Order {
        order.id = nextId++
        orders[order.id] = order
        return order
    }

}