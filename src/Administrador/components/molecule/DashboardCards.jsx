import InfoCard from "../atom/InfoCard";

const DashboardCards = ({numeroDepartamentos = 24, numeroEncuestas = 1000, numeroEmpleados = 1500}) => {
  const data = [
    { Titulo: "Número de departamentos", Cantidad: numeroDepartamentos },
    { Titulo: "Número de encuestas", Cantidad: numeroEncuestas },
    { Titulo: "Número de empleados", Cantidad: numeroEmpleados }
  ];

  return (
    <div className="dashboard-cards">
      {data.map((item, index) => (
        <div key={index} className="dashboard-cards__card">
          <div className="dashboard-cards__label">{item.Titulo}</div>
          <div className="dashboard-cards__value">{item.Cantidad}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
