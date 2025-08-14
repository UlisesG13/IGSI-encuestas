import logoImg from "../../../assets/logo.png"; 

const Logo = ({ width = 50, height = 50 }) => {
  return (
    <div>
           <img
      src={logoImg}
      alt="Logo"
      width={width}
      height={height}
      style={{ display: "block" }}
    />
    </div>
 
  );
};

export default Logo;
