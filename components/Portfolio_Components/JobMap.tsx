'use client';

import React, { useEffect, useRef } from 'react';

const JobMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  // Sample job locations around Palo Alto Bay Area
  const jobLocations = [
    { id: 1, lat: 37.4419, lng: -122.1430, title: "Palo Alto Deck Project" },
    { id: 2, lat: 37.4636, lng: -122.1219, title: "Menlo Park Fence Installation" },
    { id: 3, lat: 37.4088, lng: -122.1078, title: "Mountain View Pergola" },
    { id: 4, lat: 37.3861, lng: -122.0839, title: "Sunnyvale Outdoor Kitchen" },
    { id: 5, lat: 37.4774, lng: -122.1586, title: "Redwood City Gazebo" },
    { id: 6, lat: 37.4529, lng: -122.1817, title: "Atherton Custom Structure" },
    { id: 7, lat: 37.3688, lng: -122.0363, title: "Santa Clara Patio" },
    { id: 8, lat: 37.4852, lng: -122.2364, title: "San Carlos Retaining Wall" }
  ];

  useEffect(() => {
    // Only initialize if we haven't already and the ref exists
    if (!mapInstanceRef.current && mapRef.current) {
      // Dynamically import Leaflet to avoid SSR issues
      import('leaflet').then((L) => {
        // Initialize map centered on Palo Alto
        const map = L.map(mapRef.current!).setView([37.4419, -122.1430], 11);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Custom crimson marker icon
        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="
            width: 20px; 
            height: 20px; 
            background-color: #dc143c; 
            border: 2px solid white; 
            border-radius: 50%; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          "></div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });

        // Add markers for each job location
        jobLocations.forEach(location => {
          L.marker([location.lat, location.lng], { icon: customIcon })
            .addTo(map)
            .bindPopup(`<strong>${location.title}</strong>`);
        });

        mapInstanceRef.current = map;
      });
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto pt-10">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        
        <div className="relative">
          {/* Map container */}
          <div 
            ref={mapRef} 
            className="w-full h-96"
            style={{ minHeight: '400px' }}
          />
          
          {/* Loading overlay */}
          <div className="absolute inset-0 bg-gray flex items-center justify-center pointer-events-none opacity-0" id="map-loading">
            <div className="text-center">
              <div className="text-2xl mb-2">🗺️</div>
              <p className="text-muted">Loading map...</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gray border-t border-default">
          <div className="flex items-center justify-center space-x-4 text-sm text-secondary">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-accent rounded-full mr-2"></div>
              <span>Project Location</span>
            </div>
            <span>•</span>
            <span>Serving the Greater Bay Area</span>
            <span>•</span>
            <span className="text-xs text-muted">Map data © OpenStreetMap</span>
          </div>
        </div>
      </div>

      {/* Leaflet CSS - Load dynamically */}
      <link 
        rel="stylesheet" 
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      <script 
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossOrigin=""
      />
    </div>
  );
};

export default JobMap;