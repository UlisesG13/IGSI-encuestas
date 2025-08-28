import React from "react";
import Typography from "../atom/Typography";
import { Icon } from "../atom/Icon";

export default function ModalHeader({ title, subtitle, onClose }) {
  return (
    <div className="relative flex flex-col items-center justify-center px-6 py-6 rounded-t-2xl bg-gradient-to-r from-orange-400 to-orange-500">
      <div className="absolute right-4 top-4 cursor-pointer" onClick={onClose} aria-label="Cerrar modal">
        <Icon name="close" size={28} className="text-white" />
      </div>
      <Icon name="document" size={40} className="mb-2 text-white" />
      <Typography variant="h1">Encuesta de satisfacción</Typography>
      <Typography variant="subtitle" className="mt-2 text-center max-w-md">{subtitle}</Typography>
    </div>
  );
}
