import React from "react";
import { FileText, X } from "lucide-react";

export function Icon({ name, size = 24, className = "" }) {
  const icons = {
    document: <FileText size={size} className={className} />,
    close: <X size={size} className={className} />,
  };
  return icons[name] || null;
}
