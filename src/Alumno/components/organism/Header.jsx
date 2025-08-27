import HeaderLogo from "../molecule/HeaderLogo";
import CloseSesionButton from "../atom/closeSesionButton";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-orange-700 to-orange-400">
      <CloseSesionButton /> 
      <div className="flex-1 flex justify-center">
        <HeaderLogo />
      </div>
     
    </header>
  );
}

export default Header;