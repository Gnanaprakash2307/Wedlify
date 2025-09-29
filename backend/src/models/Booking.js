import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema(
  {
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    serviceType: { type: String, enum: ['server', 'venue', 'chef'], required: true },
    serviceRef: { type: mongoose.Schema.Types.ObjectId, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    amount: { type: Number, default: 0 },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
    paymentStatus: { type: String, enum: ['unpaid', 'paid', 'refunded'], default: 'unpaid' },
  },
  { timestamps: true }
);

export default mongoose.model('Booking', BookingSchema);


