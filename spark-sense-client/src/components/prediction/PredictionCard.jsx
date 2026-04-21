import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Brain, TrendingUp, TrendingDown, Minus, Cpu, RefreshCw } from 'lucide-react';
import { getAIReading } from '../../services/predictionService';
import './PredictionCard.css';

/**
 * PredictionCard — AI prediction display component.
 *
 * Auto-rotates through AI readings from the pool every 8 seconds
 * with a smooth fade transition. A progress bar counts down to the next switch.
 * The manual refresh button resets the 8-second timer.
 *
 * To swap to a real ML API: update ONLY src/services/predictionService.js
 */
const ROTATE_INTERVAL = 8000; // ms between automatic reading changes

const TrendIcon = ({ trend }) => {
    if (trend === 'rising') return <TrendingUp size={16} color="var(--color-danger)" />;
    if (trend === 'falling') return <TrendingDown size={16} color="var(--color-success)" />;
    return <Minus size={16} color="var(--color-text-muted)" />;
};

const PredictionCard = () => {
    const [prediction, setPrediction] = useState(() => getAIReading());
    const [visible, setVisible]       = useState(true);   // controls fade in/out
    const [progress, setProgress]     = useState(100);    // 100 → 0 countdown bar
    const timerRef    = useRef(null);
    const progressRef = useRef(null);

    // Animate a new reading in with fade
    const switchReading = useCallback(() => {
        setVisible(false);                    // fade out
        setTimeout(() => {
            setPrediction(getAIReading());
            setProgress(100);                 // reset progress bar
            setVisible(true);                 // fade in
        }, 350);
    }, []);

    // Reset and restart the auto-rotate cycle
    const startCycle = useCallback(() => {
        // Clear any existing timers
        clearInterval(timerRef.current);
        clearInterval(progressRef.current);

        setProgress(100);

        // Progress bar ticks down every 80 ms (100 steps × 80 ms = 8 000 ms)
        progressRef.current = setInterval(() => {
            setProgress(prev => {
                if (prev <= 1) return 100;   // will be reset by switchReading below
                return prev - 1;
            });
        }, ROTATE_INTERVAL / 100);

        // Switch reading every ROTATE_INTERVAL ms
        timerRef.current = setInterval(switchReading, ROTATE_INTERVAL);
    }, [switchReading]);

    // Start on mount, clean up on unmount
    useEffect(() => {
        startCycle();
        return () => {
            clearInterval(timerRef.current);
            clearInterval(progressRef.current);
        };
    }, [startCycle]);

    // Manual refresh — also resets the auto-cycle timer
    const handleRefresh = useCallback(() => {
        switchReading();
        startCycle();
    }, [switchReading, startCycle]);

    if (!prediction) return null;

    const confidencePct = Math.round((prediction.confidence_score || 0) * 100);

    return (
        <div className="prediction-card card" style={{ overflow: 'hidden' }}>

            {/* ── Countdown progress bar ── */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0,
                height: '3px',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, var(--color-primary, #6366f1), var(--color-teal, #14b8a6))',
                transition: 'width 0.08s linear',
                borderRadius: '0 2px 2px 0',
            }} />

            {/* ── Card content (fades in/out) ── */}
            <div style={{
                opacity: visible ? 1 : 0,
                transition: 'opacity 0.35s ease',
            }}>
                <div className="prediction-card__header">
                    <div className="prediction-card__title-row">
                        <div className="prediction-card__icon">
                            <Brain size={18} />
                        </div>
                        <div>
                            <h3 className="prediction-card__title">AI Prediction</h3>
                            <p className="prediction-card__model">{prediction.model_version}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div className="prediction-card__confidence">
                            <Cpu size={12} />
                            {confidencePct}% conf.
                        </div>
                        <button
                            id="ai-prediction-refresh-btn"
                            onClick={handleRefresh}
                            title="Load new AI reading now"
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--color-text-muted)',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '2px',
                                transition: 'color 0.2s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
                        >
                            <RefreshCw size={14} />
                        </button>
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
        </div>
    );
};

export default PredictionCard;
