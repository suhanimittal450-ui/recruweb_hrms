import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight, Users, CalendarCheck, Wallet, Briefcase, BarChart3, ShieldCheck,
  Sparkles, Check, Building2, UserCog, Headset, Rocket,
} from 'lucide-react';
import PublicNavbar from '../../components/layout/PublicNavbar';
import PublicFooter from '../../components/layout/PublicFooter';
import MarketingHero3D from '../../components/three/MarketingHero3D';
import NetworkBackground from '../../components/three/NetworkBackground';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Counter from '../../components/ui/Counter';
import Accordion from '../../components/ui/Accordion';
import CursorSpotlight from '../../components/ui/CursorSpotlight';
import ScrollProgressBar from '../../components/ui/ScrollProgressBar';
import DashboardMockup from '../../components/marketing/DashboardMockup';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { icon: Users, title: 'Employee Management', desc: 'A single source of truth for every employee record, org chart, and document.' },
  { icon: CalendarCheck, title: 'Attendance & Leave', desc: 'Real-time attendance tracking with automated leave approvals and balances.' },
  { icon: Wallet, title: 'Payroll & Salary', desc: 'Run payroll, generate payslips, and manage salary structures without spreadsheets.' },
  { icon: Briefcase, title: 'Recruitment', desc: 'Post jobs, track candidates through your pipeline, and send offers — all in one place.' },
  { icon: BarChart3, title: 'Analytics & Reports', desc: 'Live dashboards on headcount, attrition, and performance across every department.' },
  { icon: ShieldCheck, title: 'Role-Based Access', desc: 'Granular permissions for Admins, HR, Managers, Employees, and Recruiters.' },
];

const ROLES = [
  { icon: UserCog, name: 'Super Admin', desc: 'Owns the whole platform' },
  { icon: UserCog, name: 'Admin', desc: 'Full control over the organization' },
  { icon: Users, name: 'HR', desc: 'Manages people and policy' },
  { icon: Briefcase, name: 'Manager', desc: 'Leads teams and approvals' },
  { icon: Headset, name: 'Team Lead', desc: 'Guides a squad day-to-day' },
  { icon: Building2, name: 'Employee', desc: 'Self-service for everyday tasks' },
  { icon: Rocket, name: 'Recruiter', desc: 'Owns the hiring pipeline' },
  { icon: Wallet, name: 'Accountant', desc: 'Handles payroll and finance' },
];

const PRICING = [
  { name: 'Starter', price: 0, blurb: 'For small teams getting started', features: ['Up to 10 employees', 'Attendance & leave', 'Basic reports', 'Email support'] },
  { name: 'Growth', price: 12, blurb: 'For scaling companies', highlighted: true, features: ['Unlimited employees', 'Payroll & payslips', 'Recruitment pipeline', 'Advanced analytics', 'Priority support'] },
  { name: 'Enterprise', price: null, blurb: 'For complex organizations', features: ['Custom roles & workflows', 'SSO & audit logs', 'Dedicated success manager', 'SLA-backed uptime'] },
];

const TRUST_LOGOS = ['Nimbus Retail', 'Orbit Logistics', 'Verdant Foods', 'Cascade Robotics', 'Aster Health', 'Ledgerly'];

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'Head of HR, Orbit Logistics',
    quote: 'We replaced four separate spreadsheets with one dashboard. Payroll day used to take two people three days — now it takes an afternoon.',
  },
  {
    name: 'Daniel Ortiz',
    role: 'People Ops Lead, Verdant Foods',
    quote: 'The role-based access finally lets managers approve leave themselves instead of emailing HR for everything.',
  },
  {
    name: 'Aiko Tanaka',
    role: 'Talent Director, Cascade Robotics',
    quote: 'Our hiring pipeline is finally visible end-to-end — from job posting to offer letter, in one place.',
  },
];

const FAQS = [
  { question: 'Does HRMS Nova connect to our existing systems?', answer: 'Yes — it runs on your own Node.js and MongoDB backend, so your employee data stays in your database, not ours.' },
  { question: 'Can different roles see different things?', answer: 'Every screen is role-aware. Super Admins, Admins, HR, Managers, Team Leads, Employees, Recruiters, and Accountants each see only what applies to them.' },
  { question: 'Is there a free plan?', answer: 'Yes — the Starter plan covers up to 10 employees with attendance, leave, and basic reporting at no cost.' },
  { question: 'How long does setup take?', answer: 'Most teams are up and running same-day: create your organization, add departments, and invite your first employees.' },
];

const useScrollReveal = () => {
  const scope = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          },
        );
      });
    }, scope);
    return () => ctx.revert();
  }, []);
  return scope;
};

const LandingPage = () => {
  const scope = useScrollReveal();

  return (
    <div ref={scope} className="relative overflow-hidden bg-[var(--bg-canvas)]">
      <ScrollProgressBar />
      <PublicNavbar />

      {/* ---------------- HERO ---------------- */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
        <div className="aurora-bg" />
        <div className="noise-overlay" />
        <CursorSpotlight />
        <NetworkBackground className="absolute inset-0 h-full w-full opacity-60" />
        <MarketingHero3D className="absolute right-0 top-0 h-full w-full opacity-90 lg:w-3/5" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="glass-card absolute left-6 top-32 z-10 hidden w-48 p-4 sm:block lg:left-16"
        >
          <p className="flex items-center gap-1 font-display text-lg font-semibold text-success">
            +<Counter value={38} suffix="%" />
          </p>
          <p className="text-xs text-[var(--text-muted)]">Faster hiring cycles</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="glass-card absolute bottom-24 right-6 z-10 hidden w-52 p-4 sm:block lg:right-16"
        >
          <p className="font-display text-lg font-semibold text-[var(--text-primary)]">
            <Counter value={12400} suffix="+" />
          </p>
          <p className="text-xs text-[var(--text-muted)]">Employees managed</p>
        </motion.div>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles size={12} /> Now with real-time analytics
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
              One platform for your <span className="gradient-text">entire workforce</span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-[var(--text-secondary)]">
              HRMS Nova connects attendance, payroll, recruitment, and performance into a single,
              beautifully simple workspace — built for HR teams who want to move fast.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/register">
                <Button size="lg" icon={ArrowRight} iconPosition="right" magnetic>
                  Start free trial
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" magnetic>
                  Sign in
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex gap-8">
              <div>
                <p className="font-display text-2xl font-semibold text-[var(--text-primary)]">
                  <Counter value={12000} suffix="+" />
                </p>
                <p className="text-xs text-[var(--text-muted)]">Employees managed</p>
              </div>
              <div>
                <p className="font-display text-2xl font-semibold text-[var(--text-primary)]">
                  <Counter value={340} suffix="+" />
                </p>
                <p className="text-xs text-[var(--text-muted)]">Companies onboard</p>
              </div>
              <div>
                <p className="font-display text-2xl font-semibold text-[var(--text-primary)]">
                  <Counter value={99.9} decimals={1} suffix="%" />
                </p>
                <p className="text-xs text-[var(--text-muted)]">Uptime SLA</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- TRUST STRIP ---------------- */}
      <section className="relative mx-auto max-w-7xl px-6 py-10">
        <p data-reveal className="text-center text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">
          Trusted by fast-growing teams
        </p>
        <div data-reveal className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
          {TRUST_LOGOS.map((name) => (
            <span key={name} className="font-display text-lg font-semibold text-[var(--text-secondary)]">
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* ---------------- FEATURES ---------------- */}
      <section id="features" className="relative mx-auto max-w-7xl px-6 py-24">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
            Everything HR needs, <span className="gradient-text">nothing it doesn&apos;t</span>
          </h2>
          <p className="mt-3 text-[var(--text-secondary)]">
            Every module talks to the same live database — no spreadsheets, no double entry.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, idx) => (
            <div key={f.title} data-reveal>
              <Card className="h-full" tilt>
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                  <f.icon size={20} />
                </div>
                <h3 className="font-display text-base font-semibold text-[var(--text-primary)]">{f.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-muted)]">{f.desc}</p>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- ROLES ---------------- */}
      <section id="roles" className="relative mx-auto max-w-7xl px-6 py-24">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
            Built for <span className="gradient-text">every role</span>
          </h2>
          <p className="mt-3 text-[var(--text-secondary)]">Role-based access means everyone sees exactly what they need.</p>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {ROLES.map((r) => (
            <motion.div
              key={r.name}
              data-reveal
              whileHover={{ y: -6 }}
              className="glass-card flex flex-col items-center gap-2 p-5 text-center"
            >
              <div className="rounded-xl bg-secondary/10 p-3 text-secondary">
                <r.icon size={18} />
              </div>
              <p className="font-display text-sm font-semibold text-[var(--text-primary)]">{r.name}</p>
              <p className="text-xs text-[var(--text-muted)]">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------- PRODUCT PREVIEW ---------------- */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
            See it <span className="gradient-text">in action</span>
          </h2>
          <p className="mt-3 text-[var(--text-secondary)]">A real dashboard, wired to your real data — not a demo sandbox.</p>
        </div>
        <div className="mt-14" data-reveal>
          <DashboardMockup />
        </div>
      </section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
            Loved by <span className="gradient-text">HR teams</span>
          </h2>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} data-reveal>
              <Card className="h-full">
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-grad-primary text-sm font-semibold text-white">
                    {t.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{t.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{t.role}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
        <p data-reveal className="mt-6 text-center text-xs text-[var(--text-muted)]">
          Illustrative example testimonials.
        </p>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section id="faq" className="relative mx-auto max-w-3xl px-6 py-24">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
            Frequently asked <span className="gradient-text">questions</span>
          </h2>
        </div>
        <div className="mt-12" data-reveal>
          <Accordion items={FAQS} />
        </div>
      </section>

      {/* ---------------- PRICING ---------------- */}
      <section id="pricing" className="relative mx-auto max-w-7xl px-6 py-24">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
            Simple, <span className="gradient-text">transparent pricing</span>
          </h2>
          <p className="mt-3 text-[var(--text-secondary)]">Start free. Scale when you&apos;re ready.</p>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PRICING.map((tier) => (
            <div key={tier.name} data-reveal>
              <Card
                className={tier.highlighted ? '!border-primary shadow-glow relative overflow-visible' : 'relative'}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-grad-primary px-3 py-1 text-xs font-medium text-white shadow-glow">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">{tier.name}</h3>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{tier.blurb}</p>
                <p className="mt-5 font-display text-3xl font-semibold text-[var(--text-primary)]">
                  {tier.price === null ? 'Custom' : tier.price === 0 ? 'Free' : `$${tier.price}`}
                  {tier.price ? <span className="text-sm font-normal text-[var(--text-muted)]">/mo per seat</span> : null}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <Check size={15} className="text-success" /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/register" className="mt-6 block">
                  <Button variant={tier.highlighted ? 'primary' : 'outline'} className="w-full">
                    {tier.price === null ? 'Contact sales' : 'Get started'}
                  </Button>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <div data-reveal className="glass-card relative overflow-hidden p-12 text-center">
          <div className="aurora-bg opacity-70" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
              Ready to modernize your HR?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-[var(--text-secondary)]">
              Set up your organization in minutes — connect real data, not demos.
            </p>
            <Link to="/register" className="mt-8 inline-block">
              <Button size="lg" icon={ArrowRight} iconPosition="right" magnetic>
                Start your free trial
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default LandingPage;
