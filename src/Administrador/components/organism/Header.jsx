import HeaderLogo from "../molecule/HeaderLogo";
import CloseSesionButton from "../atom/CloseSesionButton";
import PerfilButton from "../atom/PerfilButton";

const Header = () => {
  return (
    <header className="header">
      <CloseSesionButton></CloseSesionButton>  
      <HeaderLogo />
    <PerfilButton></PerfilButton>
    
    </header>
  );
}

export default Header;