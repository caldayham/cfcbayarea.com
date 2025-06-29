// components/TabbedContentWrapper/Frame.tsx
'use client';

import React from 'react';

export default function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="fixed inset-0 flex flex-col pointer-events-none"
      style={{
        margin: '8px',
        border: '2px solid var(--color-text-primary)',
        borderRadius: 'var(--radius)',
      }}
    >
      {children}
    </div>
  );
}
