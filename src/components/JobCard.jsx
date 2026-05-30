function timeAgo(dateStr) {
    if (!dateStr) return '';
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (mins > 0) return `${mins}m ago`;
    return 'Just now';
}

const SOURCE_COLORS = {
    Indeed:   { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' },
    Naukri:   { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0' },
    LinkedIn: { bg: '#f0f9ff', color: '#0369a1', border: '#bae6fd' },
};

const SKILL_COLORS = {
    Python:     { bg: '#fefce8', color: '#92400e' },
    Java:       { bg: '#fce7f3', color: '#9d174d' },
    JavaScript: { bg: '#fff7ed', color: '#c2410c' },
    React:      { bg: '#ecfdf5', color: '#065f46' },
    Node:       { bg: '#f0fdf4', color: '#166534' },
};

export default function JobCard({ job, onClick }) {
    const source = SOURCE_COLORS[job.source] || { bg: '#f1f5f9', color: '#475569', border: '#cbd5e1' };
    const skill  = SKILL_COLORS[job.skill]   || { bg: '#f1f5f9', color: '#475569' };
    const snippet = job.description?.slice(0, 140) + (job.description?.length > 140 ? '…' : '');

    return (
        <div
            onClick={onClick}
            style={{
                background: 'white',
                borderRadius: '12px',
                padding: '1.2rem',
                boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
                border: '1.5px solid #f1f5f9',
                cursor: 'pointer',
                transition: 'box-shadow 0.18s, border-color 0.18s, transform 0.18s',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.7rem',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,99,235,0.14)';
                e.currentTarget.style.borderColor = '#93c5fd';
                e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.07)';
                e.currentTarget.style.borderColor = '#f1f5f9';
                e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            {/* Title row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{
                        fontSize: '0.975rem',
                        fontWeight: 600,
                        color: '#1e293b',
                        lineHeight: 1.35,
                        marginBottom: '0.2rem',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                    }}>
                        {job.title}
                    </h3>
                    <div style={{ fontSize: '0.875rem', color: '#2563eb', fontWeight: 500 }}>
                        {job.company}
                    </div>
                </div>
                <span style={{
                    padding: '0.22rem 0.55rem',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    background: source.bg,
                    color: source.color,
                    border: `1px solid ${source.border}`,
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    letterSpacing: '0.02em',
                }}>
                    {job.source}
                </span>
            </div>

            {/* Meta row */}
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    📍 {job.location}
                </span>
                <span style={{
                    padding: '0.12rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    background: skill.bg,
                    color: skill.color,
                }}>
                    {job.skill}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginLeft: 'auto' }}>
                    {timeAgo(job.scrapedAt)}
                </span>
            </div>

            {/* Snippet */}
            <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.55, margin: 0 }}>
                {snippet}
            </p>

            {/* Footer */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '0.6rem',
                borderTop: '1px solid #f1f5f9',
                marginTop: 'auto',
            }}>
                <span style={{ fontSize: '0.775rem', color: '#94a3b8' }}>View details →</span>
                <button
                    onClick={e => { e.stopPropagation(); window.open(job.url, '_blank', 'noreferrer'); }}
                    style={{
                        padding: '0.35rem 0.875rem',
                        background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        boxShadow: '0 1px 4px rgba(37,99,235,0.25)',
                    }}
                >
                    Apply ↗
                </button>
            </div>
        </div>
    );
}
