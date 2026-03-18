import React from 'react';
import { Cpu, Server, Code2, GitBranch, Globe, Database, Brain, Zap, ArrowRight } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';
import './About.css';

const techStack = [
    { icon: Code2, name: 'React + Vite', desc: 'Frontend SPA' },
    { icon: Server, name: 'Node.js + Express', desc: 'REST API Server' },
    { icon: Database, name: 'MongoDB', desc: 'Time-series Storage' },
    { icon: GitBranch, name: 'Recharts', desc: 'Chart Visualizations' },
    { icon: Globe, name: 'Zustand', desc: 'State Management' },
    { icon: Cpu, name: 'ESP32', desc: 'IoT Sensing Hardware' },
];

const teamMembers = [
    { name: 'Team Member 1', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix', domain: 'Frontend & UI/UX', enro: '1234567890' },
    { name: 'Team Member 2', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna', domain: 'Backend & IoT', enro: '0987654321' },
    { name: 'Team Member 3', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', domain: 'ML & Data Science', enro: '1122334455' },
];

const About = () => (
    <PageWrapper title="About">

        {/* Overview */}
        <section className="about-section card">
            <div className="about-section__icon"><Zap size={22} /></div>
            <h2 className="about-section__title">Project Overview</h2>
            <p className="about-section__text">
                <strong>Spark Sense</strong> is a real-time IoT energy monitoring platform built on an ESP32 microcontroller
                sampling voltage, current, power, and energy at the circuit breaker level. Readings are streamed to a
                Node.js REST API and stored in MongoDB for trend analysis, anomaly detection, and predictive analytics.
                The system is designed to be fully modular: the prediction layer is isolated behind a service contract,
                enabling a drop-in replacement with any ML microservice without touching the rest of the codebase.
            </p>
        </section>

        {/* Architecture */}
        <section className="about-section card" style={{ marginTop: 'var(--space-5)' }}>
            <div className="about-section__icon" style={{ background: 'rgba(20,184,166,0.15)' }}>
                <Server size={22} color="var(--color-teal-400)" />
            </div>
            <h2 className="about-section__title">System Architecture</h2>
            <div className="about-arch">
                {[
                    { label: 'ESP32', sub: 'Sensor Layer', color: '--color-amber-500' },
                    { label: 'MQTT / HTTP', sub: 'Transport', color: '--color-primary-500' },
                    { label: 'Express API', sub: 'Ingestion', color: '--color-primary-500' },
                    { label: 'MongoDB', sub: 'Persistence', color: '--color-teal-500' },
                    { label: 'React UI', sub: 'Presentation', color: '--color-primary-400' },
                ].map((node, i, arr) => (
                    <React.Fragment key={node.label}>
                        <div className="about-arch__node" style={{ borderColor: `var(${node.color})` }}>
                            <span className="about-arch__node-label">{node.label}</span>
                            <span className="about-arch__node-sub">{node.sub}</span>
                        </div>
                        {i < arr.length - 1 && <ArrowRight size={18} color="var(--color-text-muted)" className="about-arch__arrow" />}
                    </React.Fragment>
                ))}
            </div>
        </section>

        {/* Tech Stack */}
        <section style={{ marginTop: 'var(--space-5)' }}>
            <h2 className="about-section__title" style={{ marginBottom: 'var(--space-4)', paddingLeft: 'var(--space-1)' }}>Tech Stack</h2>
            <div className="about-tech-grid grid-auto grid-3">
                {techStack.map(({ icon: Icon, name, desc }) => (
                    <div key={name} className="card about-tech-card">
                        <div className="about-tech-card__icon"><Icon size={20} /></div>
                        <div>
                            <p className="about-tech-card__name">{name}</p>
                            <p className="about-tech-card__desc">{desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Team Section */}
        <section className="about-section card" style={{ marginTop: 'var(--space-5)' }}>
            <div className="about-section__icon" style={{ background: 'rgba(59,130,246,0.15)' }}>
                <Brain size={22} color="var(--color-primary-400)" />
            </div>
            <h2 className="about-section__title">Meet the Team</h2>
            <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-5)', marginTop: 'var(--space-4)' }}>
                {teamMembers.map((member) => (
                    <div key={member.name} className="team-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 'var(--space-4)', background: 'var(--color-bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                        <img src={member.photo} alt={member.name} style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: 'var(--space-3)', background: 'var(--color-bg-card-alt)' }} />
                        <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--color-text-primary)' }}>{member.name}</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-1)' }}>{member.domain}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>ENRO: {member.enro}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Faculty Mentor */}
        <section className="about-section card" style={{ marginTop: 'var(--space-5)' }}>
            <h2 className="about-section__title">Faculty Mentor</h2>
            <div className="mentor-card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginTop: 'var(--space-3)', padding: 'var(--space-4)', background: 'var(--color-bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--color-primary-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    FM
                </div>
                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--color-text-primary)' }}>Mentor Name</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Guide & Advisor</p>
                </div>
            </div>
        </section>
    </PageWrapper>
);

export default About;
