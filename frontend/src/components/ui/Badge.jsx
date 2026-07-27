import clsx from 'clsx';

const toneMap = {
  Active: 'bg-success/15 text-success',
  Inactive: 'bg-slate-400/15 text-slate-500',
  'On Leave': 'bg-warning/15 text-warning',
  Resigned: 'bg-danger/15 text-danger',
  Terminated: 'bg-danger/15 text-danger',
  success: 'bg-success/15 text-success',
  warning: 'bg-warning/15 text-warning',
  danger: 'bg-danger/15 text-danger',
  neutral: 'bg-slate-400/15 text-slate-500',
  primary: 'bg-primary/15 text-primary',
};

const Badge = ({ children, tone }) => {
  const resolvedTone = toneMap[tone] || toneMap[children] || toneMap.neutral;
  return (
    <span className={clsx('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium', resolvedTone)}>
      {children}
    </span>
  );
};

export default Badge;
