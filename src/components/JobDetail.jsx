import { useEffect } from 'react';

function timeAgo(dateStr) {
    if (!dateStr) return '';
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
}

function formatDescription(text) {
    if (!text) return null;
    return text.split('\n').filter(line => line.trim()).map((line, i) => (
        <p key={i} style={{ marginBottom: '0.6rem', lineHeight: 1.75 }}>{line}</p>
    ));
}

export default function JobDetail({ job, onClose }) {
    // Close on Escape
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    if (!job) return null;

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(15,23,42,0.55)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: '1rem',
                backdropFilter: 'blur(2px)',
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    background: 'white',
                    borderRadius: '16px',
                    width: '100%',
                    maxWidth: '720px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Sticky header */}
                <div style={{
                    padding: '1.5rem 1.5rem 1.25rem',
                    background: 'linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)',
                    borderBottom: '1px solid #e2e8f0',
                    borderRadius: '16px 16px 0 0',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <h2 style={{
                                fontSize: '1.2rem',
                                fontWeight: 700,
                                color: '#1e293b',
                                lineHeight: 1.3,
                                marginBottom: '0.3rem',
                            }}>
                                {job.title}
                            </h2>
                            <div style={{ fontSize: '1rem', color: '#2563eb', fontWeight: 600, marginBottom: '0.75rem' }}>
                                {job.company}
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.875rem', color: '#475569' }}>
                                <span>📍 {job.location}</span>
                                <span>🏷️ {job.skill}</span>
                                <span>📡 {job.source}</span>
                                <span style={{ color: '#94a3b8' }}>🕐 {timeAgo(job.scrapedAt)}</span>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            style={{
                                background: '#f1f5f9',
                                border: 'none',
                                borderRadius: '8px',
                                width: '34px',
                                height: '34px',
                                fontSize: '1.1rem',
                                color: '#64748b',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                            }}
                        >
                            ✕
                        </button>
                    </div>
                    <div style={{ marginTop: '1rem' }}>
                        <a
                            href={job.url}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                padding: '0.65rem 1.5rem',
                                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                                color: 'white',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                boxShadow: '0 2px 8px rgba(37,99,235,0.3)',
                            }}
                        >
                            Apply on {job.source} ↗
                        </a>
                    </div>
                </div>

                {/* Description body */}
                <div style={{ padding: '1.5rem', flex: 1 }}>
                    <h3 style={{
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: '#374151',
                        marginBottom: '1rem',
                        paddingBottom: '0.5rem',
                        borderBottom: '1px solid #f1f5f9',
                    }}>
                        Job Description
                    </h3>
                    <div style={{ fontSize: '0.875rem', color: '#374151' }}>
                        {formatDescription(job.description)}
                    </div>
                </div>
            </div>
        </div>
    );
}
