import React, {useState} from "react";
import Header from "../organism/Header";
import DashboardCards from "../molecule/DashboardCards";

const DepartamentosDashboard = () => {

    //let alumnos = "Ninguno";
    let titulo = "Dashboard de Departamentos";


    const [nombre,setNombre] = useState("Victor");

    let departamentos = [
        "1",
        "2",
        "3",
        "4",
        "5"
    ]

    const cambiarNombre = (nombre) => {
      setNombre(nombre)
    }

  return (
    <div className="departamentos-dashboard">
      <Header></Header>
      <h1>{titulo}</h1>
      <p>Bienvenido al dashboard de departamentos. Aquí podrás gestionar los departamentos de la aplicación.  
        <strong className={nombre.length <= 5 ? 'verde' : 'rojo' }>{nombre}</strong> </p>
        <DashboardCards></DashboardCards>
      {
          departamentos.map( (departamento , indice) => {
            return (
            <li key={indice}>
                {departamento}
            </li>
            );
          })
        }
        <button onClick={ e => cambiarNombre("Victor")}>Hola</button>
        <button onClick={ e => cambiarNombre("Victoor")}>Hola</button>
        <input type="text" onChange={e => cambiarNombre(e.target.value)} placeholder="Cambia el nombre" />
    </div>
  );
}

export default DepartamentosDashboard;