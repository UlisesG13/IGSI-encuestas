import Logo from "../atom/Logo";
import NavButton from "../atom/NavButton";

const HeaderLogo = () => {
  return (
    <div className="header-logo">
        <Logo width={250} height={120} />
        <div className="header-nav">
          <NavButton name="Inicio" to="/" />
          <NavButton name="Departamentos" to="/" />      
          <NavButton name="Encuestas" to="/" />
        </div>
    </div>
  );
}

export default HeaderLogo;