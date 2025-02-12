// Button Component
import React from 'react';

export function Button({ children, onClick, type = 'button', className }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl ${className}`}
    >
      {children}
    </button>
  );
}
