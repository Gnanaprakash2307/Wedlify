async function fetchVenue(id: string) {
  const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const res = await fetch(`${api}/api/public/venues/${id}`, { cache: 'no-store' });
  return res.json();
}

export default async function VenuePage({ params }: { params: { id: string } }) {
  const venue = await fetchVenue(params.id);
  return (
    <div>
      <h2>{venue.name}</h2>
      <p>{venue.location}</p>
      <p>Capacity: {venue.capacity}</p>
      <p>₹{venue.pricePerDay}/day</p>
      <a href={`/book?type=venue&id=${venue._id}`}>Book this venue</a>
    </div>
  );
}


