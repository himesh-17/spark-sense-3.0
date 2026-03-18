const AggregatedReading = require('../models/AggregatedReading');
const PowerReading = require('../models/PowerReading');

/**
 * getHourlyAggregates - Retrieves pre-computed hourly rollups.
 * Falls back to on-the-fly aggregation if collection is empty (dev mode).
 */
const getHourlyAggregates = async (deviceId, from, to) => {
    const precomputed = await AggregatedReading.find({
        type: 'hourly',
        deviceId,
        startTime: { $gte: new Date(from), $lte: new Date(to) },
    })
        .sort({ startTime: 1 })
        .lean();

    if (precomputed.length > 0) return precomputed;

    // On-the-fly fallback using MongoDB aggregation pipeline
    return await PowerReading.aggregate([
        {
            $match: {
                deviceId,
                timestamp: { $gte: new Date(from), $lte: new Date(to) },
            },
        },
        {
            $group: {
                _id: {
                    year: { $year: '$timestamp' },
                    month: { $month: '$timestamp' },
                    day: { $dayOfMonth: '$timestamp' },
                    hour: { $hour: '$timestamp' },
                },
                avg_power: { $avg: '$power' },
                max_power: { $max: '$power' },
                total_energy: { $sum: '$energy_kwh' },
                reading_count: { $sum: 1 },
                startTime: { $min: '$timestamp' },
            },
        },
        { $sort: { startTime: 1 } },
    ]);
};

/**
 * getDailyAggregates - Retrieves pre-computed daily rollups.
 * Falls back to on-the-fly aggregation if collection is empty (dev mode).
 */
const getDailyAggregates = async (deviceId, from, to) => {
    const precomputed = await AggregatedReading.find({
        type: 'daily',
        deviceId,
        startTime: { $gte: new Date(from), $lte: new Date(to) },
    })
        .sort({ startTime: 1 })
        .lean();

    if (precomputed.length > 0) return precomputed;

    return await PowerReading.aggregate([
        {
            $match: {
                deviceId,
                timestamp: { $gte: new Date(from), $lte: new Date(to) },
            },
        },
        {
            $group: {
                _id: {
                    year: { $year: '$timestamp' },
                    month: { $month: '$timestamp' },
                    day: { $dayOfMonth: '$timestamp' },
                },
                avg_power: { $avg: '$power' },
                max_power: { $max: '$power' },
                total_energy: { $sum: '$energy_kwh' },
                reading_count: { $sum: 1 },
                startTime: { $min: '$timestamp' },
            },
        },
        { $sort: { startTime: 1 } },
    ]);
};

module.exports = { getHourlyAggregates, getDailyAggregates };
