const PowerReading = require('../models/PowerReading');

/**
 * saveReading - Persists a raw IoT reading from ESP32
 */
const saveReading = async (data) => {
    const reading = new PowerReading(data);
    return await reading.save();
};

/**
 * getLatestReading - Returns the most recent reading for a device
 */
const getLatestReading = async (deviceId = 'ESP32-001') => {
    return await PowerReading.findOne({ deviceId }).sort({ timestamp: -1 }).lean();
};

/**
 * getReadingsInRange - Returns raw readings within a time window
 */
const getReadingsInRange = async (deviceId, from, to) => {
    return await PowerReading.find({
        deviceId,
        timestamp: { $gte: new Date(from), $lte: new Date(to) },
    })
        .sort({ timestamp: 1 })
        .lean();
};

module.exports = { saveReading, getLatestReading, getReadingsInRange };
