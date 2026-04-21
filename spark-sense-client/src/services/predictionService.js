/**
 * Prediction Service (Frontend)
 *
 * ABSTRACTION LAYER: This is the only file to change when the ML API goes live.
 * To integrate ML API: replace the /api/predictions endpoint call with
 * the real ML microservice URL, or add a response transformer here.
 */
import api from './api';

export const getPredictions = () => api.get('/api/predictions');

// ── Fake AI Readings Pool (12 entries) ──────────────────────────────────────
// Each object simulates a different ML model snapshot for demo / offline use.
const AI_READINGS_POOL = [
    {
        predicted_next_hour: 1.21,
        predicted_daily_total: 7.85,
        confidence_score: 0.91,
        model_version: 'SparkAI-v2.1',
        trend: 'stable',
        alert: 'Usage within normal range — efficiency score: A',
        breakdown: { appliances: [
            { name: 'HVAC', predicted_kwh: 2.9 },
            { name: 'Lighting', predicted_kwh: 0.95 },
            { name: 'Refrigerator', predicted_kwh: 1.7 },
            { name: 'Other', predicted_kwh: 2.3 },
        ]},
    },
    {
        predicted_next_hour: 1.68,
        predicted_daily_total: 10.42,
        confidence_score: 0.83,
        model_version: 'SparkAI-v2.1',
        trend: 'rising',
        alert: 'Predicted usage 19% above baseline — check HVAC schedule',
        breakdown: { appliances: [
            { name: 'HVAC', predicted_kwh: 4.1 },
            { name: 'Lighting', predicted_kwh: 1.2 },
            { name: 'Refrigerator', predicted_kwh: 1.82 },
            { name: 'Other', predicted_kwh: 3.3 },
        ]},
    },
    {
        predicted_next_hour: 0.94,
        predicted_daily_total: 6.31,
        confidence_score: 0.95,
        model_version: 'SparkAI-v2.2',
        trend: 'falling',
        alert: 'Low demand window — ideal time to run heavy appliances',
        breakdown: { appliances: [
            { name: 'HVAC', predicted_kwh: 2.1 },
            { name: 'Lighting', predicted_kwh: 0.8 },
            { name: 'Refrigerator', predicted_kwh: 1.61 },
            { name: 'Other', predicted_kwh: 1.8 },
        ]},
    },
    {
        predicted_next_hour: 2.05,
        predicted_daily_total: 13.9,
        confidence_score: 0.78,
        model_version: 'SparkAI-v2.2',
        trend: 'rising',
        alert: '⚠ High load predicted — consider shifting non-critical tasks',
        breakdown: { appliances: [
            { name: 'HVAC', predicted_kwh: 5.6 },
            { name: 'Lighting', predicted_kwh: 1.5 },
            { name: 'Refrigerator', predicted_kwh: 1.9 },
            { name: 'Other', predicted_kwh: 4.9 },
        ]},
    },
    {
        predicted_next_hour: 1.10,
        predicted_daily_total: 8.03,
        confidence_score: 0.89,
        model_version: 'SparkAI-v3.0-beta',
        trend: 'stable',
        alert: 'Steady load — no anomalies detected',
        breakdown: { appliances: [
            { name: 'HVAC', predicted_kwh: 3.0 },
            { name: 'Lighting', predicted_kwh: 1.0 },
            { name: 'Refrigerator', predicted_kwh: 1.73 },
            { name: 'Other', predicted_kwh: 2.3 },
        ]},
    },
    {
        predicted_next_hour: 1.45,
        predicted_daily_total: 9.17,
        confidence_score: 0.86,
        model_version: 'SparkAI-v3.0-beta',
        trend: 'rising',
        alert: 'Peak demand expected between 18:00–20:00',
        breakdown: { appliances: [
            { name: 'HVAC', predicted_kwh: 3.5 },
            { name: 'Lighting', predicted_kwh: 1.3 },
            { name: 'Refrigerator', predicted_kwh: 1.77 },
            { name: 'Other', predicted_kwh: 2.6 },
        ]},
    },
    {
        predicted_next_hour: 0.77,
        predicted_daily_total: 5.58,
        confidence_score: 0.93,
        model_version: 'SparkAI-v3.0-beta',
        trend: 'falling',
        alert: 'Energy saving opportunity — usage 28% below average',
        breakdown: { appliances: [
            { name: 'HVAC', predicted_kwh: 1.8 },
            { name: 'Lighting', predicted_kwh: 0.68 },
            { name: 'Refrigerator', predicted_kwh: 1.5 },
            { name: 'Other', predicted_kwh: 1.6 },
        ]},
    },
    {
        predicted_next_hour: 1.33,
        predicted_daily_total: 8.72,
        confidence_score: 0.87,
        model_version: 'SparkAI-v2.1',
        trend: 'rising',
        alert: 'Predicted usage 12% above daily average',
        breakdown: { appliances: [
            { name: 'HVAC', predicted_kwh: 3.2 },
            { name: 'Lighting', predicted_kwh: 1.1 },
            { name: 'Refrigerator', predicted_kwh: 1.8 },
            { name: 'Other', predicted_kwh: 2.62 },
        ]},
    },
    {
        predicted_next_hour: 1.89,
        predicted_daily_total: 11.6,
        confidence_score: 0.80,
        model_version: 'SparkAI-v2.2',
        trend: 'rising',
        alert: 'Unusual spike pattern detected — verify device connections',
        breakdown: { appliances: [
            { name: 'HVAC', predicted_kwh: 4.7 },
            { name: 'Lighting', predicted_kwh: 1.4 },
            { name: 'Refrigerator', predicted_kwh: 1.85 },
            { name: 'Other', predicted_kwh: 3.55 },
        ]},
    },
    {
        predicted_next_hour: 1.02,
        predicted_daily_total: 7.14,
        confidence_score: 0.90,
        model_version: 'SparkAI-v3.0-beta',
        trend: 'stable',
        alert: 'Optimal usage pattern — efficiency score: A+',
        breakdown: { appliances: [
            { name: 'HVAC', predicted_kwh: 2.6 },
            { name: 'Lighting', predicted_kwh: 0.9 },
            { name: 'Refrigerator', predicted_kwh: 1.64 },
            { name: 'Other', predicted_kwh: 2.0 },
        ]},
    },
    {
        predicted_next_hour: 1.55,
        predicted_daily_total: 9.88,
        confidence_score: 0.84,
        model_version: 'SparkAI-v2.2',
        trend: 'rising',
        alert: 'Weekend surge detected — 14% above weekly mean',
        breakdown: { appliances: [
            { name: 'HVAC', predicted_kwh: 3.8 },
            { name: 'Lighting', predicted_kwh: 1.28 },
            { name: 'Refrigerator', predicted_kwh: 1.9 },
            { name: 'Other', predicted_kwh: 2.9 },
        ]},
    },
    {
        predicted_next_hour: 0.88,
        predicted_daily_total: 6.02,
        confidence_score: 0.96,
        model_version: 'SparkAI-v3.0-beta',
        trend: 'falling',
        alert: 'Night-mode active — minimal load expected until 06:00',
        breakdown: { appliances: [
            { name: 'HVAC', predicted_kwh: 1.9 },
            { name: 'Lighting', predicted_kwh: 0.52 },
            { name: 'Refrigerator', predicted_kwh: 1.6 },
            { name: 'Other', predicted_kwh: 2.0 },
        ]},
    },
];

/**
 * getAIReading
 * Returns a random AI/ML prediction snapshot from the pool.
 * Simulates a live model response — replace pool entries or swap this
 * function body with a real ML API call when the model is ready.
 *
 * @returns {Object} AI prediction payload
 */
export const getAIReading = () => {
    const idx = Math.floor(Math.random() * AI_READINGS_POOL.length);
    return {
        ...AI_READINGS_POOL[idx],
        generated_at: new Date().toISOString(),
    };
};
