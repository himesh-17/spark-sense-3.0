const { saveReading, getLatestReading } = require('../services/readingService');

/**
 * POST /api/readings
 * Ingest raw ESP32 sensor data
 */
const createReading = async (req, res, next) => {
    try {
        const { deviceId, voltage, current, power, energy_kwh, timestamp } = req.body;
        const reading = await saveReading({
            deviceId: deviceId || 'ESP32-001',
            voltage,
            current,
            power,
            energy_kwh,
            timestamp: timestamp ? new Date(timestamp) : new Date(),
        });

        res.status(201).json({ success: true, data: reading });
    } catch (err) {
        next(err);
    }
};

module.exports = { createReading };
