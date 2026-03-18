import React, { useState } from 'react';
import { format } from 'date-fns';
import { Wifi, WifiOff, ChevronDown, ChevronUp } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';
import { mockDevices, mockRawReadings } from '../../data/mockData';
import './Devices.css';

const Devices = () => {
    const [expandedDevice, setExpandedDevice] = useState(null);
    const [jsonOpen, setJsonOpen] = useState(false);

    return (
        <PageWrapper title="Devices & Data">
            {/* ── Device List ── */}
            <section>
                <h2 className="devices-section-title">Connected Devices</h2>
                <div className="devices-list">
                    {mockDevices.map((device) => (
                        <div key={device.id} className="card device-card">
                            <div className="device-card__row">
                                <div className="device-card__info">
                                    <div className={`device-card__status-dot ${device.status}`} />
                                    <div>
                                        <p className="device-card__name">{device.name}</p>
                                        <p className="device-card__meta">{device.id} · {device.location}</p>
                                    </div>
                                </div>
                                <div className="device-card__right">
                                    <span className={`device-card__badge ${device.status}`}>
                                        {device.status === 'online' ? <Wifi size={12} /> : <WifiOff size={12} />}
                                        {device.status}
                                    </span>
                                    <span className="device-card__seen">
                                        {format(new Date(device.lastSeen), 'MMM d, HH:mm')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Latest Readings Table ── */}
            <section style={{ marginTop: 'var(--space-6)' }}>
                <h2 className="devices-section-title">Latest Readings</h2>
                <div className="card readings-table-wrapper">
                    <table className="readings-table">
                        <thead>
                            <tr>
                                {['Timestamp', 'Device', 'Voltage (V)', 'Current (A)', 'Power (W)', 'Energy (kWh)'].map(h => (
                                    <th key={h}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {mockRawReadings.map((r, i) => (
                                <tr key={i}>
                                    <td>{format(new Date(r.timestamp), 'MMM d, HH:mm:ss')}</td>
                                    <td><span className="readings-table__device">{r.deviceId}</span></td>
                                    <td className="readings-table__num">{r.voltage}</td>
                                    <td className="readings-table__num">{r.current}</td>
                                    <td className="readings-table__num">{r.power}</td>
                                    <td className="readings-table__num">{r.energy_kwh}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* ── Raw JSON Preview ── */}
            <section style={{ marginTop: 'var(--space-5)' }}>
                <button className="json-preview-toggle card" onClick={() => setJsonOpen(!jsonOpen)}>
                    <span>Raw JSON Preview</span>
                    {jsonOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {jsonOpen && (
                    <div className="json-preview">
                        <pre>{JSON.stringify(mockRawReadings.slice(0, 3), null, 2)}</pre>
                    </div>
                )}
            </section>
        </PageWrapper>
    );
};

export default Devices;
