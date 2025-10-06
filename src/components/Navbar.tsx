import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Navbar() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="BeB Orfeo Logo" className="w-8 h-8" />
          <span className="font-semibold text-lg text-gray-700">
            BeB Orfeo
          </span>
        </Link>

        <ul className="flex items-center gap-6 text-gray-600 font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "hover:text-blue-500"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/rooms"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "hover:text-blue-500"
              }
            >
              Camere
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/booking"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "hover:text-blue-500"
              }
            >
              Prenota
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "hover:text-blue-500"
              }
            >
              Contatti
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
