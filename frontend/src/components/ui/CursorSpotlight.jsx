import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorSpotlight = ({ size = 420 }) => {
  const ref = useRef(null);
  const x = useMotionValue(-size);
  const y = useMotionValue(-size);
  const springX = useSpring(x, { damping: 30, stiffness: 200 });
  const springY = useSpring(y, { damping: 30, stiffness: 200 });

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - size / 2);
    y.set(e.clientY - rect.top - size / 2);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(-size);
        y.set(-size);
      }}
      className="pointer-events-auto absolute inset-0 z-[1] overflow-hidden"
    >
      <motion.div
        style={{ x: springX, y: springY, width: size, height: size }}
        className="absolute rounded-full bg-primary/25 blur-[90px]"
      />
    </div>
  );
};

export default CursorSpotlight;
