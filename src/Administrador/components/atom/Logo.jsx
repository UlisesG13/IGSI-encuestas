import logoImg from "../../../assets/logo.png"; 

const Logo = ({ width = 50, height = 50, color }) => {
  return (
    <div className="flex items-center gap-3">
      <img
        src={logoImg}
        alt="Logo"
        width={width}
        height={height} 
        className={`block ${color ? `text-${color}` : ''}`}
      />
    </div>
  );
};

export default Logo;
