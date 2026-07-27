import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import AuthBootstrap from './contexts/AuthBootstrap';
import AppRoutes from './routes/AppRoutes';
import { selectTheme } from './redux/slices/uiSlice';
import { useEffect } from 'react';

const App = () => {
  const theme = useSelector(selectTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <AuthBootstrap>
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-glass)',
            borderRadius: '12px',
            fontSize: '14px',
          },
        }}
      />
    </AuthBootstrap>
  );
};

export default App;
