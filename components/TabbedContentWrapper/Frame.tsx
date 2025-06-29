// components/TabbedContentWrapper/Frame.tsx
'use client';

import React from 'react';

export default function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="fixed inset-0 flex justify-center pointer-events-none"
    >
      <div
        className="flex flex-col w-full max-w-6xl  pointer-events-auto"
        style={{
          margin: '8px',
          border: '2px solid var(--color-text-primary)',
          borderRadius: 'var(--radius)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
