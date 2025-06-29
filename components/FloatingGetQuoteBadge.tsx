'use client';

import React from 'react';

const FloatingGetQuoteBadge = () => {
  const handleContactClick = () => {
    // TODO: Open contact form modal/slide when component is built
    console.log('Contact form will open here');
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <button
        onClick={handleContactClick}
        className="px-6 py-3 font-medium text-white transition-all duration-300 hover:shadow-xl hover:scale-105"
        style={{
          backgroundColor: 'var(--color-accent)',
          borderRadius: 'var(--radius)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}
        aria-label="Get Quote"
      >
        Get Quote
      </button>
    </div>
  );
};

export default FloatingGetQuoteBadge;
