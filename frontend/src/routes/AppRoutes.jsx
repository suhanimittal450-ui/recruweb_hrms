import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/marketing/LandingPage';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardRouter from '../pages/dashboard/DashboardRouter';
import Settings from '../pages/dashboard/Settings';
import EmployeeList from '../pages/employees/EmployeeList';
import AddEmployee from '../pages/employees/AddEmployee';
import EmployeeDetail from '../pages/employees/EmployeeDetail';
import EditEmployee from '../pages/employees/EditEmployee';
import OrganizationSettings from '../pages/organization/OrganizationSettings';
import Forbidden from '../pages/errors/Forbidden';
import NotFound from '../pages/errors/NotFound';
import ProtectedRoute from './ProtectedRoute';
import RoleProtectedRoute from './RoleProtectedRoute';
import { ROLE_ACCESS } from '../constants/roles';

const AppRoutes = () => (
  <Routes>
    {/* Public marketing */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />

    {/* Authenticated app */}
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardRouter />} />
        <Route path="403" element={<Forbidden />} />
        <Route path="settings" element={<Settings />} />

        <Route element={<RoleProtectedRoute allowedRoles={ROLE_ACCESS.employees} />}>
          <Route path="employees" element={<EmployeeList />} />
          <Route path="employees/new" element={<AddEmployee />} />
          <Route path="employees/:id" element={<EmployeeDetail />} />
          <Route path="employees/:id/edit" element={<EditEmployee />} />
        </Route>

        <Route element={<RoleProtectedRoute allowedRoles={ROLE_ACCESS.organization} />}>
          <Route path="organization" element={<OrganizationSettings />} />
        </Route>
      </Route>
    </Route>

    <Route path="/404" element={<NotFound />} />
    <Route path="*" element={<Navigate to="/404" replace />} />
  </Routes>
);

export default AppRoutes;
