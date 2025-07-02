'use client';

import React, { useState, useEffect } from 'react';

const HoveringProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleProgressUpdate = (event: CustomEvent) => {
      const { currentStep, totalSlides } = event.detail;
      
      // Frame-shift the progress so:
      // - Step 0 (first question) shows some progress (1 step complete)
      // - Final step shows 100% complete
      const adjustedProgress = ((currentStep + 1) / totalSlides) * 100;
      setProgress(adjustedProgress);
    };

    // Listen for the progress updates from your form
    window.addEventListener('progressUpdate', handleProgressUpdate as EventListener);

    return () => {
      window.removeEventListener('progressUpdate', handleProgressUpdate as EventListener);
    };
  }, []);

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out">
      <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-3 shadow-lg">
        {/* Progress Bar Only */}
        <div className="w-48 bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ 
              width: `${progress}%`,
              backgroundColor: 'var(--color-accent, #3b82f6)'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HoveringProgressBar;