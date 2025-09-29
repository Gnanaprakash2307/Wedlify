async function fetchChefs() {
  const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const res = await fetch(`${api}/api/public/chefs`, { cache: 'no-store' });
  return res.json();
}

export default async function ChefsPage() {
  const chefs = await fetchChefs();
  return (
    <div>
      <h2>Chefs / Catering</h2>
      <ul>
        {chefs.map((c: any) => (
          <li key={c._id}>
            <strong>{c.user?.name}</strong> — {c.cuisine} — {c.location}
            <div>
              {c.packages?.map((p: any, i: number) => (
                <div key={i} style={{ border: '1px solid #eee', margin: '8px 0', padding: 8 }}>
                  <div>{p.name} — ₹{p.pricePerPerson}/person</div>
                  <small>{p.items?.map((it: any) => it.name).join(', ')}</small>
                </div>
              ))}
            </div>
            <a href={`/book?type=chef&id=${c._id}`}>Book</a>
          </li>
        ))}
      </ul>
    </div>
  );
}


