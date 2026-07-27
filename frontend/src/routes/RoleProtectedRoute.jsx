import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../redux/slices/authSlice';

const RoleProtectedRoute = ({ allowedRoles }) => {
  const role = useSelector(selectUserRole);

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard/403" replace />;
  }

  return <Outlet />;
};

export default RoleProtectedRoute;
