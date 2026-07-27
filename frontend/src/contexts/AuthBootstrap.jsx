import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authService } from '../services/authService';
import { setAccessToken } from '../utils/tokenStorage';
import { credentialsSet, loggedOut, selectIsAuthenticated } from '../redux/slices/authSlice';
import { registerAuthFailureHandler } from '../api/axiosInstance';
import PageLoader from '../components/ui/PageLoader';

// On a hard refresh, redux-persist restores `isAuthenticated`/`user`, but the
// access token itself lives only in memory (tokenStorage.js) and is lost.
// This component silently exchanges the persisted refresh token for a fresh
// access token before the protected app renders, so refreshing the page
// doesn't kick the user out.
const AuthBootstrap = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    registerAuthFailureHandler(() => dispatch(loggedOut()));
  }, [dispatch]);

  useEffect(() => {
    const restore = async () => {
      if (!isAuthenticated) {
        setReady(true);
        return;
      }
      try {
        const storedRefreshToken = JSON.parse(localStorage.getItem('hrms_refresh_token') || 'null');
        if (!storedRefreshToken) throw new Error('No refresh token');
        const res = await authService.refreshToken(storedRefreshToken);
        setAccessToken(res.data.accessToken);
        const profileRes = await authService.profile();
        dispatch(credentialsSet({ user: profileRes.data, accessToken: res.data.accessToken, refreshToken: res.data.refreshToken }));
      } catch {
        dispatch(loggedOut());
      } finally {
        setReady(true);
      }
    };
    restore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!ready) return <PageLoader label="Restoring your session..." />;
  return children;
};

export default AuthBootstrap;
