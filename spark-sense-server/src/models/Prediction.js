const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
    predicted_next_hour: { type: Number, required: true },
    predicted_daily_total: { type: Number, required: true },
    confidence_score: { type: Number, default: null },
    model_version: { type: String, default: 'mock-v1' },
    generated_at: { type: Date, default: Date.now },
});

predictionSchema.index({ generated_at: -1 });

module.exports = mongoose.model('Prediction', predictionSchema);
