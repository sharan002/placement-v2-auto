const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export async function getJobs(params = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
        if (v !== '' && v !== null && v !== undefined) query.append(k, v);
    });
    const res = await fetch(`${API_BASE}/jobs?${query}`);
    if (!res.ok) throw new Error('Failed to fetch jobs');
    return res.json();
}

export async function getJob(id) {
    const res = await fetch(`${API_BASE}/jobs/${id}`);
    if (!res.ok) throw new Error('Failed to fetch job');
    return res.json();
}

export async function getStats() {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
}

export async function getFilters() {
    const res = await fetch(`${API_BASE}/filters`);
    if (!res.ok) throw new Error('Failed to fetch filters');
    return res.json();
}
