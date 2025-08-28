import React from "react";
import Button from "../../atom/Button/Button";

export default function ActionButton({ children, loading, ...props }) {
  return (
    <Button variant="report" {...props} disabled={loading} className="w-full py-3 text-lg font-bold">
      {loading ? "Generando..." : children}
    </Button>
  );
}
