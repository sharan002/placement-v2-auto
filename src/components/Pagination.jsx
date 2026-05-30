function btn(isActive, isDisabled) {
    return {
        padding: '0.45rem 0.875rem',
        border: '1.5px solid',
        borderColor: isActive ? '#2563eb' : '#e2e8f0',
        borderRadius: '8px',
        background: isActive ? '#2563eb' : 'white',
        color: isActive ? 'white' : isDisabled ? '#cbd5e1' : '#374151',
        fontSize: '0.875rem',
        fontWeight: isActive ? 600 : 400,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        minWidth: '40px',
        opacity: isDisabled ? 0.5 : 1,
        transition: 'all 0.15s',
    };
}

export default function Pagination({ page, pages, onPageChange }) {
    if (!pages || pages <= 1) return null;

    const range = 2;
    const nums = [];
    for (let i = Math.max(1, page - range); i <= Math.min(pages, page + range); i++) {
        nums.push(i);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            <button style={btn(false, page === 1)} onClick={() => page > 1 && onPageChange(page - 1)} disabled={page === 1}>
                ← Prev
            </button>

            {nums[0] > 1 && (
                <>
                    <button style={btn(false, false)} onClick={() => onPageChange(1)}>1</button>
                    {nums[0] > 2 && <span style={{ padding: '0.45rem 0.4rem', color: '#94a3b8', fontSize: '0.875rem' }}>…</span>}
                </>
            )}

            {nums.map(n => (
                <button key={n} style={btn(n === page, false)} onClick={() => onPageChange(n)}>{n}</button>
            ))}

            {nums[nums.length - 1] < pages && (
                <>
                    {nums[nums.length - 1] < pages - 1 && <span style={{ padding: '0.45rem 0.4rem', color: '#94a3b8', fontSize: '0.875rem' }}>…</span>}
                    <button style={btn(false, false)} onClick={() => onPageChange(pages)}>{pages}</button>
                </>
            )}

            <button style={btn(false, page === pages)} onClick={() => page < pages && onPageChange(page + 1)} disabled={page === pages}>
                Next →
            </button>
        </div>
    );
}
