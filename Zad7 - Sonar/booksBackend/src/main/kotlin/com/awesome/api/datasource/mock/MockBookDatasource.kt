package com.awesome.api.datasource.mock

import com.awesome.api.datasource.BookDatasource
import com.awesome.api.model.Book
import org.springframework.stereotype.Repository

@Repository
class MockBookDatasource : BookDatasource {

    val books = listOf(
        Book(0,"Drakula", "Bram Stoker", 10.99),
        Book(1,"Behawiorysta", "Remigiusz Mróz", 8.99),
        Book(2,"Dwie wieże", "J.R.R. Tolkien", 11.99),

        Book(3,"Jobs", "Walter Isaacson", 11.99),
        Book(4,"Out", "Natsu Kirimo", 11.99),
        Book(5,"Solaris", "Stanisław Lem", 11.99),
        
        Book(6,"Szklany Klosz", "Sylvia Plath", 11.99),
        Book(7,"Ziemiomorze", "Ursula K. Le Guin", 11.99),
        Book(8,"Miasteczko Salem", "Stephen King", 11.99),
    )

    override fun retrieveAll(): List<Book> = books


    override fun retrieveById(id: Int): Book = books[id]


}

//[
//{
//    "id": 1,
//    "name": "Drakula",
//    "author": "Bram Stoker",
//    "price": 10.99,
//    "imgUrl": "/imgs/drakula.jpg"
//},
//{
//    "id": 2,
//    "name": "Dwie wieże",
//    "author": "J. R. Tolkien",
//    "price": 11.99,
//    "imgUrl": "/imgs/dwie-wieze.jpg"
//},
//{
//    "id": 3,
//    "name": "Jobs",
//    "author": "Walter Isaacson",
//    "price": 1.05,
//    "imgUrl": "/imgs/jobs.jpg"
//},
//{
//    "id": 4,
//    "name": "Out",
//    "author": "Natsuo Kirimo",
//    "price": 140,
//    "imgUrl": "/imgs/out.jpg"
//},
//{
//    "id": 5,
//    "name": "Solaris",
//    "author": "Stanisław Lem",
//    "price": 11.99,
//    "imgUrl": "/imgs/solaris.jpg"
//},
//{
//    "id": 6,
//    "name": "Szklany klosz",
//    "author": "Sylvia Plath",
//    "price": 1.05,
//    "imgUrl": "/imgs/szklany-klosz.jpg"
//},
//{
//    "id": 7,
//    "name": "Ziemiomorze",
//    "author": "Ursula K. Le Guin",
//    "price": 350,
//    "imgUrl": "/imgs/ziemiomorze.jpg"
//},
//{
//    "id": 8,
//    "name": "Miasteczko Salem",
//    "author": "Stephen King",
//    "price": 32.00,
//    "imgUrl": "/imgs/miasteczko-salem.jpg"
//}
//]

