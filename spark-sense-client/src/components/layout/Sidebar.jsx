import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard, BarChart3, Info,
    Cpu, Zap, X,
} from 'lucide-react';
import { useUIStore } from '../../store';
import './Sidebar.css';

const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/devices', icon: Cpu, label: 'Devices & Data' },
    { to: '/about', icon: Info, label: 'About' },
];

const Sidebar = () => {
    const { sidebarOpen, toggleSidebar } = useUIStore();

    return (
        <>
            {sidebarOpen && <div className="sidebar-backdrop" onClick={toggleSidebar} />}
            <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                <div className="sidebar__header">
                    <div className="sidebar__brand">
                        <div className="sidebar__logo"><Zap size={20} /></div>
                        <span className="sidebar__title">Spark Sense</span>
                    </div>
                    <button className="sidebar__close" onClick={toggleSidebar}>
                        <X size={16} />
                    </button>
                </div>

                <nav className="sidebar__nav">
                    <p className="sidebar__section-label">Main Menu</p>
                    {navItems.map(({ to, icon: Icon, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/'}
                            className={({ isActive }) => `sidebar__link ${isActive ? 'active' : ''}`}
                        >
                            <Icon size={18} />
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar__footer">
                    <div className="sidebar__status">
                        <div className="sidebar__status-dot" />
                        <span>ESP32-001 Online</span>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
