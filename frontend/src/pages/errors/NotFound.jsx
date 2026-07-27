import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import Button from '../../components/ui/Button';

const NotFound = () => (
  <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[var(--bg-canvas)] px-6 text-center">
    <div className="aurora-bg" />
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 font-display text-8xl font-bold gradient-text"
    >
      404
    </motion.h1>
    <p className="relative z-10 mt-4 max-w-md text-[var(--text-secondary)]">
      This page wandered off. Let&apos;s get you back to somewhere useful.
    </p>
    <Link to="/dashboard" className="relative z-10 mt-6">
      <Button icon={Home}>Back to dashboard</Button>
    </Link>
  </div>
);

export default NotFound;
