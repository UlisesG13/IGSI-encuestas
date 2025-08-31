import React, { useState } from "react";
import Alert from "./Alert";

export default function AlertContainer() {
  const [alerts, setAlerts] = useState([]);

  // Para mostrar una alerta desde cualquier vista
  window.showAlert = (message, type = "info") => {
    setAlerts(prev => [...prev, { message, type, id: Date.now() }]);
    setTimeout(() => {
      setAlerts(prev => prev.slice(1));
    }, 4000);
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-2">
      {alerts.map(alert => (
        <Alert key={alert.id} type={alert.type} message={alert.message} onClose={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))} />
      ))}
    </div>
  );
}
