'use client';

import portfolioData from '@/data/portfolioTestData.json';
import PortfolioPreviewCard, { PortfolioItem } from '@/components/Portfolio_Components/PortfolioPreviewCard';
import JobMap from '@/components/Portfolio_Components/JobMap';

export default function Portfolio() {
  const handleClick = (item: PortfolioItem) => console.log('clicked', item);

  return (
    <main className="min-h-screen bg-white text-primary mb-10">
      {/* --- Page Hero (optional) --- */}
      <section className="py-10 px-4 md:px-8 bg-gray border-b border-default text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Our Portfolio</h1>
        <p className="text-secondary max-w-2xl mx-auto">
          Click on a pin to read more about the project or scroll down to our gallery!
        </p>
      </section>
      
      <JobMap />

      {/* --- Portfolio Grid --- */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.map((item: PortfolioItem) => (
            <PortfolioPreviewCard key={item.id} item={item} onClick={handleClick} />
          ))}
        </div>

        {portfolioData.length === 0 && (
          <p className="text-center text-muted mt-16">No portfolio items found.</p>
        )}
      </section>

      {/* --- CTA --- */}
      <section className="py-20 px-4 md:px-8 bg-gray border-t border-default text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Shorten Your Todo List?</h2>
        <p className="text-secondary mb-6">
          Click below to tell us a little more about your project and to set up a free consultation. 
          <br/>
          <i>(CFC services are only available to Bay Area residents.)</i>
        </p>
        <a
          href="/get-quote"
          className="inline-block bg-accent hover:bg-accent-dark text-white font-medium px-8 py-3 rounded shadow-lg transition-colors"
        >
          Contact Us Today
        </a>
      </section>
    </main>
  );
}
