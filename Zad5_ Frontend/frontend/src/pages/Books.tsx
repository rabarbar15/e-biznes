import { Col, Row } from "react-bootstrap"
import { Item } from '../components/Item'
import { useFetchBooks } from "../data/FetchData"


export const Products = () => {
    const { books } = useFetchBooks();
    
    return (
    <>
        <h1 className="mb-3">Books</h1>
        {books && books.length > 0 ? (<Row sm={2} xs={1} md={2} lg={3} xl={4} className='g-5'>
            {books.map((book: any) => (
                <Col key={book.id}><Item {...book} /></Col>
            ))}
        </Row>) : (
            <div>No books available</div>
        )}
    </>
  )
}

export default Products