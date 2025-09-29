async function fetchVenues() {
  const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const res = await fetch(`${api}/api/public/venues`, { cache: 'no-store' });
  return res.json();
}

export default async function VenuesPage() {
  const venues = await fetchVenues();
  return (
    <div>
      <h2>Venues</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
        {venues.map((v: any) => (
          <a key={v._id} href={`/venues/${v._id}`} style={{ border: '1px solid #eee', padding: 12, borderRadius: 8 }}>
            <h3>{v.name}</h3>
            <p>{v.location}</p>
            <p>Capacity: {v.capacity}</p>
            <p>₹{v.pricePerDay}/day</p>
          </a>
        ))}
      </div>
    </div>
  );
}


