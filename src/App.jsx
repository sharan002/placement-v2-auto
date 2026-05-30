import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Stats from './components/Stats';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import JobCard from './components/JobCard';
import JobDetail from './components/JobDetail';
import Pagination from './components/Pagination';
import { getJobs, getStats, getFilters } from './services/api';

const LIMIT = 12;

export default function App() {
    const [jobs, setJobs] = useState([]);
    const [total, setTotal] = useState(0);
    const [pages, setPages] = useState(1);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState({ skill: '', source: '', location: '' });

    const [stats, setStats] = useState(null);
    const [filters, setFilters] = useState({});
    const [activeJob, setActiveJob] = useState(null);

    useEffect(() => {
        getStats().then(setStats).catch(() => {});
        getFilters().then(setFilters).catch(() => {});
    }, []);

    const loadJobs = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const params = { page, limit: LIMIT, search };
            if (selected.skill) params.skill = selected.skill;
            if (selected.source) params.source = selected.source;
            if (selected.location) params.location = selected.location;
            const data = await getJobs(params);
            setJobs(data.jobs);
            setTotal(data.total);
            setPages(data.pages);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [page, search, selected]);

    useEffect(() => { loadJobs(); }, [loadJobs]);

    const handleSearch = (val) => {
        setSearch(val);
        setPage(1);
    };

    const handleFilterChange = (key, val) => {
        if (key === 'clear') {
            setSelected({ skill: '', source: '', location: '' });
        } else {
            setSelected(prev => ({ ...prev, [key]: val }));
        }
        setPage(1);
    };

    const handlePageChange = (p) => {
        setPage(p);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
            <Header />

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
                {/* Hero */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2.1rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>
                        Discover Your Next Opportunity
                    </h1>
                    <p style={{ color: '#64748b', fontSize: '1rem' }}>
                        Jobs auto-scraped from top platforms and refreshed daily
                    </p>
                </div>

                <Stats stats={stats} />
                <SearchBar value={search} onChange={handleSearch} />
                <FilterBar filters={filters} selected={selected} onChange={handleFilterChange} />

                {/* Results bar */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    fontSize: '0.875rem',
                    color: '#64748b',
                }}>
                    <span>
                        {loading ? 'Loading…' : (
                            <>
                                <strong style={{ color: '#1e293b' }}>{total}</strong> job{total !== 1 ? 's' : ''} found
                                {search && <> for <em>"{search}"</em></>}
                            </>
                        )}
                    </span>
                    {!loading && pages > 1 && (
                        <span>Page {page} of {pages}</span>
                    )}
                </div>

                {/* Error */}
                {error && (
                    <div style={{
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        borderRadius: '10px',
                        padding: '1rem 1.25rem',
                        color: '#991b1b',
                        marginBottom: '1.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                    }}>
                        <span style={{ fontSize: '1.25rem' }}>⚠️</span>
                        <div>
                            <strong>Cannot reach API server.</strong>{' '}
                            Make sure the backend is running: <code>node server.js</code> inside <code>jobAutomation</code>.
                        </div>
                    </div>
                )}

                {/* Skeleton / Loading */}
                {loading && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '1rem',
                    }}>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} style={{
                                background: 'white',
                                borderRadius: '12px',
                                padding: '1.2rem',
                                border: '1.5px solid #f1f5f9',
                                animation: 'pulse 1.5s ease-in-out infinite',
                            }}>
                                <div style={{ height: '16px', background: '#f1f5f9', borderRadius: '6px', marginBottom: '0.6rem', width: '70%' }} />
                                <div style={{ height: '14px', background: '#f1f5f9', borderRadius: '6px', marginBottom: '1rem', width: '45%' }} />
                                <div style={{ height: '12px', background: '#f1f5f9', borderRadius: '6px', marginBottom: '0.4rem' }} />
                                <div style={{ height: '12px', background: '#f1f5f9', borderRadius: '6px', width: '80%' }} />
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && jobs.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '5rem 1rem', color: '#94a3b8' }}>
                        <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🔍</div>
                        <div style={{ fontSize: '1.125rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>
                            No jobs found
                        </div>
                        <div style={{ fontSize: '0.875rem' }}>
                            Try adjusting your search terms or clearing filters
                        </div>
                    </div>
                )}

                {/* Jobs grid */}
                {!loading && jobs.length > 0 && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '1rem',
                    }}>
                        {jobs.map(job => (
                            <JobCard key={job._id} job={job} onClick={() => setActiveJob(job)} />
                        ))}
                    </div>
                )}

                <Pagination page={page} pages={pages} onPageChange={handlePageChange} />
            </div>

            {/* Skeleton animation */}
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>

            {activeJob && (
                <JobDetail job={activeJob} onClose={() => setActiveJob(null)} />
            )}
        </div>
    );
}
