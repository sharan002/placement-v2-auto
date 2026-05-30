export default function Header() {
    return (
        <header style={{
            background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)',
            color: 'white',
            padding: '0 2rem',
            boxShadow: '0 2px 12px rgba(37,99,235,0.35)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '64px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'rgba(255,255,255,0.18)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.4rem',
                    }}>
                        🤖
                    </div>
                    <div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.5px', lineHeight: 1.2 }}>
                            JobAuto
                        </div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.75, lineHeight: 1 }}>
                            AI-Powered Job Discovery
                        </div>
                    </div>
                </div>
                <div style={{
                    fontSize: '0.8rem',
                    opacity: 0.8,
                    background: 'rgba(255,255,255,0.12)',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.2)',
                }}>
                    Auto-scraped · Daily refresh
                </div>
            </div>
        </header>
    );
}
