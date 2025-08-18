import React from "react";
import { Link } from "react-router-dom";

const NavButton = ({ name, to }) => {
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        color: "white",
        fontWeight: "bold",
        padding: "10px 20px",
        margin: "0px 10px",
        borderRadius: "5px",
        transition: "background 0.3s",  
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = "#d90b0b59"}
      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
    >
      {name}
    </Link>
  );
};

export default NavButton;
