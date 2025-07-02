// components/TabbedContentWrapper/TabbedContentWrapper.tsx
'use client';

import React from 'react';
import Frame         from './Frame';
import FloatingTabs  from './FloatingTabs';
import Spacer     from './Spacer';       // adjust relative path if needed

export default function TabbedContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Frame>
      {/* scrollable content */}
      <main
        className="flex-1 overflow-auto bg-transparent pointer-events-auto hide-scrollbar"
        data-scroll-restoration-id="main-content"
        style={{ borderRadius: 'calc(var(--radius) - 4px)' }}
      >
        {children}
      </main>

      {/* floating centred tabs */}
      <FloatingTabs />
    </Frame>
  );
}
