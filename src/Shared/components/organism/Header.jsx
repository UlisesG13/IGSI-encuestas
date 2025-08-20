import HeaderLogo from "../molecule/HeaderLogo";
// import CloseSesionButton from "../atom/CloseSesionButton"; // Archivo no existe, luego lo pongo
import PerfilButton from "../../../Administrador/components/atom/PerfilButton";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-300">
      <div>{/* <CloseSesionButton /> */}</div>
      <div className="flex-1 flex justify-center">
        <HeaderLogo />
      </div>
      <div>
        <PerfilButton />
      </div>
    </header>
  );
}

export default Header;