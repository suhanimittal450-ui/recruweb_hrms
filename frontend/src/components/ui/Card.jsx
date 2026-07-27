import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import clsx from 'clsx';

const Card = ({ children, className, hover = true, tilt = false, as: Component = motion.div, ...props }) => {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    if (!tilt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    if (!tilt) return;
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <Component
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hover ? { y: -4, boxShadow: '0 16px 40px rgba(79,70,229,0.18)' } : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tilt ? { rotateX, rotateY, transformPerspective: 800 } : undefined}
      className={clsx('glass-card p-6', className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;
