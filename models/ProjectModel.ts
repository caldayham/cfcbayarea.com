import { Schema, model, models, Document } from 'mongoose';

// Enum for project tags
export enum ProjectTag {
  CARPENTRY = 'carpentry',
  WELDING = 'welding',
  HARDSCAPE = 'hardscape',
  CUSTOM_DESIGN = 'custom_design',
  PAINTING = 'painting',
  DEMOLITION = 'demolition',
  DECK_BUILDING = 'deck_building',
  FENCE_INSTALLATION = 'fence_installation',
  MASONRY = 'masonry',
  LANDSCAPING = 'landscaping',
}

// Interface for project images
export interface ProjectImage {
  url: string;
  altText?: string;
  caption?: string;
  order: number; // For ordering images from 1st to last
}

// Interface for project text sections
export interface ProjectTextSection {
  title: string;
  content: string;
  order: number; // For ordering sections
}

// Interface for client review
export interface ClientReview {
  rating: number; // 1-5 stars
  reviewText: string;
  reviewDate: Date;
  isVerified?: boolean;
}

// Interface for the Project document
export interface IProject extends Document {
  title: string;
  dateCompleted: Date;
  clientReview?: ClientReview;
  clientName?: string; // Optional for client privacy
  images: ProjectImage[];
  textSections: ProjectTextSection[];
  thumbnailImage: string; // URL to thumbnail
  tags: ProjectTag[];
  isPublished: boolean;
  location?: string; // General location (e.g., "Palo Alto, CA")
  projectDuration?: number; // Duration in days
  estimatedCost?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Schema for project images
const ProjectImageSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  altText: {
    type: String,
    trim: true
  },
  caption: {
    type: String,
    trim: true,
    maxlength: 200
  },
  order: {
    type: Number,
    required: true,
    min: 1
  }
}, { _id: false });

// Schema for project text sections
const ProjectTextSectionSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  order: {
    type: Number,
    required: true,
    min: 1
  }
}, { _id: false });

// Schema for client review
const ClientReviewSchema = new Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  reviewText: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  reviewDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, { _id: false });

// Main Project schema
const ProjectSchema = new Schema<IProject>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 150
  },
  dateCompleted: {
    type: Date,
    required: true
  },
  clientReview: {
    type: ClientReviewSchema,
    required: false
  },
  clientName: {
    type: String,
    trim: true,
    maxlength: 100
  },
  images: {
    type: [ProjectImageSchema],
    required: true,
    validate: {
      validator: function(images: ProjectImage[]) {
        return images.length > 0;
      },
      message: 'At least one image is required'
    }
  },
  textSections: {
    type: [ProjectTextSectionSchema],
    required: true,
    validate: {
      validator: function(sections: ProjectTextSection[]) {
        return sections.length > 0;
      },
      message: 'At least one text section is required'
    }
  },
  thumbnailImage: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true,
    enum: Object.values(ProjectTag),
    validate: {
      validator: function(tags: string[]) {
        return tags.length > 0;
      },
      message: 'At least one tag is required'
    }
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  location: {
    type: String,
    trim: true,
    maxlength: 100
  },
  projectDuration: {
    type: Number,
    min: 1
  },
  estimatedCost: {
    type: Number,
    min: 0
  }
}, {
  timestamps: true
});

// Indexes for efficient querying
ProjectSchema.index({ isPublished: 1, dateCompleted: -1 });
ProjectSchema.index({ tags: 1 });
ProjectSchema.index({ 'clientReview.rating': -1 });
ProjectSchema.index({ createdAt: -1 });

// Virtual for formatted date
ProjectSchema.virtual('formattedCompletionDate').get(function() {
  return this.dateCompleted.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Static methods
ProjectSchema.statics.findPublished = function() {
  return this.find({ isPublished: true }).sort({ dateCompleted: -1 });
};

ProjectSchema.statics.findByTag = function(tag: ProjectTag) {
  return this.find({ tags: tag, isPublished: true }).sort({ dateCompleted: -1 });
};

ProjectSchema.statics.findFeatured = function() {
  return this.find({ 
    isPublished: true,
    'clientReview.rating': { $gte: 4 }
  }).sort({ 'clientReview.rating': -1, dateCompleted: -1 }).limit(6);
};

// Instance methods
ProjectSchema.methods.getOrderedImages = function() {
  return this.images.sort((a: ProjectImage, b: ProjectImage) => a.order - b.order);
};

ProjectSchema.methods.getOrderedTextSections = function() {
  return this.textSections.sort((a: ProjectTextSection, b: ProjectTextSection) => a.order - b.order);
};

ProjectSchema.methods.hasReview = function() {
  return !!(this.clientReview && this.clientReview.reviewText);
};

ProjectSchema.methods.getAverageRating = function() {
  return this.clientReview ? this.clientReview.rating : null;
};

// Pre-save middleware to ensure image and section orders are sequential
ProjectSchema.pre('save', function() {
  // Sort and reorder images
  this.images.sort((a, b) => a.order - b.order);
  this.images.forEach((img, index) => {
    img.order = index + 1;
  });

  // Sort and reorder text sections
  this.textSections.sort((a, b) => a.order - b.order);
  this.textSections.forEach((section, index) => {
    section.order = index + 1;
  });
});

// Create and export the model
const ProjectModel = models.Project || model<IProject>('Project', ProjectSchema);

export default ProjectModel;

// Types for creating and updating projects
export interface CreateProjectInput {
  title: string;
  dateCompleted: Date;
  clientReview?: Omit<ClientReview, 'reviewDate'>;
  clientName?: string;
  images: Omit<ProjectImage, 'order'>[];
  textSections: Omit<ProjectTextSection, 'order'>[];
  thumbnailImage: string;
  tags: ProjectTag[];
  isPublished?: boolean;
  location?: string;
  projectDuration?: number;
  estimatedCost?: number;
}

export interface UpdateProjectInput {
  title?: string;
  dateCompleted?: Date;
  clientReview?: Omit<ClientReview, 'reviewDate'>;
  clientName?: string;
  images?: Omit<ProjectImage, 'order'>[];
  textSections?: Omit<ProjectTextSection, 'order'>[];
  thumbnailImage?: string;
  tags?: ProjectTag[];
  isPublished?: boolean;
  location?: string;
  projectDuration?: number;
  estimatedCost?: number;
}