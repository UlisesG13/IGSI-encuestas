import React from "react";

const InfoCard = ({ Titulo, Cantidad }) => {
  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    minWidth: "120px",
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    margin: "8px"
  };

  const titleStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "8px"
  };

  const quantityStyle = {
    fontSize: "24px",
    color: "#333"
  };

  return (
    <div style={cardStyle}>
      <div style={titleStyle}>{Titulo}</div>
      <div style={quantityStyle}>{Cantidad}</div>
    </div>
  );
};

export default InfoCard;
