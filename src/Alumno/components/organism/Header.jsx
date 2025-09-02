import HeaderLogo from "../molecule/HeaderLogo";
import CloseSesionButton from "../atom/closeSesionButton";

const Header = () => {
  return (
    <header className="w-full flex items-center bg-gradient-to-r from-orange-700 to-orange-400 min-h-[96px]">
      <div className="flex items-center w-full px-8">
        <div className="flex items-center">
          <CloseSesionButton />
        </div>
        <div className="flex-1 flex justify-center">
          <HeaderLogo />
        </div>
      </div>
    </header>
  );
}

export default Header;