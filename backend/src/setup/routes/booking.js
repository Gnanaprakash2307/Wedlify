import { Router } from 'express';
import Booking from '../../models/Booking.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

// Create booking (organizer)
router.post('/', requireAuth, requireRole('organizer'), async (req, res) => {
  const { serviceType, serviceRef, date, time, quantity, amount } = req.body;
  if (!serviceType || !serviceRef || !date || !time) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  const booking = await Booking.create({
    organizer: req.user.id,
    serviceType,
    serviceRef,
    date,
    time,
    quantity: quantity || 1,
    amount: amount || 0,
  });
  res.status(201).json(booking);
});

// My bookings (organizer)
router.get('/me', requireAuth, requireRole('organizer'), async (req, res) => {
  const bookings = await Booking.find({ organizer: req.user.id }).sort({ createdAt: -1 });
  res.json(bookings);
});

// Update booking status (mock payment confirm)
router.post('/:id/pay', requireAuth, requireRole('organizer'), async (req, res) => {
  const booking = await Booking.findOne({ _id: req.params.id, organizer: req.user.id });
  if (!booking) return res.status(404).json({ message: 'Not found' });
  booking.paymentStatus = 'paid';
  booking.status = 'confirmed';
  await booking.save();
  res.json(booking);
});

export default router;


