// Centralized accessors for the access token used by the Axios interceptor.
// The source of truth is the Redux store (persisted via redux-persist), but
// the Axios instance is created outside of React, so we keep a lightweight
// mirror here that the auth slice keeps in sync via setAccessToken/clear.

let accessToken = null;

export const getAccessToken = () => accessToken;

export const setAccessToken = (token) => {
  accessToken = token || null;
};

export const clearAccessToken = () => {
  accessToken = null;
};
