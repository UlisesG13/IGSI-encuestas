import HeaderLogo from "../molecule/HeaderLogo";
import CloseSesionButton from "../atom/CloseSesionButton";
import PerfilButton from "../atom/PerfilButton";

const Header = () => {
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
    </header>
  );
}

export default Header;