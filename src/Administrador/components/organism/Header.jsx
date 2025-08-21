import { useState, useEffect, useRef } from "react";
import HeaderLogo from "../molecule/HeaderLogo";
import CloseSesionButton from "../atom/closeSesionButton";
import PerfilButton from "../atom/PerfilButton";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Manejar cierre al dar click afuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="bg-gradient-to-br from-primary-700 to-primary-400 px-8 py-4 flex justify-between items-center shadow-md w-full z-100 text-white">
      <div className="flex items-center gap-8">
        <CloseSesionButton />
      </div>

      <div className="flex items-center gap-8 flex-1 justify-center">
        <HeaderLogo />
      </div>

      <div className="flex items-center gap-4">
        <PerfilButton />
      </div>

      {/* Botón hamburguesa solo en pantallas pequeñas */}
      <button
        className="hidden text-3xl bg-none border-none text-white cursor-pointer md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Menú desplegable */}
      {menuOpen && (
        <nav ref={menuRef} className="absolute top-15 right-2.5 bg-white rounded-lg shadow-lg p-4 flex flex-col text-left gap-4 min-w-36 z-200 md:hidden">
          <button className="dropdown__item">Perfil de usuario</button>
          <button className="dropdown__item">Cerrar sesión</button>
        </nav>
      )}
    </header>
  );
};

export default Header;
