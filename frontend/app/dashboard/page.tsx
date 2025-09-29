"use client";

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const u = localStorage.getItem('user');
    const t = localStorage.getItem('token');
    if (u && t) {
      setUser(JSON.parse(u));
      fetchBookings(t);
    }
  }, []);

  async function fetchBookings(token: string) {
    const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const res = await fetch(`${api}/api/bookings/me`, { headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) setBookings(await res.json());
  }

  if (!user) return <p>Please login as organizer to view bookings.</p>;

  return (
    <div>
      <h2>Organizer Dashboard</h2>
      <ul>
        {bookings.map((b) => (
          <li key={b._id}>
            <strong>{b.serviceType}</strong> — {b.date} {b.time} — qty {b.quantity} — {b.status} — {b.paymentStatus}
          </li>
        ))}
      </ul>
    </div>
  );
}


