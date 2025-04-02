import { useEffect, useState } from 'react';
import { Project } from './types/Book';

function BookList() {
  const [books, setBooks] = useState<Project[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('');


  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `http://localhost:5000/api/Book/GetBookList?pageSize=${pageSize}&pageNum=${pageNum}&sortBy=${sortBy}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(totalItems / pageSize));
    };
    fetchBooks();
  }, [pageSize, pageNum, totalItems, sortBy]);

  return (
    <>
      <h1>Books</h1>
      <br />
      <label>
        Sort by:
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setPageNum(1); 
          }}
        >
          <option value="">Default</option>
          <option value="title">Book Title</option>
        </select>
      </label>
      {books.map((p) => (
        <div id="bookCard" className="card" key={p.bookId}>
          <h3 className="card-title">{p.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author:</strong> {p.author}
              </li>
              <li>
                <strong>Publisher:</strong> {p.publisher}
              </li>
              <li>
                <strong>ISBN:</strong> {p.isbn}
              </li>
              <li>
                <strong>Classification:</strong> {p.classification}
              </li>
              <li>
                <strong>Category:</strong> {p.category}
              </li>
              <li>
                <strong>PageCount:</strong> {p.pageCount}
              </li>
              <li>
                <strong>Price:</strong> {p.price}
              </li>
            </ul>
          </div>
        </div>
      ))}

      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => setPageNum(i + 1)}
          disabled={pageNum === i + 1}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default BookList;
