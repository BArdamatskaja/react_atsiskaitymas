import { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";
const API_URL = import.meta.env.VITE_API_URL;

function BookList() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  const getBooks = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log("Fetched books:", response.data);

      if (response.status !== 200) {
        throw new Error("Something went wrong");
      }

      if (!response.data || response.data.length === 0) {
        throw new Error("No books found");
      }

      setBooks(response.data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!books || books.length === 0) return <p>No books yet</p>;

  return (
    <div>
      {books.map((book) => (
        <BookCard
          book={book}
          getBooks={getBooks}
          key={book.id}
        />
      ))}
    </div>
  );
}
export default BookList;
