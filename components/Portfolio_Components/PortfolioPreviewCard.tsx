import React from 'react';
import Image from 'next/image';
import { Calendar, MapPin } from 'lucide-react';

/* ---------- Types ---------- */
export interface PortfolioItem {
  id: string;
  title: string;
  thumbnail: string;
  location: string;
  completionDate: string;
  projectType: string;
  description: string;
}

interface Props {
  item: PortfolioItem;
  onClick: (i: PortfolioItem) => void;
}

/* ---------- Component ---------- */
const PortfolioPreviewCard: React.FC<Props> = ({ item, onClick }) => {
  const formatDate = (ts: string) =>
    new Date(ts).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  return (
    <article
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group border border-default"
      onClick={() => onClick(item)}
    >
      {/* --- Thumbnail --- */}
      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          priority
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
        />

        {/* --- Badge --- */}
        <span className="absolute top-3 right-3 bg-accent text-white text-[10px] font-semibold leading-none px-2 py-[3px] rounded-sm shadow-sm">
          {item.projectType}
        </span>
      </div>

      {/* --- Body --- */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 group-hover:text-accent transition-colors">
          {item.title}
        </h3>

        <p className="text-secondary text-sm mb-3 line-clamp-2">{item.description}</p>

        <div className="space-y-1 text-muted text-sm">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 shrink-0" />
            {item.location}
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 shrink-0" />
            Completed {formatDate(item.completionDate)}
          </div>
        </div>

        <div className="pt-3 mt-4 border-t border-default">
          <span className="text-accent text-sm font-medium group-hover:opacity-80">
            View Details →
          </span>
        </div>
      </div>
    </article>
  );
};

export default PortfolioPreviewCard;
