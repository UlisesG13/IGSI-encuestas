import '../styles/Alert.css';
import { CheckCircle, AlertTriangle, X } from 'lucide-react';

export default function Alert({ title, description, status = 'success', onAccept }) {
  return (
    <div className={`alert-molecule ${status === 'success' ? 'alert-success' : 'alert-error'}`}>
      <div className="alert-header">
        {status === 'success' ? (
          <CheckCircle className="alert-icon" />
        ) : (
          <AlertTriangle className="alert-icon" />
        )}
        <span className="alert-title">{title}</span>
        <button className="alert-close" onClick={onAccept}><X size={18} /></button>
      </div>
      <div className="alert-description">{description}</div>
      <div className="alert-actions">
        <button className="alert-btn" onClick={onAccept}>Aceptar</button>
      </div>
    </div>
  );
}
