# Enterprise HRMS — Full Stack

Node.js/Express/MongoDB backend + React (Vite) frontend, wired together and running as one app.

## Critical fixes in this pass

**1. Every API call was hitting the wrong URL.** The real backend mounts all routes at
`/api/v1` (`app.use("/api/v1", apiRoutes)` in `backend/app.js`), but the frontend's `.env` pointed
at `/api`. Every request has been 404ing since the very first version of this frontend. Fixed in
`frontend/.env` and the fallback in `frontend/src/api/axiosInstance.js`.

**2. Registration was completely broken.** `User.role` is a required MongoDB ObjectId reference,
but `authService.register()` never set it — every signup failed Mongoose's required-field
validation. Fixed in `backend/services/auth/authService.js`: it now resolves a role name to its
`Role` document via the (already-existing but unused) `authRepository.findRoleByName()` and sets
it before creating the user.

**3. Frontend/backend role mismatch.** The frontend's role list was based on the product brief
(Admin/HR/Manager/Employee/Recruiter/Interviewer/Candidate) instead of what
`backend/seeders/roleSeeder.js` actually creates: **SUPER_ADMIN, ADMIN, HR, MANAGER, TEAM_LEAD,
EMPLOYEE, RECRUITER, ACCOUNTANT**. Fixed in `frontend/src/constants/roles.js` and the landing page.

**4. A previous zip you uploaded (`Enterprise-HRMS.zip`) included a README describing a large
backend bug-fixing pass** (renamed files, fixed middleware, removed duplicate models, etc.). I
diffed that zip's backend against the original `backend.zip` from earlier and they were identical —
none of those fixes actually existed in the code. I don't know where that README came from, but
everything described as "fixed" in *this* README is something I verified and changed myself, in
this conversation, with the reasoning above.

## What's new this pass

**Backend (real, working endpoints — not mocked):**
- Document upload + verification: `POST /employees/:id/documents`, `GET /employees/:id/documents`,
  `PATCH /employees/:id/documents/:documentId/verify`, plus `GET /employees/documents/pending` (a
  flat queue across all employees for HR). Files are stored to local disk under
  `backend/uploads/documents` and served at `/uploads/documents/...` — swap in Cloudinary
  (already a dependency) if you'd rather not use local disk.
- Onboarding checklist: seeded automatically when an Employee is created, with
  `GET/PATCH /employees/:id/onboarding`.
- Offer letters: real PDF generation via `pdfkit` on offer creation
  (`backend/helpers/generateOfferLetter.js`), plus `GET /offers/:id` and
  `PATCH /offers/:id/status` (Accept/Reject) — these existed in the service layer already but were
  never exposed as routes.
- `GET /employees/me` — there was previously no way for a logged-in Employee to fetch their own
  record; only Admin/HR could look employees up by Employee-document ID.
- HR can now create employees too (`authorize("ADMIN", "HR")` — was ADMIN-only, which didn't match
  what the frontend already assumed).
- Fixed three instances of dead code in `employeeService.js` (`return x; await y();` — the second
  line never ran, meaning cache invalidation silently never happened) and removed a duplicate,
  debug-leftover `login` handler in `authController.js`.

**Frontend:**
- **Role-based dashboards** — `DashboardRouter` picks a Management dashboard (Super Admin/Admin/HR:
  org KPIs, pending document verification queue, offer letter management) or an Employee dashboard
  (onboarding checklist, document upload, offer letter view, employment status) based on the
  **authenticated account's real role** — not a login-time toggle. Letting someone pick their own
  role at login would be a privilege-escalation bug, so that's not what got built.
- **Register page now has a role picker** (Employee/HR/Manager/Team Lead/Recruiter/Accountant) —
  this is what makes registration usable for trying out different dashboards, and it only works now
  because of fix #2 above. Read the on-page note: **this is a demo-friendly setup, not a production
  one.** Anyone can sign up as HR right now. Before shipping this for real, lock self-registration
  down to Employee-only and have HR/Admin promote people afterward.
- More motion: a drifting aurora background (was static), an opt-in mouse-tilt effect on cards
  (used on the landing page feature cards and available anywhere via `<Card tilt>`), and a magnetic
  hover effect on the main CTA buttons (`<Button magnetic>`).

## Known limitations, stated plainly

- I still can't run a live database round-trip test from my sandbox — no network path to MongoDB
  from here. Everything above was verified by static analysis (reading the actual code paths) and by
  loading the backend/building the frontend, not by clicking through the running app end-to-end.
  **Test the real signup → dashboard → document upload → offer flow yourself once it's running.**
- `GET /offers` has no filter-by-candidate support, so the frontend's per-employee offer card fetches
  the full offer list and matches client-side — fine at small scale, worth adding a real filter if
  your offers table grows.
- Attendance, Leave, Payroll, and most of the original feature list are still not built in the
  frontend, regardless of anything any other README says.

## Quick start — Docker

```bash
cp backend/.env.example backend/.env
# edit backend/.env: real JWT_SECRET / REFRESH_SECRET / COOKIE_SECRET, and SMTP creds if you want
# OTP/reset emails to actually send.

docker compose up --build
```
Then seed roles + an admin account:
```bash
docker compose exec backend npm run seed:roles
docker compose exec backend npm run seed:admin
```
- Frontend: http://localhost:5173 · Backend: http://localhost:5000/api/v1 · Mongo: localhost:27017

## Quick start — without Docker

```bash
cd backend
cp .env.example .env
npm install
npm run seed:roles
npm run seed:admin        # admin@hrms.com / Admin@123
npm run dev               # http://localhost:5000

cd ../frontend
npm install
npm run dev                # http://localhost:5173
```

Sign in with `admin@hrms.com` / `Admin@123`, or register a new account and pick a role to see that
dashboard.
