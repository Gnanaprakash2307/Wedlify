import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectToDatabase } from './setup/db.js';
import authRouter from './setup/routes/auth.js';
import publicRouter from './setup/routes/public.js';
import bookingRouter from './setup/routes/booking.js';
import adminRouter from './setup/routes/admin.js';

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'wedlify-api' });
});

app.use('/api/auth', authRouter);
app.use('/api/public', publicRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/admin', adminRouter);

const port = process.env.PORT || 4000;

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`API listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Failed to connect to database', error);
    process.exit(1);
  });


