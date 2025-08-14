import React from "react";
import { Link } from "react-router-dom";

const NavButton = ({ name, to }) => {
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        color: "#333",
        fontWeight: "bold",
        padding: "10px 20px",
        margin: "0 10px",
        borderRadius: "5px",
        transition: "background 0.3s",
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = "#f0f0f0"}
      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
    >
      {name}
    </Link>
  );
};

export default NavButton;
