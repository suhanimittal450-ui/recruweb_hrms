import { motion } from 'framer-motion';
import { CheckCircle2, Circle, ListChecks } from 'lucide-react';
import toast from 'react-hot-toast';
import Card from '../ui/Card';
import Skeleton from '../ui/Skeleton';
import { useGetEmployeeOnboardingQuery, useToggleOnboardingStepMutation } from '../../redux/api/employeeApi';

const OnboardingChecklist = ({ employeeId, readOnly = false }) => {
  const { data: steps, isLoading } = useGetEmployeeOnboardingQuery(employeeId, { skip: !employeeId });
  const [toggleStep] = useToggleOnboardingStepMutation();

  const completedCount = steps?.filter((s) => s.completed).length || 0;
  const total = steps?.length || 0;
  const progress = total ? Math.round((completedCount / total) * 100) : 0;

  const handleToggle = async (step) => {
    if (readOnly) return;
    try {
      await toggleStep({ employeeId, stepId: step._id, completed: !step.completed }).unwrap();
    } catch {
      toast.error('Could not update onboarding step');
    }
  };

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-[var(--text-primary)]">
          <ListChecks size={16} className="text-primary" /> Onboarding
        </h3>
        <span className="text-xs font-medium text-[var(--text-muted)]">
          {completedCount}/{total} complete
        </span>
      </div>

      <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-[var(--bg-surface-alt)]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-grad-primary"
        />
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-full" />
          ))}
        </div>
      ) : (
        <ul className="space-y-1.5">
          {(steps || []).map((step) => (
            <li key={step._id}>
              <button
                onClick={() => handleToggle(step)}
                disabled={readOnly}
                className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-colors hover:bg-[var(--bg-surface-alt)] disabled:cursor-default"
              >
                {step.completed ? (
                  <CheckCircle2 size={18} className="shrink-0 text-success" />
                ) : (
                  <Circle size={18} className="shrink-0 text-[var(--text-muted)]" />
                )}
                <span className={`text-sm ${step.completed ? 'text-[var(--text-muted)] line-through' : 'text-[var(--text-primary)]'}`}>
                  {step.task}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default OnboardingChecklist;
