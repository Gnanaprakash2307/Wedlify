"use client";

import { useEffect, useState } from 'react';

export default function BookPage() {
  const [form, setForm] = useState({ serviceType: 'venue', serviceRef: '', date: '', time: '', quantity: 1, amount: 0 });
  const [token, setToken] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type') || 'venue';
    const id = params.get('id') || '';
    setForm((f) => ({ ...f, serviceType: type, serviceRef: id }));
    setToken(localStorage.getItem('token') || '');
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const res = await fetch(`${api}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      alert('Booking created. Proceeding to mock payment...');
      const pay = await fetch(`${api}/api/bookings/${data._id}/pay`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
      if (pay.ok) alert('Payment success. Booking confirmed.');
    } else {
      alert(data.message || 'Failed');
    }
  }

  return (
    <div>
      <h2>Book Service</h2>
      <p>Requires organizer login.</p>
      <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 360 }}>
        <select value={form.serviceType} onChange={(e) => setForm({ ...form, serviceType: e.target.value })}>
          <option value="server">Server</option>
          <option value="venue">Venue</option>
          <option value="chef">Chef</option>
        </select>
        <input placeholder="Service ID" value={form.serviceRef} onChange={(e) => setForm({ ...form, serviceRef: e.target.value })} />
        <input placeholder="Date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <input placeholder="Time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
        <input type="number" placeholder="Quantity" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} />
        <input type="number" placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} />
        <button type="submit">Create Booking</button>
      </form>
    </div>
  );
}


