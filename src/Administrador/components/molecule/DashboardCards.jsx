import InfoCard from "../atom/InfoCard"; // Asegúrate de tener el componente InfoCard

const DashboardCards = ({numeroDepartamentos = 24, numeroEncuestas = 1000, numeroEmpleados = 1500}) => {

    
  const data = [
    { Titulo: "Número de departamentos", Cantidad:numeroDepartamentos },
    { Titulo: "Número de encuestas", Cantidad: numeroEncuestas },
    { Titulo: "Número de empleados", Cantidad: numeroEmpleados }
  ];

  const containerStyle = {
    display: "flex",
    flexDirection: "column", // Cambia a "row" si quieres horizontal
    gap: "16px",
    alignItems: "flex-start"
  };

  return (
    <div style={containerStyle}>
      {data.map((item, index) => (
        <InfoCard
          key={index}
          Titulo={item.Titulo}
          Cantidad={item.Cantidad}
        />
      ))}
    </div>
  );
};

export default DashboardCards;
