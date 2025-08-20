import InfoCard from "../atom/InfoCard";

const DashboardCards = ({numeroDepartamentos = 24, numeroEncuestas = 1000, numeroEmpleados = 1500}) => {
  const data = [
    { Titulo: "Número de departamentos", Cantidad: numeroDepartamentos },
    { Titulo: "Número de encuestas", Cantidad: numeroEncuestas },
    { Titulo: "Número de empleados", Cantidad: numeroEmpleados }
  ];

  return (
    <div className="grid grid-rows-3 gap-6 mb-8 w-full">
      {data.map((item, index) => (
        <div key={index} className="bg-white rounded-lg p-6 shadow-soft transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-medium">
          <div className="text-sm text-gray-500 mb-2 font-medium">{item.Titulo}</div>
          <div className="text-3xl font-bold text-gray-900 leading-none">{item.Cantidad}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
