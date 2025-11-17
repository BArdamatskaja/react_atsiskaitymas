import { useForm } from "react-hook-form";
const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";
import { useEffect, useState } from "react";

function BookEdit({ getBooks, book, setFormEdit }) {
  const { id, title, author, category, price, reserved } = book;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();
  const [error, setError] = useState("");
  useEffect(() => {
    setValue("title", title);
    setValue("author", author);
    setValue("category", category);
    setValue("price", price);
  }, [book]);

  const formHandler = async (data) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, data);
      if (response.status === 200) {
        alert(`Book succesfully updated`);
        getBooks();
        setFormEdit(false);
        reset();
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      <h1 className="font-bold">Edit book:</h1>
      <form
        className="shadow"
        onSubmit={handleSubmit(formHandler)}
      >
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            className="border mx-2"
            {...register("title")}
          />
          <div>{errors.title?.message}</div>
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            name="author"
            id="author"
            className="border mx-2"
            {...register("author")}
          />
          <div>{errors.author?.message}</div>
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            name="category"
            id="category"
            className="border mx-2"
            {...register("category")}
          >
            <option value="Fiction"></option>
            <option value="Horror"></option>
            <option value="Fantasy"></option>
            <option value="Programming"></option>
            <option value="Novel"></option>
            <option value="Romance"></option>
          </select>
        </div>
        <div>{errors.category?.message}</div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            name="price"
            id="price"
            className="border mx-2"
            {...register("price")}
          />
        </div>
        <div>{errors.price?.message}</div>
        <div>
          <button
            type="submit"
            value="Update Donor"
            className="bg-red-100 p-1 m-1"
          >
            ✅ Update book
          </button>
          <button
            className="bg-red-100 p-1 m-1"
            onClick={() => setFormEdit(false)}
          >
            ❌ Close
          </button>
        </div>
      </form>
    </>
  );
}

export default BookEdit;
