'use client';
import React from 'react';

export default function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 flex justify-center pointer-events-none z-100">
      <div
        className="flex flex-col w-full max-w-6xl pointer-events-auto overflow-hidden"
        style={{
          margin: '8px',
          border: '1px solid var(--color-gray-900)',
          borderRadius: 'var(--radius)',            // 👈 rounded corners here
          background: 'var(--color-white)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
