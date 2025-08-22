import Heading from "../atom/Heading";
import Subheading from "../atom/Subheading";

const WelcomeMessage = () => {
  return (
    <div className="mt-10 flex flex-col items-center">
      <Heading>Bienvenido</Heading>
      <Subheading>¿Ya estás listo para crear tu encuesta?</Subheading>
    </div>
  );
};

export default WelcomeMessage;
