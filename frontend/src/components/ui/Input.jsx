import { forwardRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const Input = forwardRef(({ label, error, type = 'text', className, id, icon: Icon, ...props }, ref) => {
  const [focused, setFocused] = useState(false);
  const inputId = id || label?.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className={clsx('relative', className)}>
      <div
        className={clsx(
          'relative rounded-xl border bg-[var(--bg-surface)]/70 transition-colors duration-200',
          error
            ? 'border-danger'
            : focused
            ? 'border-primary shadow-[0_0_0_3px_rgba(79,70,229,0.15)]'
            : 'border-[var(--border-glass)]',
        )}
      >
        {Icon && <Icon size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />}
        <input
          ref={ref}
          id={inputId}
          type={type}
          placeholder=" "
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          className={clsx(
            'peer w-full bg-transparent pt-5 pb-2 text-sm text-[var(--text-primary)] outline-none rounded-xl',
            Icon ? 'pl-10 pr-4' : 'px-4',
          )}
          {...props}
        />
        {label && (
          <label
            htmlFor={inputId}
            className={clsx(
              'pointer-events-none absolute top-3.5 text-sm text-[var(--text-muted)] transition-all duration-200',
              Icon ? 'left-10' : 'left-4',
              'peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-primary',
              'peer-[&:not(:placeholder-shown)]:top-1.5 peer-[&:not(:placeholder-shown)]:text-[10px]',
            )}
          >
            {label}
          </label>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="mt-1 text-xs text-danger"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
