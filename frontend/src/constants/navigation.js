import { LayoutDashboard, Users, Building2, Settings } from 'lucide-react';
import { ROLES } from './roles';

export const NAV_ITEMS = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: [ROLES.ADMIN, ROLES.HR, ROLES.MANAGER, ROLES.EMPLOYEE, ROLES.RECRUITER, ROLES.INTERVIEWER, ROLES.CANDIDATE],
  },
  {
    label: 'Employees',
    path: '/dashboard/employees',
    icon: Users,
    roles: [ROLES.ADMIN, ROLES.HR],
  },
  {
    label: 'Organization',
    path: '/dashboard/organization',
    icon: Building2,
    roles: [ROLES.ADMIN, ROLES.HR],
  },
  {
    label: 'Settings',
    path: '/dashboard/settings',
    icon: Settings,
    roles: [ROLES.ADMIN, ROLES.HR, ROLES.MANAGER, ROLES.EMPLOYEE, ROLES.RECRUITER, ROLES.INTERVIEWER, ROLES.CANDIDATE],
  },
];
