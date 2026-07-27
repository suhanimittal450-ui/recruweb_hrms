import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Pencil, Mail, Phone, Calendar, Building2, Briefcase, Wallet } from 'lucide-react';
import dayjs from 'dayjs';
import { useGetEmployeeByIdQuery } from '../../redux/api/employeeApi';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Skeleton from '../../components/ui/Skeleton';
import EmptyState from '../../components/ui/EmptyState';

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 py-2.5">
    <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
      <Icon size={15} />
    </div>
    <div>
      <p className="text-xs text-[var(--text-muted)]">{label}</p>
      <p className="text-sm font-medium text-[var(--text-primary)]">{value || '—'}</p>
    </div>
  </div>
);

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: employee, isLoading, isError } = useGetEmployeeByIdQuery(id);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (isError || !employee) {
    return <EmptyState title="Employee not found" description="This record may have been removed." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]"
        >
          <ArrowLeft size={14} /> Back to employees
        </button>
        <Link to={`/dashboard/employees/${id}/edit`}>
          <Button icon={Pencil} size="sm" variant="outline">
            Edit
          </Button>
        </Link>
      </div>

      <Card className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-grad-primary text-2xl font-semibold text-white shadow-glow">
          {employee.user?.firstName?.[0]}
          {employee.user?.lastName?.[0]}
        </div>
        <div className="flex-1">
          <h1 className="font-display text-xl font-semibold text-[var(--text-primary)]">
            {employee.user?.firstName} {employee.user?.lastName}
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            {employee.designation?.designationName || 'No designation'} · {employee.employeeId}
          </p>
        </div>
        <Badge tone={employee.status}>{employee.status}</Badge>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="mb-2 font-display text-sm font-semibold text-[var(--text-primary)]">Contact</h3>
          <InfoRow icon={Mail} label="Email" value={employee.user?.email} />
          <InfoRow icon={Phone} label="Phone" value={employee.user?.phone} />
        </Card>
        <Card>
          <h3 className="mb-2 font-display text-sm font-semibold text-[var(--text-primary)]">Employment</h3>
          <InfoRow icon={Building2} label="Department" value={employee.department?.departmentName} />
          <InfoRow icon={Briefcase} label="Employment type" value={employee.employmentType} />
          <InfoRow
            icon={Calendar}
            label="Joining date"
            value={employee.joiningDate ? dayjs(employee.joiningDate).format('DD MMM YYYY') : '—'}
          />
          <InfoRow icon={Wallet} label="Salary" value={employee.salary ? `₹${employee.salary.toLocaleString()}` : '—'} />
        </Card>
      </div>
    </div>
  );
};

export default EmployeeDetail;
