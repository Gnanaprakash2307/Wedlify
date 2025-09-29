import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
  },
  { _id: false }
);

const ChefSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    cuisine: { type: String },
    location: { type: String, required: true },
    packages: [
      {
        name: String,
        pricePerPerson: Number,
        items: [MenuItemSchema],
      },
    ],
    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Chef', ChefSchema);


