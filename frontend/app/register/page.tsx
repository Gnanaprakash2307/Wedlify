"use client";

import { useState } from 'react';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'organizer' });

  async function register(e: React.FormEvent) {
    e.preventDefault();
    const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const res = await fetch(`${api}/api/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      location.href = '/dashboard';
    } else {
      alert(data.message || 'Registration failed');
    }
  }

  return (
    <form onSubmit={register} style={{ display: 'grid', gap: 8, maxWidth: 360 }}>
      <h2>Register</h2>
      <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="organizer">Organizer</option>
        <option value="student">Student</option>
        <option value="chef">Chef</option>
      </select>
      <button type="submit">Create account</button>
    </form>
  );
}


