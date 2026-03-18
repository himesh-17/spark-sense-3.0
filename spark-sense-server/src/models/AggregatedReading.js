const mongoose = require('mongoose');

const aggregatedReadingSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['hourly', 'daily'],
        required: true,
    },
    deviceId: { type: String, default: 'ESP32-001' },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    avg_power: { type: Number, required: true },
    max_power: { type: Number, required: true },
    total_energy: { type: Number, required: true },
    reading_count: { type: Number, default: 0 },
});

// Index covers type-scoped time-range queries (Charts: last 24h hourly, last 30d daily)
aggregatedReadingSchema.index({ type: 1, startTime: -1 });
aggregatedReadingSchema.index({ type: 1, deviceId: 1, startTime: -1 });

module.exports = mongoose.model('AggregatedReading', aggregatedReadingSchema);
