import Logo from "../atom/Logo";
import NavButton from "../atom/NavButton";

const HeaderLogo = () => {
  return (
    <div className="flex items-center gap-4 flex-col">
        <Logo width={250} height={120} />
        <div className="mt-2 mb-1">
          <NavButton name="Departamentos" to="/" />
          <NavButton name="Encuestas" to="/encuestas" />
          <NavButton name="Empleados" to="/empleados" />

        </div>
    </div>
  );
}

export default HeaderLogo;