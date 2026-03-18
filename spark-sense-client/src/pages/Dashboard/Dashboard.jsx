import React from 'react';
import { Zap, Activity, Battery, BatteryCharging, Flame } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';
import StatCard from '../../components/common/StatCard';
import PowerLineChart from '../../components/charts/PowerLineChart';
import EnergyBarChart from '../../components/charts/EnergyBarChart';
import PredictionCard from '../../components/prediction/PredictionCard';
import AlertsPanel from '../../components/common/AlertsPanel';
import { useDashboardStore } from '../../store';
import './Dashboard.css';

const Dashboard = () => {
    const { liveData, hourlyData, dailyData, peakData } = useDashboardStore();

    return (
        <PageWrapper title="Dashboard">
            {/* ── Stat Cards ── */}
            <section className="dashboard-stats grid-auto grid-4">
                <StatCard
                    title="Voltage"
                    value={liveData?.voltage?.toFixed(1) ?? '--'}
                    unit="V"
                    icon={Zap}
                    color="blue"
                    trend={0.8}
                    subtitle="Nominal: 220–240V"
                />
                <StatCard
                    title="Current"
                    value={liveData?.current?.toFixed(2) ?? '--'}
                    unit="A"
                    icon={Activity}
                    color="teal"
                    trend={-1.2}
                    subtitle="Phase load balanced"
                />
                <StatCard
                    title="Power"
                    value={liveData?.power?.toFixed(1) ?? '--'}
                    unit="W"
                    icon={BatteryCharging}
                    color="amber"
                    trend={2.4}
                    subtitle="Instantaneous draw"
                />
                <StatCard
                    title="Energy Today"
                    value={liveData?.energy_kwh?.toFixed(2) ?? '--'}
                    unit="kWh"
                    icon={Battery}
                    color="green"
                    subtitle="Updated every 30s"
                />
            </section>

            {/* ── Charts ── */}
            <section className="dashboard-charts grid-auto grid-2" style={{ marginTop: 'var(--space-5)' }}>
                <div className="card dashboard-chart-card">
                    <div className="dashboard-chart-header">
                        <h2 className="dashboard-chart-title">24-Hour Power</h2>
                        <span className="dashboard-chart-badge">Watt</span>
                    </div>
                    <PowerLineChart data={hourlyData} />
                </div>
                <div className="card dashboard-chart-card">
                    <div className="dashboard-chart-header">
                        <h2 className="dashboard-chart-title">30-Day Energy</h2>
                        <span className="dashboard-chart-badge dashboard-chart-badge--teal">kWh</span>
                    </div>
                    <EnergyBarChart data={dailyData} />
                </div>
            </section>

            {/* ── Bottom Row ── */}
            <section className="dashboard-bottom grid-auto grid-3" style={{ marginTop: 'var(--space-5)' }}>
                {/* Peak Usage */}
                <div className="card peak-card">
                    <div className="peak-card__header">
                        <Flame size={18} color="var(--color-amber-400)" />
                        <h3 className="peak-card__title">Peak Usage</h3>
                    </div>
                    <div className="peak-card__value">
                        {peakData?.peak_power?.toLocaleString()}
                        <span className="peak-card__unit">W</span>
                    </div>
                    <p className="peak-card__time">
                        {peakData?.peak_time} · {peakData?.peak_date}
                    </p>
                    <div className="peak-card__stats">
                        <div className="peak-card__stat">
                            <span>Monthly Total</span>
                            <strong>{peakData?.monthly_total} kWh</strong>
                        </div>
                        <div className="peak-card__stat">
                            <span>Avg Daily</span>
                            <strong>{peakData?.avg_daily} kWh</strong>
                        </div>
                    </div>
                </div>

                {/* Prediction */}
                <PredictionCard />

                {/* Alerts */}
                <AlertsPanel />
            </section>
        </PageWrapper>
    );
};

export default Dashboard;
