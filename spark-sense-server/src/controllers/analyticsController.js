const { getLatestReading } = require('../services/readingService');
const { getHourlyAggregates, getDailyAggregates } = require('../services/aggregationService');
const { subHours, subDays, startOfDay, endOfDay } = require('date-fns');

/**
 * GET /api/analytics/live
 * Returns the most recent reading for a device
 */
const getLive = async (req, res, next) => {
    try {
        const { deviceId = 'ESP32-001' } = req.query;
        const reading = await getLatestReading(deviceId);

        if (!reading) {
            return res.status(404).json({ success: false, message: 'No readings found' });
        }

        res.json({ success: true, data: reading });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /api/analytics/hourly?deviceId&from&to
 * Returns hourly aggregates (defaults to last 24 hours)
 */
const getHourly = async (req, res, next) => {
    try {
        const { deviceId = 'ESP32-001', from, to } = req.query;
        const fromDate = from ? new Date(from) : subHours(new Date(), 24);
        const toDate = to ? new Date(to) : new Date();

        const data = await getHourlyAggregates(deviceId, fromDate, toDate);
        res.json({ success: true, count: data.length, data });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /api/analytics/daily?deviceId&from&to
 * Returns daily aggregates (defaults to last 30 days)
 */
const getDaily = async (req, res, next) => {
    try {
        const { deviceId = 'ESP32-001', from, to } = req.query;
        const fromDate = from ? new Date(from) : subDays(startOfDay(new Date()), 29);
        const toDate = to ? new Date(to) : endOfDay(new Date());

        const data = await getDailyAggregates(deviceId, fromDate, toDate);
        res.json({ success: true, count: data.length, data });
    } catch (err) {
        next(err);
    }
};

module.exports = { getLive, getHourly, getDaily };
