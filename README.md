Wedlify MVP

Monorepo for Wedlify MVP: Next.js frontend + Express/MongoDB backend.

Quickstart

Backend
- Copy `backend/.env.example` to `backend/.env` and fill values
- Install and run:
- `cd backend`
- `npm install`
- `npm run dev`

Frontend
- Create `frontend/.env.local` with `NEXT_PUBLIC_API_URL=http://localhost:4000`
- Install and run:
- `cd frontend`
- `npm install`
- `npm run dev`

Default ports
- Backend: 4000
- Frontend: 3000

Features
- Auth with roles: organizer, student, chef
- Browse servers, venues, chefs
- Booking forms and organizer dashboard
- Admin verification for student servers
- Mock payments hook and simple reviews


