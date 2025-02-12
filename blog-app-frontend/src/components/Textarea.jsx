// Textarea Component
import React from 'react';

export function Textarea({ value, onChange, placeholder, className }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border rounded-2xl p-2 mb-2 w-full h-32 ${className}`}
    />
  );
}
