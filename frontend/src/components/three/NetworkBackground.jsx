import { useMemo } from 'react';
import { motion } from 'framer-motion';

// Deterministic pseudo-random so the layout doesn't reshuffle on every render.
const seededRandom = (seed) => {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
};

const NODE_COLORS = ['#4F46E5', '#7C3AED', '#06B6D4', '#10B981'];

const NetworkBackground = ({ nodeCount = 22, className }) => {
  const { nodes, edges } = useMemo(() => {
    const rand = seededRandom(42);
    const pts = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: rand() * 100,
      y: rand() * 100,
      color: NODE_COLORS[i % NODE_COLORS.length],
      big: rand() > 0.75,
      delay: rand() * 4,
    }));

    const lines = [];
    pts.forEach((p, i) => {
      pts.slice(i + 1).forEach((q) => {
        const dist = Math.hypot(p.x - q.x, p.y - q.y);
        if (dist < 22) lines.push({ from: p, to: q });
      });
    });

    return { nodes: pts, edges: lines };
  }, [nodeCount]);

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <g opacity="0.35">
        {edges.map((e, i) => (
          <line
            key={i}
            x1={e.from.x}
            y1={e.from.y}
            x2={e.to.x}
            y2={e.to.y}
            stroke="var(--text-muted)"
            strokeWidth="0.08"
          />
        ))}
      </g>
      {nodes.map((n) => (
        <motion.circle
          key={n.id}
          cx={n.x}
          cy={n.y}
          r={n.big ? 0.55 : 0.3}
          fill={n.color}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.9, 0.3], cy: [n.y, n.y - 1.5, n.y] }}
          transition={{ duration: 5 + n.delay, repeat: Infinity, ease: 'easeInOut', delay: n.delay }}
        />
      ))}
    </svg>
  );
};

export default NetworkBackground;
