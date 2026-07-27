import { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, LogOut, User, ChevronDown } from 'lucide-react';
import { selectCurrentUser, selectUserRole } from '../../redux/slices/authSlice';
import { ROLE_LABELS } from '../../constants/roles';
import { useAuth } from '../../hooks/useAuth';
import ThemeToggle from '../ui/ThemeToggle';

const Topbar = () => {
  const user = useSelector(selectCurrentUser);
  const role = useSelector(selectUserRole);
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const initials = `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`.toUpperCase() || 'U';

  return (
    <header className="sticky top-0 z-10 flex h-[72px] items-center justify-between gap-4 border-b border-[var(--border-glass)] bg-[var(--bg-surface)]/70 px-6 backdrop-blur-xl">
      <div className="relative hidden max-w-sm flex-1 md:block">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
        <input
          type="text"
          placeholder="Search employees, records..."
          className="w-full rounded-xl border border-[var(--border-glass)] bg-[var(--bg-surface-alt)] py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />

        <button
          className="relative grid h-10 w-10 place-items-center rounded-xl text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-surface-alt)]"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent" />
        </button>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition-colors hover:bg-[var(--bg-surface-alt)]"
          >
            <div className="grid h-8 w-8 place-items-center rounded-full bg-grad-primary text-xs font-semibold text-white">
              {initials}
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium leading-tight text-[var(--text-primary)]">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs leading-tight text-[var(--text-muted)]">{ROLE_LABELS[role] || role}</p>
            </div>
            <ChevronDown size={14} className="text-[var(--text-muted)]" />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="glass-card !bg-[var(--bg-surface)] absolute right-0 mt-2 w-48 overflow-hidden p-1.5"
              >
                <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-surface-alt)]">
                  <User size={15} /> Profile
                </button>
                <button
                  onClick={logout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-danger hover:bg-danger/10"
                >
                  <LogOut size={15} /> Sign out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
