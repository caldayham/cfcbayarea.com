import { Schema } from 'mongoose';
import type { IPortfolioItem } from './interfaces';

// ============ CONTENT BLOCK SCHEMA ============

/**
 * Content Block Schema - embedded in Portfolio Items
 */
export const ContentBlockSchema = new Schema({
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

// ============ MAIN PORTFOLIO SCHEMA ============

/**
 * Main Portfolio Item Schema
 */
export const PortfolioItemSchema = new Schema<IPortfolioItem>({
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
    type: [Number],
    required: true,
    validate: {
      validator: function(v: number[]) {
        return v.length === 2 && 
               v[0] >= -90 && v[0] <= 90 &&
               v[1] >= -180 && v[1] <= 180;
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
    maxlength: 60
  },
  seoDescription: {
    type: String,
    required: true,
    trim: true,
    maxlength: 160
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
  timestamps: true
});

// ============ INDEXES ============

PortfolioItemSchema.index({ published: 1, featured: -1, completionDate: -1 });
PortfolioItemSchema.index({ slug: 1 });
PortfolioItemSchema.index({ city: 1, projectType: 1 });
PortfolioItemSchema.index({ tags: 1 });

PortfolioItemSchema.index({
  title: 'text',
  description: 'text',
  tags: 'text',
  seoKeywords: 'text'
});

// ============ STATIC METHODS ============

PortfolioItemSchema.statics.findPublished = function() {
  return this.find({ published: true }).sort({ completionDate: -1 });
};

PortfolioItemSchema.statics.findFeatured = function() {
  return this.find({ published: true, featured: true }).sort({ completionDate: -1 });
};

PortfolioItemSchema.statics.findByProjectType = function(projectType: string) {
  return this.find({ published: true, projectType }).sort({ completionDate: -1 });
};

PortfolioItemSchema.statics.search = function(searchTerm: string) {
  return this.find(
    { 
      published: true,
      $text: { $search: searchTerm }
    },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });
};

// ============ INSTANCE METHODS ============

PortfolioItemSchema.methods.hasReview = function() {
  return !!(this.review && this.reviewerName);
};

PortfolioItemSchema.methods.getPrimaryImage = function() {
  return this.ogImage || this.thumbnail;
};

PortfolioItemSchema.methods.generateSlug = function() {
  return this.title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

// ============ MIDDLEWARE ============

PortfolioItemSchema.pre('save', function(next) {
  if (!this.slug && this.title) {
    this.slug = this.generateSlug();
  }
  next();
});