import { motion } from 'framer-motion';

const PageLoader = ({ label = 'Loading HRMS...' }) => (
  <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[var(--bg-canvas)]">
    <div className="aurora-bg" />
    <div className="relative z-10 flex flex-col items-center gap-4">
      <motion.div
        className="h-14 w-14 rounded-2xl bg-grad-primary"
        animate={{ rotate: 360, borderRadius: ['30%', '50%', '30%'] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <p className="font-display text-sm font-medium text-[var(--text-secondary)]">{label}</p>
    </div>
  </div>
);

export default PageLoader;
