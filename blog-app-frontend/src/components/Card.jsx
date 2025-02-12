// Card Component
import React from 'react';

export function Card({ children, className }) {
  return <div className={`border rounded-2xl shadow-lg p-4 ${className}`}>{children}</div>;
}

export function CardHeader({ children }) {
  return <h2 className='text-xl font-bold mb-2'>{children}</h2>;
}

export function CardContent({ children }) {
  return <div className='text-base'>{children}</div>;
}
