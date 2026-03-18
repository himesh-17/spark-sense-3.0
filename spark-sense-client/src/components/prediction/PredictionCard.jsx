import React from 'react';
import { Brain, TrendingUp, TrendingDown, Minus, AlertTriangle, Cpu } from 'lucide-react';
import { useDashboardStore } from '../../store';
import './PredictionCard.css';

/**
 * PredictionCard — Modular prediction display component.
 *
 * Consumes: useDashboardStore().prediction
 * Data source: predictionService.js (frontend) → /api/predictions → predictionService.js (backend)
 *
 * To swap to ML API: update ONLY src/services/predictionService.js
 * This component remains unchanged.
 */
const TrendIcon = ({ trend }) => {
    if (trend === 'rising') return <TrendingUp size={16} color="var(--color-danger)" />;
    if (trend === 'falling') return <TrendingDown size={16} color="var(--color-success)" />;
    return <Minus size={16} color="var(--color-text-muted)" />;
};

const PredictionCard = () => {
    const prediction = useDashboardStore((s) => s.prediction);
    if (!prediction) return null;

    const confidencePct = Math.round((prediction.confidence_score || 0) * 100);

    return (
        <div className="prediction-card card">
            <div className="prediction-card__header">
                <div className="prediction-card__title-row">
                    <div className="prediction-card__icon">
                        <Brain size={18} />
                    </div>
                    <div>
                        <h3 className="prediction-card__title">ML Prediction</h3>
                        <p className="prediction-card__model">{prediction.model_version}</p>
                    </div>
                </div>
                <div className="prediction-card__confidence">
                    <Cpu size={12} />
                    {confidencePct}% conf.
                </div>
            </div>

            <div className="prediction-card__stats">
                <div className="prediction-card__stat">
                    <span className="prediction-card__stat-label">Next Hour</span>
                    <span className="prediction-card__stat-value">
                        {prediction.predicted_next_hour}
                        <span className="prediction-card__stat-unit">kWh</span>
                    </span>
                </div>
                <div className="prediction-card__divider" />
                <div className="prediction-card__stat">
                    <span className="prediction-card__stat-label">Daily Total</span>
                    <span className="prediction-card__stat-value prediction-card__stat-value--teal">
                        {prediction.predicted_daily_total}
                        <span className="prediction-card__stat-unit">kWh</span>
                    </span>
                </div>
            </div>

            {prediction.breakdown?.appliances && (
                <div className="prediction-card__breakdown">
                    {prediction.breakdown.appliances.map((a) => {
                        const pct = Math.round((a.predicted_kwh / prediction.predicted_daily_total) * 100);
                        return (
                            <div key={a.name} className="prediction-card__bar-row">
                                <span className="prediction-card__bar-label">{a.name}</span>
                                <div className="prediction-card__bar-track">
                                    <div className="prediction-card__bar-fill" style={{ width: `${pct}%` }} />
                                </div>
                                <span className="prediction-card__bar-val">{a.predicted_kwh} kWh</span>
                            </div>
                        );
                    })}
                </div>
            )}

            {prediction.alert && (
                <div className="prediction-card__alert">
                    <TrendIcon trend={prediction.trend} />
                    <span>{prediction.alert}</span>
                </div>
            )}
        </div>
    );
};

export default PredictionCard;
