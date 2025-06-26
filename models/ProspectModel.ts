import { Schema, model, models, Document } from 'mongoose';

// Interface for the Prospect document
export interface IProspect extends Document {
  isNearPaloAlto: boolean;
  name: string;
  projectDescription: string;
  additionalNotes?: string;
  phoneNumber: string;
  address?: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema for Prospect
const ProspectSchema = new Schema<IProspect>({
  isNearPaloAlto: {
    type: Boolean,
    required: true,
    default: false
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  projectDescription: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  additionalNotes: {
    type: String,
    trim: true,
    maxlength: 500
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(v: string) {
        // Basic phone number validation - allows various formats
        return /^[\+]?[1-9][\d]{0,15}$/.test(v.replace(/[\s\-\(\)\.]/g, ''));
      },
      message: 'Please enter a valid phone number'
    }
  },
  address: {
    type: String,
    trim: true,
    maxlength: 200
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v: string) {
        // Email validation - only validate if provided
        return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Please enter a valid email address'
    }
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Index for efficient querying
ProspectSchema.index({ isNearPaloAlto: 1, createdAt: -1 });
ProspectSchema.index({ phoneNumber: 1 }, { unique: true }); // Prevent duplicate phone numbers

// Static methods for the model
ProspectSchema.statics.findNearPaloAlto = function() {
  return this.find({ isNearPaloAlto: true }).sort({ createdAt: -1 });
};

ProspectSchema.statics.findByPhoneNumber = function(phoneNumber: string) {
  return this.findOne({ phoneNumber });
};

// Instance methods
ProspectSchema.methods.isComplete = function() {
  return !!(this.address && this.email);
};

// Create and export the model
// Use existing model if it exists (prevents OverwriteModelError in development)
const ProspectModel = models.Prospect || model<IProspect>('Prospect', ProspectSchema);

export default ProspectModel;

// Type for creating a new prospect (without MongoDB-specific fields)
export interface CreateProspectInput {
  isNearPaloAlto: boolean;
  name: string;
  projectDescription: string;
  additionalNotes?: string;
  phoneNumber: string;
  address?: string;
  email?: string;
}

// Type for updating a prospect (all fields optional except id)
export interface UpdateProspectInput {
  isNearPaloAlto?: boolean;
  name?: string;
  projectDescription?: string;
  additionalNotes?: string;
  phoneNumber?: string;
  address?: string;
  email?: string;
}