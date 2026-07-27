import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import clsx from 'clsx';

const variants = {
  primary: 'bg-grad-primary text-white shadow-glow hover:shadow-glow',
  outline: 'border border-[var(--border-glass)] text-[var(--text-primary)] hover:bg-[var(--bg-surface-alt)]',
  ghost: 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-alt)]',
  danger: 'bg-danger text-white hover:brightness-110',
  success: 'bg-success text-white hover:brightness-110',
};

const sizes = {
  sm: 'px-3.5 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  icon: Icon,
  iconPosition = 'left',
  isLoading = false,
  disabled,
  type = 'button',
  magnetic = false,
  ...props
}) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 12 });
  const springY = useSpring(y, { stiffness: 150, damping: 12 });

  const handleMouseMove = (e) => {
    if (!magnetic || disabled || isLoading) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      whileHover={{ scale: disabled || isLoading ? 1 : 1.03 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={magnetic ? { x: springX, y: springY } : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      disabled={disabled || isLoading}
      className={clsx(
        'relative inline-flex items-center justify-center gap-2 rounded-xl font-medium font-body',
        'transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {isLoading && (
        <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
      )}
      {!isLoading && Icon && iconPosition === 'left' && <Icon size={16} />}
      {children}
      {!isLoading && Icon && iconPosition === 'right' && <Icon size={16} />}
    </motion.button>
  );
};

export default Button;
