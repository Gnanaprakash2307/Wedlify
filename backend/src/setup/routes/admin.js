import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import ServerProfile from '../../models/ServerProfile.js';
import Venue from '../../models/Venue.js';
import Chef from '../../models/Chef.js';

const router = Router();

router.use(requireAuth, requireRole('admin'));

// Verify a student server
router.post('/servers/:id/verify', async (req, res) => {
  const server = await ServerProfile.findById(req.params.id);
  if (!server) return res.status(404).json({ message: 'Not found' });
  server.verified = true;
  await server.save();
  res.json(server);
});

// Manage listings (CRUD-lite)
router.post('/venues', async (req, res) => {
  const venue = await Venue.create(req.body);
  res.status(201).json(venue);
});

router.post('/chefs', async (req, res) => {
  const chef = await Chef.create(req.body);
  res.status(201).json(chef);
});

export default router;


