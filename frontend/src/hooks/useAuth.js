import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../services/authService';
import {
  credentialsSet,
  authLoading,
  authFailed,
  loggedOut,
  selectCurrentUser,
  selectIsAuthenticated,
  selectUserRole,
} from '../redux/slices/authSlice';

const extractErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.response?.data?.errors?.[0]?.msg ||
  error?.message ||
  'Something went wrong. Please try again.';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectUserRole);

  const login = useCallback(
    async ({ email, password }) => {
      dispatch(authLoading());
      try {
        const res = await authService.login({ email, password });
        const { user: loggedInUser, accessToken, refreshToken } = res.data;
        dispatch(credentialsSet({ user: loggedInUser, accessToken, refreshToken }));
        toast.success('Welcome back!');
        return loggedInUser;
      } catch (error) {
        const message = extractErrorMessage(error);
        dispatch(authFailed(message));
        toast.error(message);
        throw error;
      }
    },
    [dispatch],
  );

  const register = useCallback(
    async (payload) => {
      dispatch(authLoading());
      try {
        const res = await authService.register(payload);
        toast.success('Account created. You can now sign in.');
        return res.data;
      } catch (error) {
        const message = extractErrorMessage(error);
        dispatch(authFailed(message));
        toast.error(message);
        throw error;
      }
    },
    [dispatch],
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // Ignore network errors on logout — we clear local state regardless.
    } finally {
      dispatch(loggedOut());
      navigate('/login', { replace: true });
    }
  }, [dispatch, navigate]);

  return { user, role, isAuthenticated, login, register, logout };
};

export { extractErrorMessage };
