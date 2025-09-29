export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'sans-serif', margin: 0 }}>
        <nav style={{ display: 'flex', gap: 16, padding: 16, borderBottom: '1px solid #eee' }}>
          <a href="/">Wedlify</a>
          <a href="/servers">Servers</a>
          <a href="/venues">Venues</a>
          <a href="/chefs">Chefs</a>
          <a href="/dashboard">Dashboard</a>
          <span style={{ marginLeft: 'auto' }}>
            <a href="/login">Login</a>
            {' | '}
            <a href="/register">Register</a>
          </span>
        </nav>
        <main style={{ padding: 16 }}>{children}</main>
      </body>
    </html>
  );
}


