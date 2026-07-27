import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Hero3D from '../components/three/Hero3D';

const AuthLayout = ({ children }) => (
  <div className="relative flex min-h-screen w-full overflow-hidden bg-[var(--bg-canvas)]">
    <div className="aurora-bg" />
    <div className="noise-overlay" />

    {/* Left — brand / 3D hero */}
    <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-dark p-12 lg:flex">
      <Hero3D className="absolute inset-0 h-full w-full opacity-90" />
      <div className="relative z-10 flex items-center gap-2 text-white">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-grad-primary shadow-glow">
          <Sparkles size={18} />
        </div>
        <span className="font-display text-lg font-semibold">HRMS Nova</span>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 max-w-md text-white"
      >
        <h2 className="font-display text-3xl font-semibold leading-tight">
          One platform for your entire workforce
        </h2>
        <p className="mt-3 text-sm text-white/70">
          Attendance, payroll, recruitment and performance — connected to your real HR data, in real time.
        </p>
      </motion.div>
    </div>

    {/* Right — form */}
    <div className="relative z-10 flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card w-full max-w-md p-8"
      >
        {children}
      </motion.div>
    </div>
  </div>
);

export default AuthLayout;
