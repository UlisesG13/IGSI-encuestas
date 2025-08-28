import React from "react";

export default function Badge({ number }) {
  return (
    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white font-bold text-lg shadow-md">
      {number}
    </span>
  );
}
