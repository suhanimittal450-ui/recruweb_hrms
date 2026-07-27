import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ChevronsLeft, ChevronsRight, Sparkles } from 'lucide-react';
import clsx from 'clsx';
import { NAV_ITEMS } from '../../constants/navigation';
import { selectSidebarCollapsed, sidebarToggled } from '../../redux/slices/uiSlice';
import { selectUserRole } from '../../redux/slices/authSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const collapsed = useSelector(selectSidebarCollapsed);
  const role = useSelector(selectUserRole);

  const visibleItems = NAV_ITEMS.filter((item) => !role || item.roles.includes(role));

  return (
    <motion.aside
      animate={{ width: collapsed ? 84 : 272 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-20 hidden shrink-0 flex-col border-r border-[var(--border-glass)] bg-[var(--bg-surface)]/80 backdrop-blur-xl md:flex"
    >
      <div className="flex h-[72px] items-center gap-3 px-5">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-grad-primary text-white shadow-glow">
          <Sparkles size={18} />
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-display text-base font-semibold gradient-text"
          >
            HRMS Nova
          </motion.span>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {visibleItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) =>
              clsx(
                'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200',
                isActive
                  ? 'bg-grad-primary text-white shadow-glow'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-alt)] hover:text-[var(--text-primary)]',
              )
            }
          >
            <item.icon size={18} className="shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={() => dispatch(sidebarToggled())}
        className="m-3 flex items-center justify-center gap-2 rounded-xl border border-[var(--border-glass)] py-2 text-xs text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-surface-alt)]"
      >
        {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
        {!collapsed && 'Collapse'}
      </button>
    </motion.aside>
  );
};

export default Sidebar;
