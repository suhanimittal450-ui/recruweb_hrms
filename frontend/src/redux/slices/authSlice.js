import { createSlice } from '@reduxjs/toolkit';
import { setAccessToken, clearAccessToken } from '../../utils/tokenStorage';

const initialState = {
  user: null, // populated User doc (with populated `role`) returned by backend
  isAuthenticated: false,
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    credentialsSet: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.isAuthenticated = true;
      state.status = 'succeeded';
      state.error = null;
      setAccessToken(accessToken);
      if (refreshToken) {
        localStorage.setItem('hrms_refresh_token', JSON.stringify(refreshToken));
      }
    },
    profileLoaded: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    authLoading: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    authFailed: (state, action) => {
      state.status = 'failed';
      state.error = action.payload || 'Something went wrong';
    },
    loggedOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
      clearAccessToken();
      localStorage.removeItem('hrms_refresh_token');
    },
  },
});

export const { credentialsSet, profileLoaded, authLoading, authFailed, loggedOut } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserRole = (state) => {
  const role = state.auth.user?.role;
  return typeof role === 'string' ? role : role?.name;
};
