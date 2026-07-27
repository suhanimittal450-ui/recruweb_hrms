import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import Button from '../../components/ui/Button';

const Forbidden = () => (
  <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
    <div className="rounded-2xl bg-danger/10 p-4 text-danger">
      <ShieldAlert size={28} />
    </div>
    <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">Access restricted</h2>
    <p className="max-w-sm text-sm text-[var(--text-muted)]">
      Your role doesn&apos;t have permission to view this section. Contact an administrator if you think this is a mistake.
    </p>
    <Link to="/dashboard">
      <Button variant="outline">Back to dashboard</Button>
    </Link>
  </div>
);

export default Forbidden;
