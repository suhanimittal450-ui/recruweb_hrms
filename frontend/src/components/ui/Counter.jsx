import { useEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';

const Counter = ({ value = 0, duration = 1.2, decimals = 0, suffix = '', prefix = '' }) => {
  const [display, setDisplay] = useState(0);
  const prevValue = useRef(0);

  useEffect(() => {
    const controls = animate(prevValue.current, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    prevValue.current = value;
    return () => controls.stop();
  }, [value, duration]);

  return (
    <span>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export default Counter;
