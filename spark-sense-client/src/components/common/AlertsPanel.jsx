import React from 'react';
import { AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { format } from 'date-fns';
import { useDashboardStore } from '../../store';
import './AlertsPanel.css';

const iconMap = {
    danger: <AlertCircle size={16} />,
    warning: <AlertTriangle size={16} />,
    info: <Info size={16} />,
};

const AlertsPanel = () => {
    const alerts = useDashboardStore((s) => s.alerts);

    if (!alerts.length) {
        return (
            <div className="alerts-panel card">
                <h3 className="alerts-panel__title">Alerts</h3>
                <p className="alerts-panel__empty">No active alerts.</p>
            </div>
        );
    }

    return (
        <div className="alerts-panel card">
            <div className="alerts-panel__header">
                <h3 className="alerts-panel__title">Alerts</h3>
                <span className="alerts-panel__count">{alerts.length}</span>
            </div>
            <div className="alerts-panel__list">
                {alerts.map((alert) => (
                    <div key={alert.id} className={`alert-item alert-item--${alert.type}`}>
                        <div className="alert-item__icon">{iconMap[alert.type]}</div>
                        <div className="alert-item__body">
                            <p className="alert-item__message">{alert.message}</p>
                            <p className="alert-item__time">{format(new Date(alert.timestamp), 'MMM d, HH:mm')}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlertsPanel;
