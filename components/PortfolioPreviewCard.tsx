import React from 'react';
import Image from 'next/image';
import { Calendar, MapPin } from 'lucide-react';

// Interface for the portfolio item data structure
interface PortfolioItem {
  id: string;
  title: string;
  thumbnail: string;
  location: string;
  completionDate: string;
  projectType: string;
  description: string;
}

// Props interface for the component
interface PortfolioPreviewCardProps {
  item: PortfolioItem;
  onClick: (item: PortfolioItem) => void;
}

const PortfolioPreviewCard: React.FC<PortfolioPreviewCardProps> = ({ item, onClick }) => {
  // Format the completion date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
      onClick={() => onClick(item)}
    >
      {/* Thumbnail Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Project Type Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
            {item.projectType}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Project Title */}
        <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
          {item.title}
        </h3>

        {/* Short Description */}
        <p className="text-slate-600 text-sm mb-3 line-clamp-2">
          {item.description}
        </p>

        {/* Project Details */}
        <div className="space-y-2">
          {/* Location */}
          <div className="flex items-center text-slate-500 text-sm">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{item.location}</span>
          </div>

          {/* Completion Date */}
          <div className="flex items-center text-slate-500 text-sm">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>Completed {formatDate(item.completionDate)}</span>
          </div>
        </div>

        {/* Click Indicator */}
        <div className="mt-3 pt-3 border-t border-slate-100">
          <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700">
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPreviewCard;