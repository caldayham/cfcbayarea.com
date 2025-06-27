'use client'

import React from 'react';
import PortfolioPreviewCard from '@/components/PortfolioPreviewCard';
import portfolioData from '@/data/portfolioTestData.json';

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
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Our Portfolio
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
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
            <p className="text-slate-500 text-lg">
              No portfolio items found.
            </p>
          </div>
        )}

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-slate-600 mb-6">
            Let's discuss your custom construction needs.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors">
            Contact Us Today
          </button>
        </div>

      </div>
    </div>
  );
}