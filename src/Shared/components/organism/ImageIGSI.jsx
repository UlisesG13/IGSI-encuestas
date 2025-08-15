import logoIGSI from '../../../assets/logoIGSI.png';
import './ImageIGSI.css';

export default function ImageIGSI() {
  return (
    <div className="imageigsi-bg">
      <div className="imageigsi-center">
        <img src={logoIGSI} alt="Logo IGSI" className="imageigsi-logo" />
        <span className="imageigsi-text-main">INTEGRACIÓN GLOBAL DE SISTEMAS DE INFORMACIÓN</span>
        <span className="imageigsi-text-sub">ENCUESTAS</span>
      </div>
    </div>
  );
}
