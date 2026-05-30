const selectStyle = {
    padding: '0.55rem 0.875rem',
    border: '1.5px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '0.875rem',
    background: 'white',
    color: '#374151',
    outline: 'none',
    minWidth: '145px',
    cursor: 'pointer',
};

export default function FilterBar({ filters, selected, onChange }) {
    const hasActive = selected.skill || selected.source || selected.location;

    return (
        <div style={{
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginBottom: '1.25rem',
        }}>
            <span style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 500, flexShrink: 0 }}>
                Filter:
            </span>

            <select
                style={selectStyle}
                value={selected.skill || ''}
                onChange={e => onChange('skill', e.target.value)}
            >
                <option value="">All Skills</option>
                {filters?.skills?.map(skill => (
                    <option key={skill} value={skill}>{skill}</option>
                ))}
            </select>

            <select
                style={selectStyle}
                value={selected.source || ''}
                onChange={e => onChange('source', e.target.value)}
            >
                <option value="">All Sources</option>
                {filters?.sources?.map(source => (
                    <option key={source} value={source}>{source}</option>
                ))}
            </select>

            <select
                style={selectStyle}
                value={selected.location || ''}
                onChange={e => onChange('location', e.target.value)}
            >
                <option value="">All Locations</option>
                {filters?.locations?.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                ))}
            </select>

            {hasActive && (
                <button
                    onClick={() => onChange('clear', null)}
                    style={{
                        padding: '0.55rem 0.875rem',
                        border: '1.5px solid #fca5a5',
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        background: '#fef2f2',
                        color: '#dc2626',
                        fontWeight: 500,
                    }}
                >
                    ✕ Clear
                </button>
            )}

            {hasActive && (
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {selected.skill && (
                        <span style={{
                            padding: '0.25rem 0.6rem',
                            background: '#eff6ff',
                            color: '#2563eb',
                            borderRadius: '20px',
                            fontSize: '0.775rem',
                            fontWeight: 500,
                            border: '1px solid #bfdbfe',
                        }}>
                            Skill: {selected.skill}
                        </span>
                    )}
                    {selected.source && (
                        <span style={{
                            padding: '0.25rem 0.6rem',
                            background: '#f0fdf4',
                            color: '#16a34a',
                            borderRadius: '20px',
                            fontSize: '0.775rem',
                            fontWeight: 500,
                            border: '1px solid #bbf7d0',
                        }}>
                            Source: {selected.source}
                        </span>
                    )}
                    {selected.location && (
                        <span style={{
                            padding: '0.25rem 0.6rem',
                            background: '#fdf4ff',
                            color: '#7e22ce',
                            borderRadius: '20px',
                            fontSize: '0.775rem',
                            fontWeight: 500,
                            border: '1px solid #e9d5ff',
                        }}>
                            📍 {selected.location}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
