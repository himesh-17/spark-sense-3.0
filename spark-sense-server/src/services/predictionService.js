/**
 * Prediction Service
 *
 * ABSTRACTION LAYER: This is the ONLY file that needs to change when
 * switching from static JSON to a real ML microservice.
 *
 * To integrate ML API:
 *   1. Replace the JSON import with an axios.get(ML_API_URL) call
 *   2. Map the ML response to { predicted_next_hour, predicted_daily_total, ... }
 *   3. No other file changes needed.
 */

const mockPredictions = require('../fixtures/predictions.json');

/**
 * getPredictions - Returns the current prediction data.
 * @returns {Promise<Object>} Prediction payload
 */
const getPredictions = async () => {
    // --- FUTURE ML INTEGRATION POINT ---
    // const response = await axios.get(process.env.ML_API_URL + '/predict');
    // return response.data;
    // ------------------------------------
    return {
        ...mockPredictions,
        generated_at: new Date().toISOString(), // keep timestamp fresh for UI
    };
};

module.exports = { getPredictions };
