import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function BookCard({ book, getBooks }) {
  if (!book) return null;

  const { id, title, author, category, price, cover } = book;

  const [formEdit, setFormEdit] = useState(false);
  const [isReserved, setIsReserved] = useState(
    book.reserved === true || book.reserved === "true"
  );
  const [error, setError] = useState("");
  const deleteBook = async () => {
    const confirmDelete = window.confirm(
      `Do you want to delete book: ${author} - ${title}?`
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      getBooks();
    } catch (err) {
      setError(err.message);
    }
  };
  const handleUpdateReserved = async () => {
    const newStatus = !isReserved;
    try {
      const response = await axios.patch(`${API_URL}/${id}`, {
        reserved: newStatus,
      });

      if (response.status === 200) {
        setIsReserved(newStatus);
        getBooks();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="bg-green-100 mx-auto p-4 border flex justify-center grow">
        <img
          src={cover}
          alt={title}
          className="w-50 h-70"
        />
        <div className="p-2">
          <h2 className="italic">{author}</h2>
          <h1 className="font-bold">{title}</h1>
          <p className="font-thin">{category}</p>
          <p className="text-red-950 text-2xl">{price} eur</p>
        </div>
        <div className="grow flex justify-end">
          <p
            className={`mx-auto text-center ${
              isReserved ? "text-red-900" : "text-green-900"
            }`}
          >
            {isReserved ? "Reserved" : "Available"}
          </p>
          <div className="flex justify-center gap-2">
            <button
              className="bg-blue-900 text-white px-3 py-1"
              onClick={handleUpdateReserved}
            >
              {isReserved ? "Return book" : "Give"}
            </button>

            <button
              className="bg-red-300 p-1"
              onClick={deleteBook}
            >
              🗑️ Delete
            </button>

            <button
              className="bg-yellow-300 p-1"
              onClick={() => setFormEdit(true)}
            >
              ✏️ Update
            </button>
          </div>
        </div>
        {error && <p className="text-red-600">{error}</p>}
      </div>
      {formEdit && (
        <div className="border p-2 m-2 col-span-3">
          <BookEdit
            book={book}
            getBooks={getBooks}
            setFormEdit={setFormEdit}
          />
        </div>
      )}
    </>
  );
}

export default BookCard;
