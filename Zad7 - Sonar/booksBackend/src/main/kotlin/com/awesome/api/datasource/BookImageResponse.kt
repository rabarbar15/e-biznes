package com.awesome.api.datasource

import com.awesome.api.model.Book

data class BookImageResponse(
    val book: Book,
    
    val image: ByteArray
)