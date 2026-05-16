import mongoose from 'mongoose';
import { LEAD_STATUS } from '../constants/leadStatus';
import { LEAD_SOURCES } from '../constants/leadSources';

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(LEAD_STATUS),
      default: LEAD_STATUS.NEW,
      required: true,
    },
    source: {
      type: String,
      enum: Object.values(LEAD_SOURCES),
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

// Indexes for searching and filtering
leadSchema.index({ name: 'text', email: 'text' });
leadSchema.index({ status: 1 });
leadSchema.index({ source: 1 });
leadSchema.index({ createdAt: -1 });

export const Lead = mongoose.model('Lead', leadSchema);
