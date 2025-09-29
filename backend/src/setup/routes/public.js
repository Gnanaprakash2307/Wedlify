import { Router } from 'express';
import ServerProfile from '../../models/ServerProfile.js';
import Venue from '../../models/Venue.js';
import Chef from '../../models/Chef.js';

const router = Router();

// Servers: filter by availability and location
router.get('/servers', async (req, res) => {
  const { location, availability } = req.query;
  const filter = {};
  if (location) filter.location = { $regex: new RegExp(location, 'i') };
  if (availability) filter.availability = { $in: availability.split(',') };
  filter.verified = true;
  const servers = await ServerProfile.find(filter).populate('user', 'name');
  res.json(servers);
});

// Venues (Mahals)
router.get('/venues', async (_req, res) => {
  const venues = await Venue.find();
  res.json(venues);
});

router.get('/venues/:id', async (req, res) => {
  const venue = await Venue.findById(req.params.id);
  if (!venue) return res.status(404).json({ message: 'Not found' });
  res.json(venue);
});

// Chefs
router.get('/chefs', async (_req, res) => {
  const chefs = await Chef.find().populate('user', 'name');
  res.json(chefs);
});

export default router;


