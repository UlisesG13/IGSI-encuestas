import React, { useState, useEffect } from 'react';
import Alert from './Alert.jsx';

const AlertContainer = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    window.showAlert = (message, type = 'info', duration = 3500) => {
      const id = Date.now() + Math.random();
      setAlerts(prev => [...prev, { id, message, type }]);
      setTimeout(() => {
        setAlerts(prev => prev.filter(alert => alert.id !== id));
      }, duration);
    };
    return () => {
      window.showAlert = undefined;
    };
  }, []);

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 items-end">
      {alerts.map(alert => (
        <Alert
          key={alert.id}
          message={alert.message}
          type={alert.type}
          onAccept={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
        />
      ))}
    </div>
  );
};

export default AlertContainer;
