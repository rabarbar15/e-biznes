package com.awesome.api.service

import com.awesome.api.datasource.mock.MockBookDatasource
import com.awesome.api.model.Book
import org.springframework.stereotype.Service

@Service
class BookService(private val bookDatasource: MockBookDatasource) {

    fun getAllBooks(): List<Book> = bookDatasource.retrieveAll()

    fun getBookById(id: Int): Book = bookDatasource.retrieveById(id)
}