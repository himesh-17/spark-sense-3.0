import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Zap, Activity, Battery, BatteryCharging, Flame } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';
import StatCard from '../../components/common/StatCard';
import PowerLineChart from '../../components/charts/PowerLineChart';
import EnergyBarChart from '../../components/charts/EnergyBarChart';
import PredictionCard from '../../components/prediction/PredictionCard';
import AlertsPanel from '../../components/common/AlertsPanel';
import { useDashboardStore } from '../../store';
import { getLiveReading } from '../../services/analyticsService';
import './Dashboard.css';

// ── Fake-reading generator (used when backend is offline) ───────────────────
const BASE = { voltage: 231, current: 4.2, power: 970 };
let _fakeEnergy = 5.8;

function generateFakeReading() {
    const rand = (center, pct) =>
        parseFloat((center * (1 + (Math.random() - 0.5) * pct * 2)).toFixed(2));
    const voltage = rand(BASE.voltage, 0.03);
    const current = rand(BASE.current, 0.08);
    const power   = parseFloat((voltage * current).toFixed(1));
    _fakeEnergy  += power / 3_600_000 * 5;   // 5-second slice → kWh
    return { voltage, current, power, energy_kwh: parseFloat(_fakeEnergy.toFixed(4)) };
}

const POLL_MS = 5_000;

const Dashboard = () => {
    const {
        liveData, hourlyData, dailyData, peakData,
        setLiveData, addLiveToChart,
    } = useDashboardStore();

    const [isLive,   setIsLive]   = useState(false);
    const [flashKey, setFlashKey] = useState(0);
    const [lastTs,   setLastTs]   = useState(null);
    const failsRef = useRef(0);

    const fetchAndUpdate = useCallback(async () => {
        try {
            const res     = await getLiveReading('ESP32-001');
            const reading = res?.data ?? res;

            if (reading && reading.voltage !== undefined) {
                setLiveData(reading);
                addLiveToChart(reading);
                setIsLive(true);
                failsRef.current = 0;
                setFlashKey(k => k + 1);
                setLastTs(new Date());
                return;
            }
            throw new Error('empty');
        } catch {
            failsRef.current += 1;
            if (failsRef.current >= 2) setIsLive(false);

            // Always keep the dashboard alive with realistic fake data
            const fake = generateFakeReading();
            setLiveData(fake);
            addLiveToChart(fake);
            setFlashKey(k => k + 1);
            setLastTs(new Date());
        }
    }, [setLiveData, addLiveToChart]);

    useEffect(() => {
        fetchAndUpdate();
        const id = setInterval(fetchAndUpdate, POLL_MS);
        return () => clearInterval(id);
    }, [fetchAndUpdate]);

    const updatedStr = lastTs
        ? lastTs.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        : '--:--:--';

    return (
        <PageWrapper title="Dashboard">

            {/* ── Status bar ── */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                    Updated {updatedStr}
                </span>
                <span id="live-status-badge" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    fontSize: '12px', fontWeight: 600, padding: '4px 14px',
                    borderRadius: '999px',
                    background: isLive ? 'rgba(34,197,94,0.12)' : 'rgba(99,102,241,0.12)',
                    color:      isLive ? '#22c55e' : '#818cf8',
                    border:     `1px solid ${isLive ? 'rgba(34,197,94,0.3)' : 'rgba(99,102,241,0.3)'}`,
                    transition: 'all 0.4s ease',
                }}>
                    <span style={{
                        width: '7px', height: '7px', borderRadius: '50%',
                        background:  isLive ? '#22c55e' : '#818cf8',
                        boxShadow:   isLive ? '0 0 0 3px rgba(34,197,94,0.25)' : '0 0 0 3px rgba(99,102,241,0.25)',
                        animation:   'dashPulse 1.4s ease-in-out infinite',
                    }} />
                    {isLive ? 'Live · ESP32' : 'Simulated · 5s'}
                </span>
            </div>

            {/* ── Stat Cards (key changes on every poll → triggers flash CSS animation) ── */}
            <section className="dashboard-stats grid-auto grid-4">
                <StatCard
                    key={`v-${flashKey}`}
                    title="Voltage"
                    value={liveData?.voltage?.toFixed(1) ?? '--'}
                    unit="V"
                    icon={Zap}
                    color="blue"
                    trend={0.8}
                    subtitle="Nominal: 220–240 V"
                    flash
                />
                <StatCard
                    key={`c-${flashKey}`}
                    title="Current"
                    value={liveData?.current?.toFixed(2) ?? '--'}
                    unit="A"
                    icon={Activity}
                    color="teal"
                    trend={-1.2}
                    subtitle="Phase load balanced"
                    flash
                />
                <StatCard
                    key={`p-${flashKey}`}
                    title="Power"
                    value={liveData?.power?.toFixed(1) ?? '--'}
                    unit="W"
                    icon={BatteryCharging}
                    color="amber"
                    trend={2.4}
                    subtitle="Instantaneous draw"
                    flash
                />
                <StatCard
                    key={`e-${flashKey}`}
                    title="Energy Today"
                    value={liveData?.energy_kwh?.toFixed(3) ?? '--'}
                    unit="kWh"
                    icon={Battery}
                    color="green"
                    subtitle={isLive ? 'Live from ESP32' : `Simulated · every ${POLL_MS / 1000}s`}
                    flash
                />
            </section>

            {/* ── Charts ── */}
            <section className="dashboard-charts grid-auto grid-2" style={{ marginTop: 'var(--space-5)' }}>
                <div className="card dashboard-chart-card">
                    <div className="dashboard-chart-header">
                        <h2 className="dashboard-chart-title">Rolling Power Feed</h2>
                        <span className="dashboard-chart-badge">Watt · live</span>
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
                <PredictionCard />
                <AlertsPanel />
            </section>
        </PageWrapper>
    );
};

export default Dashboard;
