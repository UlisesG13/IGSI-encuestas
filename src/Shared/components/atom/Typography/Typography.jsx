import React from "react";

export default function Typography({ variant = "body", children, className = "" }) {
  const variants = {
    h1: "text-2xl md:text-3xl font-bold text-white",
    h2: "text-lg md:text-xl font-semibold text-white",
    subtitle: "text-base md:text-lg text-white/90",
    body: "text-base text-gray-700",
    question: "text-base text-gray-800 font-medium",
  };
  return <span className={`${variants[variant]} ${className}`}>{children}</span>;
}
