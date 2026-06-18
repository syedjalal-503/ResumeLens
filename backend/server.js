const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resume');
const contactRoutes = require('./routes/contact');
const analysisRoutes = require('./routes/analysis');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: [
      "https://resume-lens-taupe.vercel.app/",
      "http://localhost:3000",
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/analysis', analysisRoutes);

// Health check
app.get('/', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatusMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  res.json({
    message: 'ResumeLens API is running!',
    database: dbStatusMap[dbState] || 'unknown',
  });
});

// Start server immediately
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

// Connect to MongoDB in the background
console.log('⏳ Connecting to MongoDB...');
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('💡 Please check your MONGO_URI in .env or network/IP whitelist configuration.');
  });