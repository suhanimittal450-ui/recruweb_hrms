import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Card from './Card';
import Counter from './Counter';
import clsx from 'clsx';

const StatCard = ({ icon: Icon, label, value, suffix = '', trend, tone = 'primary', delay = 0 }) => {
  const toneClasses = {
    primary: 'from-primary/20 to-primary/5 text-primary',
    secondary: 'from-secondary/20 to-secondary/5 text-secondary',
    accent: 'from-accent/20 to-accent/5 text-accent',
    success: 'from-success/20 to-success/5 text-success',
    warning: 'from-warning/20 to-warning/5 text-warning',
  };

  return (
    <Card className="relative overflow-hidden" hover>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay, duration: 0.3 }}
        className={clsx('mb-4 inline-flex rounded-xl bg-gradient-to-br p-3', toneClasses[tone])}
      >
        <Icon size={20} />
      </motion.div>
      <p className="text-sm text-[var(--text-muted)]">{label}</p>
      <div className="mt-1 flex items-end justify-between">
        <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
          <Counter value={value} suffix={suffix} />
        </h3>
        {trend != null && (
          <span
            className={clsx(
              'flex items-center gap-0.5 text-xs font-medium',
              trend >= 0 ? 'text-success' : 'text-danger',
            )}
          >
            {trend >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
