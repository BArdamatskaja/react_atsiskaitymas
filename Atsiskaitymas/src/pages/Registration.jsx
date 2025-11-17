import axios from "axios";
import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Registration() {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const formHandler = async (data) => {
    try {
      const response = await axios.post(API_URL, data);
      if (response.status === 201) {
        alert("Registration successful");
      }
      getBooks();
      reset();
    } catch (error) {
      setError(error.message);
    }
    console.log("API_URL:", API_URL);
  };
  return (
    <>
      <div className="grow p-5 flex bg-green-100">
        {error && <p>{error}</p>}
        <form noValidate>
          <div className="mb-2">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              className="border m-1 ml-11 w-100"
              {...register("title", { minLength: 3, maxLength: 100 })}
            />
            <div>{errors.title?.message}</div>
          </div>
          <div>
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              name="author"
              id="author"
              className="border m-2 ml-6 w-100 "
              {...register("author", { pattern: "[A-Za-a]*" })}
            />
            <div>{errors.author?.message}</div>
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <select
              name="category"
              id="category"
              className="border m-2 w-100"
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
              className="border m-2 ml-9.5"
              {...register("price", { min: 0.1 })}
            />
          </div>
          <div>{errors.price?.message}</div>
          <div>
            <label for="cover">Add a cover picture:</label>

            <input
              type="text"
              id="cover"
              name="cover"
              className="border m-2 w-82"
              {...register("cover", {
                pattern: {
                  value:
                    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/,
                },
              })}
            />
          </div>
          <Link
            to="/"
            className="mt-2 p-1.5 border bg-green-400"
            onClick={handleSubmit}
          >
            ✅Submit
          </Link>
        </form>
      </div>
    </>
  );
}
export default Registration;
