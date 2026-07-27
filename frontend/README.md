# HRMS Nova — Frontend

A real, backend-connected frontend for your Node.js + Express + MongoDB HRMS API.
**No mock data. No fake endpoints.** Every screen calls your actual backend.

## ⚠️ Before anything else: rotate your credentials

Your uploaded `backend.zip` contained a live-looking MongoDB Atlas connection string and an SMTP
app password inside `.env`. Rotate both if this project or repo has been shared anywhere.

## What's included in this build (Phase 1)

This is a real, honest starting point — not a mockup of a 50-page product. Faking that much
"complete" enterprise software in one shot produces broken pages pretending to work; this instead
gives you a fully wired, production-quality foundation you can extend module by module.

Built and verified (`npm run build` passes):

- **Public marketing site** — animated 3D landing page (hero globe, feature grid, roles, pricing, CTA)
- **Auth** — Login, Register, Forgot Password, Reset Password (OTP), all hitting real `/auth/*` routes
- **JWT access + refresh token flow** — access token kept in memory, refresh token persisted, automatic
  silent refresh on 401 and on page reload (see `src/api/axiosInstance.js` and `src/contexts/AuthBootstrap.jsx`)
- **Role-based routing** — Admin/HR/Manager/Employee/Recruiter/Interviewer/Candidate, enforced via
  `RoleProtectedRoute` against `src/constants/roles.js`
- **Dashboard shell** — animated glass sidebar/topbar, dark/light theme, live KPI cards + chart from
  your real `/dashboard` endpoint
- **Employee Management (full CRUD)** — list with search/filter/pagination, a 2-step "Add Employee"
  wizard (creates the `User` via `/auth/register`, then the `Employee` profile via `/employees`,
  matching your schema exactly), edit, delete, detail view
- **Organization setup (full CRUD)** — Companies, Branches, Departments, Designations — required
  because your `Employee` schema references all four

## Not yet built

Attendance, Leave, Payroll, Recruitment, Assets, Performance/KPI, Training, Reports/Analytics beyond
the dashboard, notifications center, real-time chat/socket features, and the other marketing pages
(About/Careers/Pricing-as-a-page/FAQ/Privacy/Terms — the landing page has pricing/features inline).
Tell me which to build next and I'll wire it to the matching backend routes the same way.

## Getting it running

**1. Backend** (from your `backend.zip`, unzipped):
```bash
npm install
npm run seed:roles   # creates ADMIN/HR/MANAGER/EMPLOYEE/RECRUITER/INTERVIEWER/CANDIDATE roles
npm run seed:admin   # creates admin@hrms.com / Admin@123
npm run dev          # starts on http://localhost:5000
```

**2. Frontend** (this project):
```bash
npm install
npm run dev          # starts on http://localhost:5173
```

The API base URL is set in `.env` (`VITE_API_BASE_URL=http://localhost:5000/api`) — change it if
your backend runs elsewhere.

Sign in at `/login` with `admin@hrms.com` / `Admin@123`, or register a new account at `/register`.

## Architecture notes

- **State**: Redux Toolkit + RTK Query, with a shared Axios instance (`src/api/axiosInstance.js`) so
  every RTK Query call also goes through the JWT/refresh interceptor — see `src/redux/api/axiosBaseQuery.js`.
- **Persistence**: `redux-persist` persists `auth` (user + isAuthenticated) and `ui` (theme, sidebar)
  to localStorage. The access token itself is **not** persisted — it's held in memory
  (`src/utils/tokenStorage.js`) and silently re-issued from the refresh token on reload.
- **Forms**: React Hook Form + Zod, with schemas in `src/utils/validationSchemas.js` mirrored from
  your backend validators — keep these in sync if you change backend validation.
- **Styling**: Tailwind CSS drives the design system (tokens in `tailwind.config.js` and
  `src/styles/variables.scss`), with SCSS for glass/aurora/skeleton utility classes.
  **Bootstrap and React Bootstrap are installed** (per the requested stack) but their global CSS is
  **not imported** in `main.jsx` — mixing Bootstrap's resets with the Tailwind-driven glass/gradient
  design would visually clash. Import `bootstrap/dist/css/bootstrap.min.css` yourself if you want to
  use specific React Bootstrap components; you'll want to scope or override its styles where it meets
  the custom UI kit in `src/components/ui/`.
- **3D**: React Three Fiber + Drei, used decoratively (`src/components/three/`) — not tied to any data.
- **Folder structure**: matches your requested layout — `api/ services/ hooks/ redux/ pages/
  components/ layouts/ routes/ contexts/ constants/ utils/`.

## Known backend gap worth knowing about

There's no `GET /users` (or similar) list endpoint, so the Employee wizard can't offer a "pick an
existing user" dropdown — it always creates a brand-new `User` in Step 1. If you already have users
without an Employee profile, you'll want a small backend endpoint to list/search unlinked users so
the frontend can attach an Employee record to them instead of always registering a new account.
