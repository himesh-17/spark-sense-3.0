import React from 'react';
import {
    ResponsiveContainer, LineChart, Line, XAxis, YAxis,
    CartesianGrid, Tooltip, Legend, Area, AreaChart,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{
            background: 'var(--color-bg-card-alt)',
            border: '1px solid var(--color-border-md)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 14px',
            fontSize: '0.8rem',
        }}>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 4 }}>{label}</p>
            {payload.map((p) => (
                <p key={p.name} style={{ color: p.color, fontWeight: 600 }}>
                    {p.name}: {p.value} {p.name === 'power' ? 'W' : ''}
                </p>
            ))}
        </div>
    );
};

const PowerLineChart = ({ data = [] }) => (
    <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
                <linearGradient id="powerGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary-500)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-primary-500)" stopOpacity={0} />
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
            <XAxis dataKey="time" tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} unit="W" />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)' }} />
            <Area
                type="monotone"
                dataKey="power"
                stroke="var(--color-primary-400)"
                strokeWidth={2.5}
                fill="url(#powerGrad)"
                dot={false}
                activeDot={{ r: 5, fill: 'var(--color-primary-400)' }}
            />
        </AreaChart>
    </ResponsiveContainer>
);

export default PowerLineChart;
