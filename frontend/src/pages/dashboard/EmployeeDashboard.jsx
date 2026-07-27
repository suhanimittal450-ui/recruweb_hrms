import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { CalendarClock, Briefcase, Building2 } from 'lucide-react';
import { selectCurrentUser } from '../../redux/slices/authSlice';
import { useGetMyEmployeeQuery } from '../../redux/api/employeeApi';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Skeleton from '../../components/ui/Skeleton';
import EmptyState from '../../components/ui/EmptyState';
import OnboardingChecklist from '../../components/dashboard/OnboardingChecklist';
import DocumentsPanel from '../../components/dashboard/DocumentsPanel';
import OfferLetterCard from '../../components/dashboard/OfferLetterCard';

const EmployeeDashboard = () => {
  const user = useSelector(selectCurrentUser);
  const { data: employee, isLoading, isError } = useGetMyEmployeeQuery();

  const greetingHour = new Date().getHours();
  const greeting = greetingHour < 12 ? 'Good morning' : greetingHour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card relative overflow-hidden p-8">
        <div className="aurora-bg opacity-60" />
        <div className="relative z-10">
          <p className="text-sm text-[var(--text-muted)]">{greeting},</p>
          <h1 className="font-display text-3xl font-semibold gradient-text">{user?.firstName || 'there'} 👋</h1>
          <p className="mt-2 max-w-lg text-sm text-[var(--text-secondary)]">
            Here&apos;s your onboarding progress, documents, and employment status.
          </p>
        </div>
      </motion.div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      )}

      {isError && (
        <EmptyState
          title="No employee profile linked yet"
          description="Ask an Admin or HR to create your Employee profile — until then, most of this dashboard stays empty."
        />
      )}

      {!isLoading && !isError && employee && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card>
              <div className="mb-2 inline-flex rounded-xl bg-primary/10 p-2.5 text-primary">
                <Briefcase size={16} />
              </div>
              <p className="text-xs text-[var(--text-muted)]">Designation</p>
              <p className="font-display text-sm font-semibold text-[var(--text-primary)]">
                {employee.designation?.designationName || '—'}
              </p>
            </Card>
            <Card>
              <div className="mb-2 inline-flex rounded-xl bg-secondary/10 p-2.5 text-secondary">
                <Building2 size={16} />
              </div>
              <p className="text-xs text-[var(--text-muted)]">Department</p>
              <p className="font-display text-sm font-semibold text-[var(--text-primary)]">
                {employee.department?.departmentName || '—'}
              </p>
            </Card>
            <Card>
              <div className="mb-2 inline-flex rounded-xl bg-accent/10 p-2.5 text-accent">
                <CalendarClock size={16} />
              </div>
              <p className="text-xs text-[var(--text-muted)]">Status</p>
              <Badge tone={employee.status}>{employee.status}</Badge>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <OnboardingChecklist employeeId={employee._id} />
            <OfferLetterCard candidateId={employee.candidate?._id || employee.candidate} />
          </div>

          <DocumentsPanel employeeId={employee._id} canUpload canVerify={false} />
        </>
      )}
    </div>
  );
};

export default EmployeeDashboard;
