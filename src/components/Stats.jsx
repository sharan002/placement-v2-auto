const statItems = (stats) => [
    { label: 'Total Jobs', value: stats?.total ?? '—', icon: '💼', color: '#2563eb' },
    { label: 'Sources', value: stats?.sources?.length ?? '—', icon: '🌐', color: '#0891b2' },
    { label: 'Skills Tracked', value: stats?.skills?.length ?? '—', icon: '🎯', color: '#7c3aed' },
];

export default function Stats({ stats }) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            marginBottom: '1.75rem',
        }}>
            {statItems(stats).map(item => (
                <div key={item.label} style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '1rem 1.25rem',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
                    border: '1px solid #f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.875rem',
                }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '10px',
                        background: `${item.color}18`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        flexShrink: 0,
                    }}>
                        {item.icon}
                    </div>
                    <div>
                        <div style={{ fontSize: '1.75rem', fontWeight: 700, color: item.color, lineHeight: 1.1 }}>
                            {item.value}
                        </div>
                        <div style={{ fontSize: '0.775rem', color: '#64748b', marginTop: '0.1rem' }}>
                            {item.label}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
