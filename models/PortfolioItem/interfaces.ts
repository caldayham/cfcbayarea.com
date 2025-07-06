import { Document, Model, Query } from 'mongoose';

// ============ CONTENT BLOCK INTERFACES ============

/**
 * Content block types for flexible portfolio layouts
 * Each block represents a different type of content section
 */
export interface ContentBlock {
  id: string;
  type: 'text' | 'image' | 'gallery' | 'quote' | 'beforeAfter' | 'timeline' | 'callout' | 'video';
  content: any; // Content varies by block type - see specific interfaces below
  order: number;
  title?: string; // Optional section title
}

// Specific content block interfaces for type safety
export interface TextBlockContent {
  text: string;
  size?: 'small' | 'medium' | 'large';
}

export interface ImageBlockContent {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface GalleryBlockContent {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  layout?: 'grid' | 'carousel' | 'masonry';
}

export interface QuoteBlockContent {
  text: string;
  author: string;
  role?: string;
  avatar?: string;
}

export interface BeforeAfterBlockContent {
  before: {
    src: string;
    alt: string;
    caption?: string;
  };
  after: {
    src: string;
    alt: string;
    caption?: string;
  };
}

export interface CalloutBlockContent {
  title: string;
  description?: string;
  buttonText: string;
  buttonLink: string;
  style?: 'primary' | 'secondary' | 'accent';
}

// ============ MAIN PORTFOLIO INTERFACES ============

/**
 * Main Portfolio Item interface (what comes OUT of the database)
 * Extends Document to get MongoDB methods like .save(), .remove()
 * Includes custom instance methods for type safety
 */
export interface IPortfolioItem extends Document {
  // Basic Info
  title: string;
  slug: string;
  thumbnail: string;
  
  // Location & Project Details  
  city: string;
  location: [number, number];
  completionDate: Date;
  projectType: string;
  description: string;
  
  // Customer Feedback
  review?: string;
  reviewerName?: string;
  reviewerRole?: string;
  rating?: number;
  
  // Content (Flexible blocks for detail page)
  contentBlocks: ContentBlock[];
  
  // SEO & Metadata
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  ogImage?: string;
  
  // Organization
  tags: string[];
  featured: boolean;
  published: boolean;
  
  // Auto-generated timestamps
  createdAt: Date;
  updatedAt: Date;

  // ============ CUSTOM INSTANCE METHODS ============
  hasReview(): boolean;
  getPrimaryImage(): string;
  generateSlug(): string;
}

/**
 * Portfolio Item Model interface that includes static methods
 * This ensures TypeScript knows about our custom static methods
 */
export interface IPortfolioItemModel extends Model<IPortfolioItem> {
  findPublished(): Query<IPortfolioItem[], IPortfolioItem>;
  findFeatured(): Query<IPortfolioItem[], IPortfolioItem>;
  findByProjectType(projectType: string): Query<IPortfolioItem[], IPortfolioItem>;
  search(searchTerm: string): Query<IPortfolioItem[], IPortfolioItem>;
}

// ============ INPUT/OUTPUT TYPES ============

/**
 * Type for creating new portfolio items (excludes auto-generated fields)
 */
export interface CreatePortfolioItemInput {
  title: string;
  slug?: string;
  thumbnail: string;
  city: string;
  location: [number, number];
  completionDate: Date;
  projectType: string;
  description: string;
  review?: string;
  reviewerName?: string;
  reviewerRole?: string;
  rating?: number;
  contentBlocks?: ContentBlock[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords?: string[];
  ogImage?: string;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
}

/**
 * Type for updating portfolio items (all fields optional)
 */
export interface UpdatePortfolioItemInput {
  title?: string;
  thumbnail?: string;
  city?: string;
  location?: [number, number];
  completionDate?: Date;
  projectType?: string;
  description?: string;
  review?: string;
  reviewerName?: string;
  reviewerRole?: string;
  rating?: number;
  contentBlocks?: ContentBlock[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  ogImage?: string;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
}