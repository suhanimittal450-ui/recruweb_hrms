import { useSelector } from 'react-redux';
import { selectUserRole } from '../../redux/slices/authSlice';
import { ROLE_ACCESS } from '../../constants/roles';
import ManagementDashboard from './ManagementDashboard';
import EmployeeDashboard from './EmployeeDashboard';

// Deliberately NOT a login-time "pick your role" toggle — the dashboard
// shown is always determined by the authenticated account's real role from
// the backend. Letting someone choose their own role at sign-in would be a
// privilege-escalation bug, not a feature.
const DashboardRouter = () => {
  const role = useSelector(selectUserRole);
  const isManagement = ROLE_ACCESS.employees.includes(role);

  return isManagement ? <ManagementDashboard /> : <EmployeeDashboard />;
};

export default DashboardRouter;
