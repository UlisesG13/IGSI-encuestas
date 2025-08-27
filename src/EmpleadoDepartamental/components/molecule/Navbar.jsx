import LogoEncuest from "../atom/LogoEncuest";
import NavLink from "../atom/NavLink";

const Navbar = () => {
  return (
    <nav className="relative z-10 flex items-center gap-6 px-6 py-4">
      <LogoEncuest />
      <div className="flex gap-6">
        <NavLink label="Encuestas" href="encuestasLista" />
      </div>
    </nav>
  );
};

export default Navbar;
