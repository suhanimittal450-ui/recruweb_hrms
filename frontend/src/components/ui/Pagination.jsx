import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

const Pagination = ({ page, pages, onChange }) => {
  if (!pages || pages <= 1) return null;

  const items = [];
  const windowSize = 1;
  for (let i = 1; i <= pages; i += 1) {
    if (i === 1 || i === pages || Math.abs(i - page) <= windowSize) {
      items.push(i);
    } else if (items[items.length - 1] !== '...') {
      items.push('...');
    }
  }

  return (
    <div className="flex items-center justify-center gap-1.5">
      <button
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="rounded-lg p-2 text-[var(--text-secondary)] disabled:opacity-40 hover:bg-[var(--bg-surface-alt)]"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>
      {items.map((item, idx) =>
        item === '...' ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-sm text-[var(--text-muted)]">
            …
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={clsx(
              'h-8 w-8 rounded-lg text-sm font-medium transition-colors',
              item === page ? 'bg-grad-primary text-white' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-alt)]',
            )}
          >
            {item}
          </button>
        ),
      )}
      <button
        disabled={page >= pages}
        onClick={() => onChange(page + 1)}
        className="rounded-lg p-2 text-[var(--text-secondary)] disabled:opacity-40 hover:bg-[var(--bg-surface-alt)]"
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
