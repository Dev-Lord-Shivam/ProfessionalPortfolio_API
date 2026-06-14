import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary'
import { seedDatabase } from './utils/seed.js';
import { setupSwagger } from './utils/swagger.js';
import authRoutes from './routes/authRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfoliopro';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// ── Global Middleware ─────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ── Swagger UI  (available at /api-docs) ─────────────────────────────────────
setupSwagger(app);

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);       // Public  : login → returns JWT
app.use('/api/portfolio', portfolioRoutes);  // GET: public  |  POST: protected
app.use('/api/analytics', analyticsRoutes);  // GET: protected  |  POST /increment: public

// ── Database Connection ───────────────────────────────────────────────────────
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully!');
    seedDatabase();
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    console.warn('⚠️  Running without database. Check your MONGODB_URI in .env');
  });

// ── Start Server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📖 API Docs at http://localhost:${PORT}/api-docs`);
});

export default app; // Required for Vercel