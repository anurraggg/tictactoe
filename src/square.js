import React from "react";

function Square({ value, onClick }) {
  return (
    <button
      className="w-[60px] h-[60px] border border-gray-400 text-xl font-bold flex items-center justify-center bg-white hover:bg-gray-100"
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Square;
