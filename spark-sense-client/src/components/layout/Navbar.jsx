import React from 'react';
import { Menu, Bell, RefreshCw } from 'lucide-react';
import { useUIStore, useDashboardStore } from '../../store';
import './Navbar.css';

const Navbar = ({ title }) => {
    const toggleSidebar = useUIStore((s) => s.toggleSidebar);
    const alerts = useDashboardStore((s) => s.alerts);
    const dangerCount = alerts.filter((a) => a.type === 'danger').length;

    return (
        <header className="navbar">
            <div className="navbar__left">
                <button className="navbar__icon-btn" onClick={toggleSidebar} aria-label="Toggle menu">
                    <Menu size={20} />
                </button>
                <h1 className="navbar__title">{title}</h1>
            </div>
            <div className="navbar__right">
                <div className="navbar__live-badge">
                    <span className="navbar__live-dot" />
                    Live
                </div>
                <button className="navbar__icon-btn" title="Refresh data">
                    <RefreshCw size={18} />
                </button>
                <button className="navbar__icon-btn navbar__bell" title="Alerts">
                    <Bell size={18} />
                    {dangerCount > 0 && <span className="navbar__badge">{dangerCount}</span>}
                </button>
            </div>
        </header>
    );
};

export default Navbar;
