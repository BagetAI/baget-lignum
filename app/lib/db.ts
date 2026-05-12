
const API_BASE = 'https://app.baget.ai/api/public/databases';

export async function getArtisanCount() {
  const res = await fetch(`${API_BASE}/cb7a664f-0cbf-424c-8c9d-34ca7e4cf0c8/count`, { cache: 'no-store' });
  const data = await res.json();
  return data.count;
}

export async function getMoldingCount() {
  const res = await fetch(`${API_BASE}/233c2879-62e5-4d8a-9af7-1d944592b840/count`, { cache: 'no-store' });
  const data = await res.json();
  return data.count;
}

export async function getArtisans() {
  const res = await fetch(`${API_BASE}/cb7a664f-0cbf-424c-8c9d-34ca7e4cf0c8/rows`, { cache: 'no-store' });
  const data = await res.json();
  return data.rows;
}

export async function getMoldingCatalog() {
  const res = await fetch(`${API_BASE}/233c2879-62e5-4d8a-9af7-1d944592b840/rows`, { cache: 'no-store' });
  const data = await res.json();
  return data.rows;
}

export async function getLeads() {
  const res = await fetch(`${API_BASE}/9e7f377e-4694-4f23-a830-dbab8609c3f9/rows`, { cache: 'no-store' });
  const data = await res.json();
  return data.rows;
}
