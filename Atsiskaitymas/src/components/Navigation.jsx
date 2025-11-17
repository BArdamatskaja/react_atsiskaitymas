import { NavLink } from "react-router-dom";
function Navigation() {
  return (
    <nav className="flex gap-3 bg-green-800 p-1.5 font-medium border">
      <NavLink to="/">🏚Home</NavLink>
      <NavLink to="/registration">🌼Add book</NavLink>
    </nav>
  );
}
export default Navigation;
