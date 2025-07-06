import { Schema, model, models, Document, Model, Query } from 'mongoose';

// ============ INTERFACES (TypeScript Types) ============

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

/**
 * Main Portfolio Item interface (what comes OUT of the database)
 * Extends Document to get MongoDB methods like .save(), .remove()
 * Includes custom instance methods for type safety
 */
export interface IPortfolioItem extends Document {
  // Basic Info
  title: string;
  slug: string; // URL-friendly version of title
  thumbnail: string; // Main preview image
  
  // Location & Project Details  
  city: string;
  location: [number, number]; // [latitude, longitude] for map
  completionDate: Date;
  projectType: string;
  description: string; // Short summary for cards/previews
  
  // Customer Feedback
  review?: string;
  reviewerName?: string;
  reviewerRole?: string;
  rating?: number; // 1-5 stars
  
  // Content (Flexible blocks for detail page)
  contentBlocks: ContentBlock[];
  
  // SEO & Metadata
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  ogImage?: string; // Open Graph image for social sharing
  
  // Organization
  tags: string[];
  featured: boolean; // Show prominently on homepage?
  published: boolean; // Is this live on the website?
  
  // Auto-generated timestamps
  createdAt: Date;
  updatedAt: Date;

  // ============ CUSTOM INSTANCE METHODS ============
  /**
   * Check if portfolio item has customer review
   */
  hasReview(): boolean;

  /**
   * Get the primary image for this portfolio item
   */
  getPrimaryImage(): string;

  /**
   * Generate URL-safe slug from title
   */
  generateSlug(): string;
}

// ============ MODEL INTERFACE (for static methods) ============

/**
 * Portfolio Item Model interface that includes static methods
 * This ensures TypeScript knows about our custom static methods
 */
export interface IPortfolioItemModel extends Model<IPortfolioItem> {
  /**
   * Find all published portfolio items, newest first
   */
  findPublished(): Query<IPortfolioItem[], IPortfolioItem>;

  /**
   * Find featured portfolio items for homepage
   */
  findFeatured(): Query<IPortfolioItem[], IPortfolioItem>;

  /**
   * Find portfolio items by project type
   */
  findByProjectType(projectType: string): Query<IPortfolioItem[], IPortfolioItem>;

  /**
   * Search portfolio items by text
   */
  search(searchTerm: string): Query<IPortfolioItem[], IPortfolioItem>;
}

// ============ MONGOOSE SCHEMA (Database Structure) ============

/**
 * Content Block Schema - embedded in Portfolio Items
 */
const ContentBlockSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['text', 'image', 'gallery', 'quote', 'beforeAfter', 'timeline', 'callout', 'video']
  },
  content: {
    type: Schema.Types.Mixed, // Flexible - can store any structure
    required: true
  },
  order: {
    type: Number,
    required: true,
    min: 0
  },
  title: {
    type: String,
    trim: true,
    maxlength: 200
  }
}, { _id: false }); // Don't create separate _id for each block

/**
 * Main Portfolio Item Schema
 */
const PortfolioItemSchema = new Schema<IPortfolioItem>({
  // Basic Info
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v: string) {
        // URL-safe slug validation
        return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v);
      },
      message: 'Slug must be URL-safe (lowercase, hyphens only)'
    }
  },
  thumbnail: {
    type: String,
    required: true,
    trim: true
  },
  
  // Location & Project Details
  city: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  location: {
    type: [Number], // [latitude, longitude]
    required: true,
    validate: {
      validator: function(v: number[]) {
        return v.length === 2 && 
               v[0] >= -90 && v[0] <= 90 &&    // Valid latitude
               v[1] >= -180 && v[1] <= 180;    // Valid longitude
      },
      message: 'Location must be [latitude, longitude] with valid coordinates'
    }
  },
  completionDate: {
    type: Date,
    required: true
  },
  projectType: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  
  // Customer Feedback
  review: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  reviewerName: {
    type: String,
    trim: true,
    maxlength: 100
  },
  reviewerRole: {
    type: String,
    trim: true,
    maxlength: 100
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: 'Rating must be a whole number between 1 and 5'
    }
  },
  
  // Flexible Content
  contentBlocks: {
    type: [ContentBlockSchema],
    default: []
  },
  
  // SEO & Metadata
  seoTitle: {
    type: String,
    required: true,
    trim: true,
    maxlength: 60 // Google's title length limit
  },
  seoDescription: {
    type: String,
    required: true,
    trim: true,
    maxlength: 160 // Google's description length limit
  },
  seoKeywords: [{
    type: String,
    trim: true,
    maxlength: 50
  }],
  ogImage: {
    type: String,
    trim: true
  },
  
  // Organization
  tags: [{
    type: String,
    trim: true,
    maxlength: 30
  }],
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // Auto-adds createdAt and updatedAt
});

// ============ INDEXES (Database Performance) ============

// Compound index for efficient querying
PortfolioItemSchema.index({ published: 1, featured: -1, completionDate: -1 });
PortfolioItemSchema.index({ slug: 1 }); // Fast slug lookups
PortfolioItemSchema.index({ city: 1, projectType: 1 }); // Filter by location and type
PortfolioItemSchema.index({ tags: 1 }); // Tag-based filtering

// Text search index for portfolio search functionality
PortfolioItemSchema.index({
  title: 'text',
  description: 'text',
  tags: 'text',
  seoKeywords: 'text'
});

// ============ STATIC METHODS (Class-level functions) ============

/**
 * Find all published portfolio items, newest first
 */
PortfolioItemSchema.statics.findPublished = function() {
  return this.find({ published: true })
    .sort({ completionDate: -1 });
};

/**
 * Find featured portfolio items for homepage
 */
PortfolioItemSchema.statics.findFeatured = function() {
  return this.find({ published: true, featured: true })
    .sort({ completionDate: -1 });
};

/**
 * Find portfolio items by project type
 */
PortfolioItemSchema.statics.findByProjectType = function(projectType: string) {
  return this.find({ published: true, projectType })
    .sort({ completionDate: -1 });
};

/**
 * Search portfolio items by text
 */
PortfolioItemSchema.statics.search = function(searchTerm: string) {
  return this.find(
    { 
      published: true,
      $text: { $search: searchTerm }
    },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });
};

// ============ INSTANCE METHODS (Object-level functions) ============

/**
 * Check if portfolio item has customer review
 */
PortfolioItemSchema.methods.hasReview = function() {
  return !!(this.review && this.reviewerName);
};

/**
 * Get the primary image for this portfolio item
 */
PortfolioItemSchema.methods.getPrimaryImage = function() {
  return this.ogImage || this.thumbnail;
};

/**
 * Generate URL-safe slug from title
 */
PortfolioItemSchema.methods.generateSlug = function() {
  return this.title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')         // Replace spaces with hyphens
    .replace(/-+/g, '-');         // Remove duplicate hyphens
};

// Auto-generate slug before saving if not provided
PortfolioItemSchema.pre('save', function(next) {
  if (!this.slug && this.title) {
    this.slug = this.generateSlug();
  }
  next();
});

// ============ MODEL EXPORT ============

/**
 * Portfolio Item Model - use this for all database operations
 * Prevents OverwriteModelError in development
 * Properly typed with both instance and static methods
 */
const PortfolioItemModel = (models.PortfolioItem || model<IPortfolioItem>('PortfolioItem', PortfolioItemSchema)) as IPortfolioItemModel;

export default PortfolioItemModel;

// ============ INPUT TYPES (for API endpoints) ============

/**
 * Type for creating new portfolio items (excludes auto-generated fields)
 */
export interface CreatePortfolioItemInput {
  title: string;
  slug?: string; // Optional - will auto-generate if not provided
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
 * Type for updating portfolio items (all fields optional except slug for identification)
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