import { motion } from 'framer-motion';
import { Users, CalendarCheck, Wallet } from 'lucide-react';

const bars = [62, 84, 45, 96, 70, 58, 88];

const DashboardMockup = () => (
  <motion.div
    initial={{ opacity: 0, y: 40, rotateX: 8 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    style={{ perspective: 1200 }}
    className="mx-auto w-full max-w-4xl"
  >
    <div className="glass-card overflow-hidden !p-0 shadow-glow">
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b border-[var(--border-glass)] bg-[var(--bg-surface-alt)] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
        <div className="ml-3 flex-1 rounded-md bg-[var(--bg-surface)] px-3 py-1 text-center text-[11px] text-[var(--text-muted)]">
          app.hrmsnova.com/dashboard
        </div>
      </div>

      {/* mock app body */}
      <div className="flex h-72 sm:h-80">
        <div className="hidden w-44 flex-col gap-2 border-r border-[var(--border-glass)] bg-[var(--bg-surface)] p-4 sm:flex">
          {['Dashboard', 'Employees', 'Attendance', 'Payroll', 'Organization'].map((item, i) => (
            <div
              key={item}
              className={`rounded-lg px-3 py-2 text-xs font-medium ${
                i === 0 ? 'bg-grad-primary text-white' : 'text-[var(--text-muted)]'
              }`}
            >
              {item}
            </div>
          ))}
        </div>

        <div className="flex-1 space-y-4 overflow-hidden p-5">
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Users, label: 'Employees', value: '1,284' },
              { icon: CalendarCheck, label: 'Present', value: '1,092' },
              { icon: Wallet, label: 'Payroll', value: '$482K' },
            ].map((kpi) => (
              <div key={kpi.label} className="rounded-xl bg-[var(--bg-surface-alt)] p-3">
                <kpi.icon size={14} className="text-primary" />
                <p className="mt-1.5 font-display text-sm font-semibold text-[var(--text-primary)]">{kpi.value}</p>
                <p className="text-[10px] text-[var(--text-muted)]">{kpi.label}</p>
              </div>
            ))}
          </div>

          <div className="flex h-32 items-end gap-2 rounded-xl bg-[var(--bg-surface-alt)] p-4">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 rounded-t-md bg-gradient-to-t from-primary to-accent"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default DashboardMockup;
