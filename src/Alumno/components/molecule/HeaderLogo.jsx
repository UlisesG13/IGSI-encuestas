import Logo from "../../../Administrador/components/atom/Logo";
import NavButton from "../../../Administrador/components/atom/NavButton";

const HeaderLogo = () => {
  return (
    <div className="flex flex-col items-center">
      <Logo width={250} height={120} />
      <div className="flex gap-8 mt-2">
        <NavButton name="Inicio" to="" />
        <NavButton name="Encuestas" to="/" />
      </div>
    </div>
  );
}

export default HeaderLogo;