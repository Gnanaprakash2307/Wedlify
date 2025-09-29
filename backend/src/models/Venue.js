import mongoose from 'mongoose';

const VenueSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
    photos: [{ type: String }],
    description: { type: String },
    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Venue', VenueSchema);


