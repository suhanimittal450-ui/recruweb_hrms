import { useSelector } from 'react-redux';
import { Moon, Sun, User, Shield } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { selectCurrentUser } from '../../redux/slices/authSlice';
import { selectTheme, themeToggled } from '../../redux/slices/uiSlice';
import { ROLE_LABELS } from '../../constants/roles';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Settings = () => {
  const user = useSelector(selectCurrentUser);
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-[var(--text-primary)]">Settings</h1>
        <p className="text-sm text-[var(--text-muted)]">Manage your account and preferences.</p>
      </div>

      <Card>
        <h3 className="mb-4 flex items-center gap-2 font-display text-sm font-semibold text-[var(--text-primary)]">
          <User size={16} /> Profile
        </h3>
        <div className="space-y-2 text-sm">
          <p className="text-[var(--text-secondary)]">
            Name: <span className="text-[var(--text-primary)]">{user?.firstName} {user?.lastName}</span>
          </p>
          <p className="text-[var(--text-secondary)]">
            Email: <span className="text-[var(--text-primary)]">{user?.email}</span>
          </p>
          <p className="text-[var(--text-secondary)] flex items-center gap-1.5">
            <Shield size={13} /> Role: <span className="text-[var(--text-primary)]">{ROLE_LABELS[user?.role?.name || user?.role] || '—'}</span>
          </p>
        </div>
      </Card>

      <Card>
        <h3 className="mb-4 font-display text-sm font-semibold text-[var(--text-primary)]">Appearance</h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-[var(--text-secondary)]">Theme</p>
          <Button variant="outline" size="sm" icon={theme === 'dark' ? Sun : Moon} onClick={() => dispatch(themeToggled())}>
            Switch to {theme === 'dark' ? 'light' : 'dark'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
