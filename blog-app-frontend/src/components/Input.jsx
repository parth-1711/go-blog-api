// Input Component
import React from 'react';

export function Input({ value, onChange, placeholder, type = 'text', className }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border rounded-2xl p-2 mb-2 w-full ${className}`}
    />
  );
}
