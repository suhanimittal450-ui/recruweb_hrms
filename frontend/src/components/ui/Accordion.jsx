import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const AccordionItem = ({ question, answer, isOpen, onToggle }) => (
  <div className="glass-card overflow-hidden">
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
    >
      <span className="font-display text-sm font-semibold text-[var(--text-primary)] sm:text-base">{question}</span>
      <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0 text-[var(--text-muted)]">
        <ChevronDown size={18} />
      </motion.span>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <p className="px-6 pb-5 text-sm text-[var(--text-muted)]">{answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <AccordionItem
          key={item.question}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === idx}
          onToggle={() => setOpenIndex(openIndex === idx ? -1 : idx)}
        />
      ))}
    </div>
  );
};

export default Accordion;
