import { Route, Routes } from "react-router";
import BookList from "./pages/BookList";
import Registration from "./pages/Registration";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={<BookList />}
        />
        <Route
          path="/registration"
          element={<Registration />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
