import { forwardRef } from 'react';
import clsx from 'clsx';

const Select = forwardRef(({ label, error, options = [], placeholder = 'Select...', className, id, ...props }, ref) => {
  const selectId = id || label?.replace(/\s+/g, '-').toLowerCase();
  return (
    <div className={clsx('relative', className)}>
      {label && (
        <label htmlFor={selectId} className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={clsx(
          'w-full appearance-none rounded-xl border bg-[var(--bg-surface)]/70 px-4 py-2.5 text-sm text-[var(--text-primary)]',
          'outline-none transition-colors duration-200',
          error ? 'border-danger' : 'border-[var(--border-glass)] focus:border-primary',
        )}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
