import React from "react";
import clsx from "clsx";

const COLORS = {
  primary: "bg-green-500 hover:bg-green-600 text-white",
  secondary: "bg-orange-500 hover:bg-orange-600 text-white",
  report: "bg-green-700 hover:bg-green-800 text-white",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        COLORS[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
