import { useState, useEffect, useRef } from "react";
import HeaderLogo from "../molecule/HeaderLogo";
import CloseSesionButton from "../atom/CloseSesionButton";
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
    <header className="header">
      <div className="header__left">
        <CloseSesionButton />
      </div>

      <div className="header__center">
        <HeaderLogo />
      </div>

      <div className="header__right">
        <PerfilButton />
      </div>

      {/* Botón hamburguesa solo en pantallas pequeñas */}
      <button
        className="header__menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Menú desplegable */}
      {menuOpen && (
        <nav ref={menuRef} className="header__dropdown">
          <button className="dropdown__item">Perfil de usuario</button>
          <button className="dropdown__item">Cerrar sesión</button>
        </nav>
      )}
    </header>
  );
};

export default Header;
