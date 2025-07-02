import React from 'react';

const MapLoadingVisual = () => {
  return (
    <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden relative">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
      
      {/* Map placeholder structure */}
      <div className="p-4 h-full flex flex-col">
        {/* Top controls area */}
        <div className="flex justify-between items-center mb-4">
          <div className="h-8 w-24 bg-gray-200 rounded"></div>
          <div className="h-8 w-8 bg-gray-200 rounded"></div>
        </div>
        
        {/* Main map area with grid pattern */}
        <div className="flex-1 bg-gray-50 rounded relative overflow-hidden">
          {/* Grid pattern to simulate map tiles */}
          <div className="absolute inset-0 opacity-30">
            <div className="grid grid-cols-4 grid-rows-3 h-full w-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border border-gray-300 bg-gray-100"></div>
              ))}
            </div>
          </div>
          
          {/* Simulated map markers */}
          <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-gray-300 rounded-full"></div>
          <div className="absolute top-2/3 right-1/4 w-4 h-4 bg-gray-300 rounded-full"></div>
          <div className="absolute bottom-1/4 left-1/2 w-4 h-4 bg-gray-300 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-gray-300 rounded-full"></div>
          
          {/* Center loading indicator */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin mb-2 mx-auto"></div>
              <p className="text-gray-500 text-sm">Loading map...</p>
            </div>
          </div>
        </div>
        
        {/* Bottom legend area */}
        <div className="mt-4 flex items-center justify-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-200 rounded-full mr-2"></div>
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default MapLoadingVisual;