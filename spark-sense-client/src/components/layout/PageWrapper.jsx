import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useUIStore } from '../../store';
import './PageWrapper.css';

const PageWrapper = ({ title, children }) => {
    const { sidebarOpen } = useUIStore();

    return (
        <div className="layout">
            <Sidebar />
            <div className={`layout__main ${sidebarOpen ? '' : 'sidebar-closed'}`}>
                <Navbar title={title} />
                <main className="layout__content">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default PageWrapper;
