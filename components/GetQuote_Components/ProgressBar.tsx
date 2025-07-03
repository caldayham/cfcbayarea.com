'use client';

import React, { useState, useEffect } from 'react';

interface ProgressBarProps {
  /** Current step/slide number (0-based) */
  currentStep: number;
  /** Total number of slides including success page */
  totalSlides: number;
  /** Optional custom styling className */
  className?: string;
}

/**
 * Progress bar component that shows form completion progress
 * Positioned above the form content, responsive to screen width
 * Progress calculated based on current step position, not completion
 * 
 * Uses client-side only rendering to prevent hydration mismatches
 */
const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSlides,
  className = ''
}) => {
  const [isClient, setIsClient] = useState(false);

  // Only render on client side to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render anything on server side
  if (!isClient) {
    return (
      <div className={`w-full mb-6 ${className}`}>
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-4 py-3 shadow-sm">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden mb-2">
            <div className="h-full rounded-full bg-gray-200" />
          </div>
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Loading...</span>
            <span>&nbsp;</span>
          </div>
        </div>
      </div>
    );
  }

  // Calculate progress percentage based on current step
  // Add 1 to currentStep so that being on slide 1 shows some progress
  // This ensures the progress bar fills completely when reaching the success page
  const progressPercentage = ((currentStep + 1) / totalSlides) * 100;

  // Ensure progress doesn't exceed 100%
  const clampedProgress = Math.min(progressPercentage, 100);

  return (
    <div className={`w-full mb-6 ${className}`}>
      {/* Progress bar container with responsive padding - no extra margins */}
      <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-4 py-3 shadow-sm">

        {/* Progress bar track - responsive width */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden mb-2">
          {/* Progress bar fill - animated */}
          <div
            className="h-full rounded-full transition-all duration-500 ease-out bg-accent"
            style={{
              width: `${clampedProgress}%`,
              // Fallback color if CSS variable not defined
              backgroundColor: clampedProgress > 0 ? 'var(--color-accent, #3b82f6)' : 'transparent'
            }}
          />
        </div>

        {/* Bottom indicators */}
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>
            {Math.round(clampedProgress)}% Complete
          </span>
          <span>
            {currentStep === totalSlides - 1 ? 'Last Question' : `${totalSlides - currentStep - 1} questions remaining`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;