import React from 'react';
import {
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
    CartesianGrid, Tooltip, Cell,
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
            <p style={{ color: 'var(--color-teal-400)', fontWeight: 600 }}>
                {payload[0]?.value} kWh
            </p>
        </div>
    );
};

const EnergyBarChart = ({ data = [] }) => {
    const maxVal = Math.max(...data.map((d) => d.total_energy || 0));
    return (
        <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }} barCategoryGap="35%">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: 'var(--color-text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} interval={4} />
                <YAxis tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} unit=" kWh" />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Bar dataKey="total_energy" radius={[4, 4, 0, 0]}>
                    {data.map((entry, i) => (
                        <Cell
                            key={i}
                            fill={entry.total_energy === maxVal ? 'var(--color-amber-500)' : 'var(--color-teal-500)'}
                            fillOpacity={entry.total_energy === maxVal ? 1 : 0.75}
                        />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default EnergyBarChart;
