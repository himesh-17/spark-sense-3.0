import React from 'react';
import './StatCard.css';

const StatCard = ({ title, value, unit, icon: Icon, color = 'blue', trend, subtitle }) => {
    const colorMap = {
        blue: { accent: 'var(--color-primary-500)', glow: 'var(--shadow-glow-blue)', badge: '#1e3a8a' },
        teal: { accent: 'var(--color-teal-500)', glow: 'var(--shadow-glow-teal)', badge: '#134e4a' },
        amber: { accent: 'var(--color-amber-500)', glow: 'var(--shadow-glow-amber)', badge: '#78350f' },
        green: { accent: 'var(--color-success)', glow: '0 0 20px rgba(16,185,129,0.2)', badge: '#064e3b' },
    };
    const c = colorMap[color] || colorMap.blue;

    return (
        <div className="stat-card card" style={{ '--accent': c.accent, '--glow': c.glow }}>
            <div className="stat-card__top">
                <div className="stat-card__label">{title}</div>
                {Icon && (
                    <div className="stat-card__icon" style={{ background: c.badge }}>
                        <Icon size={18} color={c.accent} />
                    </div>
                )}
            </div>
            <div className="stat-card__value">
                {value}
                <span className="stat-card__unit">{unit}</span>
            </div>
            {trend !== undefined && (
                <div className={`stat-card__trend ${trend >= 0 ? 'up' : 'down'}`}>
                    {trend >= 0 ? '▲' : '▼'} {Math.abs(trend)}% vs last hour
                </div>
            )}
            {subtitle && <div className="stat-card__subtitle">{subtitle}</div>}
            <div className="stat-card__pulse" />
        </div>
    );
};

export default StatCard;
