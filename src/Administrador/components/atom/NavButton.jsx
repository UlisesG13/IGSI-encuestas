import React from "react";
import { Link } from "react-router-dom";

const NavButton = ({ name, to }) => {
  return (
    <Link
      to={to}
      className="text-white font-bold px-5 py-2.5 mx-2.5 rounded-md transition-all duration-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
    >
      {name}
    </Link>
  );
};

export default NavButton;
