import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchBooks = () => {
    const [books, setBooks] = useState<any>([]);

    useEffect(() => {
        
        axios.get('http://localhost:8080/api/books')
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => {
                console.error('Error fetching data', error)
            })
          

    }, [])

    return { books };
}

interface Book {
    id: number
    quantity: number
}

type Order = {
    id: number,
    name: String,
    books: Book[]
}

export const createOrder = (order: Order) => {
    console.log(order);
    
    axios.post('http://localhost:8080/api/order', order)
        .then(response => {
            console.log("Order created succesfully", response.data);
        })
        .catch(err => {
            console.log("Error while create an order", err);
            
        })
}