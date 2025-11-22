import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    prompt: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      required: true,
      enum: ['twitter', 'linkedin', 'instagram', 'facebook'],
    },
    tone: {
      type: String,
      required: true,
      enum: ['professional', 'casual', 'funny', 'engaging', 'inspiring'],
    },
    content: {
      type: String,
      required: true,
    },
    characterCount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Post', postSchema);

