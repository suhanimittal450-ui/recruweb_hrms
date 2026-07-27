import { Link } from 'react-router-dom';
import { Sparkles, Twitter, Linkedin, Github } from 'lucide-react';

const columns = [
  { title: 'Product', links: ['Features', 'Pricing', 'Security', 'Roadmap'] },
  { title: 'Company', links: ['About', 'Careers', 'Blog', 'Contact'] },
  { title: 'Resources', links: ['Docs', 'Help Center', 'API', 'Status'] },
  { title: 'Legal', links: ['Privacy', 'Terms', 'Compliance'] },
];

const PublicFooter = () => (
  <footer className="relative border-t border-[var(--border-glass)] bg-[var(--bg-surface)]/60 px-6 py-16">
    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-5">
      <div className="col-span-2 sm:col-span-3 md:col-span-1">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-grad-primary text-white shadow-glow">
            <Sparkles size={17} />
          </div>
          <span className="font-display text-base font-semibold text-[var(--text-primary)]">HRMS Nova</span>
        </Link>
        <p className="mt-3 max-w-xs text-sm text-[var(--text-muted)]">
          The connected HR platform for modern, fast-growing teams.
        </p>
        <div className="mt-4 flex gap-3 text-[var(--text-muted)]">
          <Twitter size={16} className="cursor-pointer transition-colors hover:text-primary" />
          <Linkedin size={16} className="cursor-pointer transition-colors hover:text-primary" />
          <Github size={16} className="cursor-pointer transition-colors hover:text-primary" />
        </div>
      </div>
      {columns.map((col) => (
        <div key={col.title}>
          <h4 className="font-display text-sm font-semibold text-[var(--text-primary)]">{col.title}</h4>
          <ul className="mt-3 space-y-2">
            {col.links.map((l) => (
              <li key={l}>
                <a href="#" className="text-sm text-[var(--text-muted)] transition-colors hover:text-primary">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="mx-auto mt-12 max-w-7xl border-t border-[var(--border-glass)] pt-6 text-xs text-[var(--text-muted)]">
      © {new Date().getFullYear()} HRMS Nova. All rights reserved.
    </div>
  </footer>
);

export default PublicFooter;
