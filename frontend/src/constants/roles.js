// Mirrors the `Role.name` values actually created by
// backend/seeders/roleSeeder.js (verified against the uploaded backend).
// NOTE: earlier builds of this frontend assumed RECRUITER/INTERVIEWER/
// CANDIDATE roles based on the product brief — the real seeder creates
// SUPER_ADMIN/TEAM_LEAD/ACCOUNTANT instead. Keep this in sync if you change
// backend/seeders/roleSeeder.js.
export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  HR: 'HR',
  MANAGER: 'MANAGER',
  TEAM_LEAD: 'TEAM_LEAD',
  EMPLOYEE: 'EMPLOYEE',
  RECRUITER: 'RECRUITER',
  ACCOUNTANT: 'ACCOUNTANT',
};

export const ALL_ROLES = Object.values(ROLES);

export const ROLE_LABELS = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Administrator',
  HR: 'HR',
  MANAGER: 'Manager',
  TEAM_LEAD: 'Team Lead',
  EMPLOYEE: 'Employee',
  RECRUITER: 'Recruiter',
  ACCOUNTANT: 'Accountant',
};

// Which roles can reach which top-level areas. Used by RoleProtectedRoute.
export const ROLE_ACCESS = {
  employees: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.HR],
  organization: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.HR],
  dashboard: ALL_ROLES,
};
