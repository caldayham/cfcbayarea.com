  import { Schema, model, models, Document } from 'mongoose';

  // Interface for the lead document
  export interface ILead extends Document {
    isNearPaloAlto: boolean;
    name: string;
    projectDescription: string;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
  }

  // Mongoose schema for a lead
  const LeadSchema = new Schema<ILead>({
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
    }
  }, {
    timestamps: true // Automatically adds createdAt and updatedAt
  });

  // Index for efficient querying
  LeadSchema.index({ isNearPaloAlto: 1, createdAt: -1 });
  LeadSchema.index({ phoneNumber: 1 }, { unique: true }); // Prevent duplicate phone numbers

  // Static methods for the model
  LeadSchema.statics.findNearPaloAlto = function() {
    return this.find({ isNearPaloAlto: true }).sort({ createdAt: -1 });
  };

  LeadSchema.statics.findByPhoneNumber = function(phoneNumber: string) {
    return this.findOne({ phoneNumber });
  };

  // Instance methods
  LeadSchema.methods.isComplete = function() {
    return !!(this.address && this.email);
  };

  // Create and export the model
  // Use existing model if it exists (prevents OverwriteModelError in development)
  const LeadModel = models.Lead || model<ILead>('Lead', LeadSchema);

  export default LeadModel;

  // Type for creating a new lead (without MongoDB-specific fields)
  export interface CreateLeadInput {
    isNearPaloAlto: boolean;
    name: string;
    projectDescription: string;
    phoneNumber: string;
  }

  // Type for updating a lead (all fields optional except id)
  export interface UpdateLeadInput {
    isNearPaloAlto?: boolean;
    name?: string;
    projectDescription?: string;
    phoneNumber?: string;
  }