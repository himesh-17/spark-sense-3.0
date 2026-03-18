require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./src/config/db');
const errorHandler = require('./src/middleware/errorHandler');

// Route imports
const readingsRouter = require('./src/routes/readings');
const analyticsRouter = require('./src/routes/analytics');
const predictionsRouter = require('./src/routes/predictions');

const app = express();

// ─── Database ───────────────────────────────────────────────────────────────
connectDB();

// ─── Core Middleware ─────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/readings', readingsRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/predictions', predictionsRouter);

// ─── Health Check ────────────────────────────────────────────────────────────
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// ─── 404 Handler ────────────────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ─── Global Error Handler (must be last) ────────────────────────────────────
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Spark Sense API running on http://localhost:${PORT}`);
});

module.exports = app;
