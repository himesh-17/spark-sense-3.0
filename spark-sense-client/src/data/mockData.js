import { format, subHours, subDays } from 'date-fns';

// ── Live Stat Card Data ──────────────────────────────────────
export const mockLiveData = {
    deviceId: 'ESP32-001',
    voltage: 231.4,
    current: 4.87,
    power: 1127.2,
    energy_kwh: 6.34,
    timestamp: new Date().toISOString(),
};

// ── 24-Hour Power Line Chart ─────────────────────────────────
export const mockHourlyData = Array.from({ length: 24 }, (_, i) => ({
    time: format(subHours(new Date(), 23 - i), 'HH:mm'),
    power: parseFloat((Math.random() * 1400 + 400).toFixed(1)),
    voltage: parseFloat((220 + Math.random() * 20).toFixed(1)),
    current: parseFloat((1.8 + Math.random() * 5).toFixed(2)),
}));

// ── 30-Day Energy Bar Chart ──────────────────────────────────
export const mockDailyData = Array.from({ length: 30 }, (_, i) => ({
    date: format(subDays(new Date(), 29 - i), 'MMM dd'),
    total_energy: parseFloat((5 + Math.random() * 8).toFixed(2)),
    avg_power: parseFloat((700 + Math.random() * 600).toFixed(1)),
}));

// ── Peak Usage ───────────────────────────────────────────────
export const mockPeakData = {
    peak_power: 2340,
    peak_time: '14:00',
    peak_date: format(subDays(new Date(), 2), 'MMM dd, yyyy'),
    avg_daily: 8.72,
    monthly_total: 187.4,
};

// ── Prediction (mirrors backend fixture) ─────────────────────
export const mockPrediction = {
    predicted_next_hour: 1.34,
    predicted_daily_total: 8.72,
    confidence_score: 0.87,
    model_version: 'mock-v1',
    generated_at: new Date().toISOString(),
    breakdown: {
        appliances: [
            { name: 'HVAC', predicted_kwh: 3.2 },
            { name: 'Lighting', predicted_kwh: 1.1 },
            { name: 'Refrigerator', predicted_kwh: 1.8 },
            { name: 'Other', predicted_kwh: 2.62 },
        ],
    },
    trend: 'rising',
    alert: 'Predicted usage 12% above daily average',
};

// ── Alerts ─────────────────────────────────────────────────
export const mockAlerts = [
    { id: 1, type: 'warning', message: 'Power exceeded 2 kW threshold at 14:23', timestamp: subHours(new Date(), 2).toISOString() },
    { id: 2, type: 'danger', message: 'Voltage spike detected: 248V at 09:11', timestamp: subHours(new Date(), 8).toISOString() },
    { id: 3, type: 'info', message: 'Daily energy budget 80% consumed', timestamp: subHours(new Date(), 1).toISOString() },
];

// ── Devices ──────────────────────────────────────────────────
export const mockDevices = [
    { id: 'ESP32-001', name: 'Main Panel Monitor', location: 'Utility Room', status: 'online', lastSeen: new Date().toISOString() },
    { id: 'ESP32-002', name: 'AC Unit Sensor', location: 'Rooftop', status: 'offline', lastSeen: subHours(new Date(), 6).toISOString() },
    { id: 'ESP32-003', name: 'Kitchen Branch', location: 'Kitchen', status: 'online', lastSeen: new Date().toISOString() },
];

// ── Raw JSON Preview ─────────────────────────────────────────
export const mockRawReadings = Array.from({ length: 8 }, (_, i) => ({
    _id: `65a${i}b2c3d4e5f6a7b8c9d`,
    deviceId: 'ESP32-001',
    voltage: parseFloat((220 + Math.random() * 20).toFixed(2)),
    current: parseFloat((1.5 + Math.random() * 5).toFixed(3)),
    power: parseFloat((330 + Math.random() * 1100).toFixed(1)),
    energy_kwh: parseFloat((0.1 + Math.random() * 0.5).toFixed(4)),
    timestamp: subHours(new Date(), i * 0.5).toISOString(),
}));
