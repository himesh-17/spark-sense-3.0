import React, { useState } from 'react';
import { format, subHours, subDays } from 'date-fns';
import PageWrapper from '../../components/layout/PageWrapper';
import PowerLineChart from '../../components/charts/PowerLineChart';
import EnergyBarChart from '../../components/charts/EnergyBarChart';
import { mockHourlyData, mockDailyData } from '../../data/mockData';
import './Analytics.css';

const summaryMetrics = (data, mode) => {
    if (!data.length) return {};
    const values = mode === 'hourly' ? data.map((d) => d.power) : data.map((d) => d.total_energy);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const avg = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
    const total = values.reduce((a, b) => a + b, 0).toFixed(2);
    const unit = mode === 'hourly' ? 'W' : 'kWh';
    return { max, min, avg, total, unit };
};

const Analytics = () => {
    const [mode, setMode] = useState('hourly');
    const [from, setFrom] = useState(format(subDays(new Date(), 7), "yyyy-MM-dd'T'HH:mm"));
    const [to, setTo] = useState(format(new Date(), "yyyy-MM-dd'T'HH:mm"));

    const data = mode === 'hourly' ? mockHourlyData : mockDailyData;
    const sm = summaryMetrics(data, mode);

    return (
        <PageWrapper title="Analytics">
            {/* ── Controls ── */}
            <div className="analytics-controls card">
                <div className="analytics-toggle">
                    <button
                        className={`analytics-toggle__btn ${mode === 'hourly' ? 'active' : ''}`}
                        onClick={() => setMode('hourly')}
                    >Hourly</button>
                    <button
                        className={`analytics-toggle__btn ${mode === 'daily' ? 'active' : ''}`}
                        onClick={() => setMode('daily')}
                    >Daily</button>
                </div>
                <div className="analytics-date-range">
                    <div className="analytics-date-field">
                        <label>From</label>
                        <input type="datetime-local" value={from} onChange={(e) => setFrom(e.target.value)} />
                    </div>
                    <div className="analytics-date-field">
                        <label>To</label>
                        <input type="datetime-local" value={to} onChange={(e) => setTo(e.target.value)} />
                    </div>
                </div>
            </div>

            {/* ── Detail Chart ── */}
            <div className="card analytics-chart-card" style={{ marginTop: 'var(--space-5)' }}>
                <h2 className="analytics-chart-title">
                    {mode === 'hourly' ? '24-Hour Power Consumption' : '30-Day Energy Trend'}
                </h2>
                {mode === 'hourly'
                    ? <PowerLineChart data={data} />
                    : <EnergyBarChart data={data} />
                }
            </div>

            {/* ── Summary Metrics ── */}
            <section className="analytics-metrics grid-auto grid-4" style={{ marginTop: 'var(--space-5)' }}>
                {[
                    { label: 'Peak', value: sm.max, sub: sm.unit },
                    { label: 'Minimum', value: sm.min, sub: sm.unit },
                    { label: 'Average', value: sm.avg, sub: sm.unit },
                    { label: 'Total', value: sm.total, sub: sm.unit },
                ].map(({ label, value, sub }) => (
                    <div key={label} className="card analytics-metric-card">
                        <p className="analytics-metric-label">{label}</p>
                        <p className="analytics-metric-value">{value}<span className="analytics-metric-unit">{sub}</span></p>
                    </div>
                ))}
            </section>
        </PageWrapper>
    );
};

export default Analytics;
