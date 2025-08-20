import logoIGSI from '../../../assets/logoIGSI.png';

export default function ImageIGSI() {
  return (
    <div className="w-full h-screen relative bg-gradient-to-br from-black/45 to-black/45 bg-cover bg-center bg-no-repeat flex items-center justify-center" 
         style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('../../../assets/imgLogin.webp')` }}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
        <img src={logoIGSI} alt="Logo IGSI" className="w-80 mb-2 md:w-80" />
        <span className="text-white text-xl font-medium tracking-wide text-center mb-0.5 md:text-sm">
          INTEGRACIÓN GLOBAL DE SISTEMAS DE INFORMACIÓN
        </span>
        <span className="text-white text-2xl font-bold tracking-wider text-center mt-0 md:text-base">
          ENCUESTAS
        </span>
      </div>
    </div>
  );
}
