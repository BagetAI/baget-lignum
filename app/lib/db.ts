
export async function getArtisanCount() {
  const res = await fetch('https://app.baget.ai/api/public/databases/cb7a664f-0cbf-424c-8c9d-34ca7e4cf0c8/count');
  const data = await res.json();
  return data.count;
}

export async function getMoldingCount() {
  const res = await fetch('https://app.baget.ai/api/public/databases/233c2879-62e5-4d8a-9af7-1d944592b840/count');
  const data = await res.json();
  return data.count;
}

export async function getArtisans() {
  const res = await fetch('https://app.baget.ai/api/public/databases/cb7a664f-0cbf-424c-8c9d-34ca7e4cf0c8/rows');
  const data = await res.json();
  return data.rows;
}
