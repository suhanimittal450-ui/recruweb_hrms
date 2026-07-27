import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Menu, X } from 'lucide-react';
import clsx from 'clsx';
import Button from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';

const LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Roles', href: '#roles' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

const PublicNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={clsx(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        scrolled ? 'bg-[var(--bg-surface)]/80 backdrop-blur-xl shadow-glass' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-grad-primary text-white shadow-glow">
            <Sparkles size={17} />
          </div>
          <span className="font-display text-base font-semibold text-[var(--text-primary)]">HRMS Nova</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link to="/login">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link to="/register">
            <Button size="sm">Get started</Button>
          </Link>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-1 border-t border-[var(--border-glass)] bg-[var(--bg-surface)] px-6 py-4 md:hidden"
        >
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="block py-2 text-sm text-[var(--text-secondary)]" onClick={() => setMobileOpen(false)}>
              {l.label}
            </a>
          ))}
          <div className="mt-3 flex gap-3">
            <Link to="/login" className="flex-1">
              <Button variant="outline" size="sm" className="w-full">Sign in</Button>
            </Link>
            <Link to="/register" className="flex-1">
              <Button size="sm" className="w-full">Get started</Button>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default PublicNavbar;
