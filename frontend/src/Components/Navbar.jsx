import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <nav className="w-full bg-mybl text-white py-4 px-8">
        <ul className="flex justify-center space-x-10">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/download" className="hover:underline">
              Download
            </Link>
          </li>
          <li>
            <Link to="/Admin" className="hover:underline">
              Admin
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
