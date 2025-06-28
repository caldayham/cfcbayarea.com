'use client';

import React from 'react';
import PortfolioPreviewCard from '@/components/PortfolioPreviewCard';
import portfolioData from '@/data/portfolioTestData.json';
import ScrollManager from '@/components/ScrollManager';

// Define the portfolio item interface (same as in component)
interface PortfolioItem {
  id: string;
  title: string;
  thumbnail: string;
  location: string;
  completionDate: string;
  projectType: string;
  description: string;
}

export default function Portfolio() {
  // Handle card click - placeholder for modal opening
  const handleCardClick = (item: PortfolioItem) => {
    console.log('Portfolio item clicked:', item);
    // TODO: Open portfolio detail modal when component is built
  };

  return (
    <>
      <ScrollManager />
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Our Portfolio
            </h1>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
              Take a look at some of our recent custom construction projects
              throughout the Palo Alto Bay Area.
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioData.map((item: PortfolioItem) => (
              <PortfolioPreviewCard
                key={item.id}
                item={item}
                onClick={handleCardClick}
              />
            ))}
          </div>

          {/* Empty State - Shows if no data */}
          {portfolioData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg" style={{ color: 'var(--color-text-muted)' }}>
                No portfolio items found.
              </p>
            </div>
          )}

          {/* Bottom CTA Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Ready to Start Your Project?
            </h2>
            <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
              Let&apos;s discuss your custom construction needs.
            </p>
            <button
              className="font-medium px-8 py-3 text-white transition-colors duration-200 hover:opacity-90"
              style={{
                backgroundColor: 'var(--color-accent)',
                borderRadius: 'var(--radius)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-accent)';
              }}
            >
              Contact Us Today
            </button>
          </div>

        </div>
      </div>
    </>
  );
}