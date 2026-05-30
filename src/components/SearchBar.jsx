import { useState } from 'react';

export default function SearchBar({ value, onChange }) {
    const [input, setInput] = useState(value || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onChange(input.trim());
    };

    const handleClear = () => {
        setInput('');
        onChange('');
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ position: 'relative', flex: 1 }}>
                <span style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '1.1rem',
                    pointerEvents: 'none',
                    userSelect: 'none',
                }}>
                    🔍
                </span>
                <input
                    type="text"
                    placeholder="Search by title, company, or keyword..."
                    value={input}
                    onChange={e => {
                        setInput(e.target.value);
                        if (!e.target.value) onChange('');
                    }}
                    style={{
                        width: '100%',
                        padding: '0.8rem 2.75rem 0.8rem 2.75rem',
                        border: '2px solid #e2e8f0',
                        borderRadius: '10px',
                        fontSize: '0.95rem',
                        outline: 'none',
                        background: 'white',
                        transition: 'border-color 0.15s',
                    }}
                    onFocus={e => (e.target.style.borderColor = '#2563eb')}
                    onBlur={e => (e.target.style.borderColor = '#e2e8f0')}
                />
                {input && (
                    <button
                        type="button"
                        onClick={handleClear}
                        style={{
                            position: 'absolute',
                            right: '0.875rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            fontSize: '1.1rem',
                            color: '#94a3b8',
                            cursor: 'pointer',
                            lineHeight: 1,
                            padding: '0.2rem',
                        }}
                    >
                        ✕
                    </button>
                )}
            </div>
            <button
                type="submit"
                style={{
                    padding: '0.8rem 1.75rem',
                    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 6px rgba(37,99,235,0.3)',
                }}
            >
                Search
            </button>
        </form>
    );
}
