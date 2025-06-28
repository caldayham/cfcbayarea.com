'use client';

import React from 'react';

const ContactBadge = () => {
  const handleContactClick = () => {
    // TODO: Open contact form modal/slide when component is built
    console.log('Contact form will open here');
  };

  return (
    <div 
      className="fixed bottom-6 right-6 z-50"
    >
      <button
        onClick={handleContactClick}
        className="px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
        style={{ 
          backgroundColor: 'var(--color-accent)',
          borderRadius: 'var(--radius)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-accent)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
        aria-label="Get Quote"
      >
        Get Quote
      </button>
    </div>
  );
};

export default ContactBadge;