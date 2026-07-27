import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'dark',
  sidebarCollapsed: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    themeToggled: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    sidebarToggled: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
  },
});

export const { themeToggled, sidebarToggled } = uiSlice.actions;
export default uiSlice.reducer;

export const selectTheme = (state) => state.ui.theme;
export const selectSidebarCollapsed = (state) => state.ui.sidebarCollapsed;
