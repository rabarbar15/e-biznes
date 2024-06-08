package com.awesome.api.datasource

import com.awesome.api.model.Book

interface BookDatasource {

        fun retrieveAll(): List<Book>

    fun retrieveById(id: Int): Book
}