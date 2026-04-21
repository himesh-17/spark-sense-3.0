const { saveReading, getLatestReading } = require('../services/readingService');

/**
 * POST /api/readings
 * Ingest raw ESP32 sensor data.
 * Accepts either 'energy_kwh' (preferred) or 'energy' (legacy ESP32 field name).
 */
const createReading = async (req, res, next) => {
    try {
        const {
            deviceId,
            voltage,
            current,
            power,
            energy_kwh,   // preferred field name
            energy,       // fallback if ESP32 sends 'energy'
            powerFactor,
            timestamp,
        } = req.body;

        const energyValue = energy_kwh ?? energy ?? 0;

        const reading = await saveReading({
            deviceId:   deviceId || 'ESP32-001',
            voltage,
            current,
            power,
            energy_kwh: energyValue,
            timestamp:  timestamp ? new Date(timestamp) : new Date(),
        });

        res.status(201).json({ success: true, data: reading });
    } catch (err) {
        next(err);
    }
};

module.exports = { createReading };
