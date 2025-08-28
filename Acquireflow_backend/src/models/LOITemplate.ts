import mongoose, { Document, Schema } from 'mongoose';

export interface ILOITemplate extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  content: string;
  icon: string; // Store icon name/identifier
  isCustom: boolean;
  isDefault: boolean;
  category?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const LOITemplateSchema = new Schema<ILOITemplate>({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    required: true, 
    trim: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  icon: { 
    type: String, 
    default: 'FileText' 
  },
  isCustom: { 
    type: Boolean, 
    default: true 
  },
  isDefault: { 
    type: Boolean, 
    default: false 
  },
  category: { 
    type: String, 
    enum: ['cash-offer', 'subject-to', 'seller-financing', 'hybrid', 'custom'],
    default: 'custom'
  },
  tags: [{ 
    type: String, 
    trim: true 
  }],
}, { 
  timestamps: true 
});

// Index for efficient queries
LOITemplateSchema.index({ userId: 1, isCustom: 1 });
LOITemplateSchema.index({ userId: 1, category: 1 });
LOITemplateSchema.index({ isDefault: 1 });

export const LOITemplate = mongoose.model<ILOITemplate>('LOITemplate', LOITemplateSchema);
