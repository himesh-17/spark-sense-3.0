/**
 * Prediction Service (Frontend)
 *
 * ABSTRACTION LAYER: This is the only file to change when the ML API goes live.
 * To integrate ML API: replace the /api/predictions endpoint call with
 * the real ML microservice URL, or add a response transformer here.
 */
import api from './api';

export const getPredictions = () => api.get('/api/predictions');
