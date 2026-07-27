import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import clsx from 'clsx';
import { selectTheme, themeToggled } from '../../redux/slices/uiSlice';

const ThemeToggle = ({ className }) => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  return (
    <button
      onClick={() => dispatch(themeToggled())}
      aria-label="Toggle theme"
      className={clsx(
        'grid h-10 w-10 place-items-center rounded-xl text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-surface-alt)]',
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
