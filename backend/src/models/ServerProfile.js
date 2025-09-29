import mongoose from 'mongoose';

const ServerProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    location: { type: String, required: true },
    availability: [{ type: String }],
    hourlyRate: { type: Number, required: true },
    verified: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('ServerProfile', ServerProfileSchema);


