async function fetchServers(search: string) {
  const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const res = await fetch(`${api}/api/public/servers${search ? `?${search}` : ''}`, { cache: 'no-store' });
  return res.json();
}

export default async function ServersPage({ searchParams }: { searchParams: { [k: string]: string } }) {
  const query = new URLSearchParams(searchParams as any).toString();
  const servers = await fetchServers(query);
  return (
    <div>
      <h2>Student Servers</h2>
      <form method="get" style={{ display: 'flex', gap: 8, margin: '8px 0' }}>
        <input name="location" placeholder="Location" />
        <input name="availability" placeholder="Days (comma separated)" />
        <button type="submit">Filter</button>
      </form>
      <ul>
        {servers.map((s: any) => (
          <li key={s._id}>
            <strong>{s.user?.name}</strong> — {s.location} — ₹{s.hourlyRate}/hr
          </li>
        ))}
      </ul>
    </div>
  );
}


