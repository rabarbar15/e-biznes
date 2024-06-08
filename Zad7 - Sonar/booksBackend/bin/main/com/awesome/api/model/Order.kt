package com.awesome.api.model

class OrderBook (
    val id: Int,
    val quantity: Int
)

data class Order (
    var id: Int,
    var name: String,
    var books: List<OrderBook> // Map<bookId, quantity>
)