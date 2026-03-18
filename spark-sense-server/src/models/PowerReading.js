const mongoose = require('mongoose');

const powerReadingSchema = new mongoose.Schema(
    {
        deviceId: {
            type: String,
            required: true,
            trim: true,
            default: 'ESP32-001',
        },
        voltage: { type: Number, required: true },
        current: { type: Number, required: true },
        power: { type: Number, required: true },
        energy_kwh: { type: Number, required: true },
        timestamp: { type: Date, default: Date.now },
    },
    { timestamps: false }
);

// Compound index for time-range queries per device (most common access pattern)
powerReadingSchema.index({ deviceId: 1, timestamp: -1 });
// Additional index for global time-range scans
powerReadingSchema.index({ timestamp: -1 });

module.exports = mongoose.model('PowerReading', powerReadingSchema);
