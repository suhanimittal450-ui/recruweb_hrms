import { motion } from 'framer-motion';

const EmptyState = ({ icon: Icon, title, description, action }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[var(--border-glass)] py-16 text-center"
  >
    {Icon && (
      <div className="rounded-2xl bg-primary/10 p-4 text-primary">
        <Icon size={28} />
      </div>
    )}
    <h3 className="font-display text-base font-semibold text-[var(--text-primary)]">{title}</h3>
    {description && <p className="max-w-sm text-sm text-[var(--text-muted)]">{description}</p>}
    {action}
  </motion.div>
);

export default EmptyState;
