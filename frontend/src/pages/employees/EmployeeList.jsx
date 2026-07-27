import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Eye, Pencil, Trash2, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { useGetEmployeesQuery, useDeleteEmployeeMutation } from '../../redux/api/employeeApi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import Badge from '../../components/ui/Badge';
import Skeleton from '../../components/ui/Skeleton';
import EmptyState from '../../components/ui/EmptyState';
import Pagination from '../../components/ui/Pagination';
import ConfirmDialog from '../../components/ui/ConfirmDialog';

const STATUS_OPTIONS = ['Active', 'Inactive', 'On Leave', 'Resigned', 'Terminated'].map((s) => ({ label: s, value: s }));

const EmployeeList = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState(null);

  const queryParams = useMemo(
    () => ({ page, limit: 10, search: search || undefined, status: status || undefined }),
    [page, search, status],
  );

  const { data, isLoading, isError } = useGetEmployeesQuery(queryParams);
  const [deleteEmployee, { isLoading: isDeleting }] = useDeleteEmployeeMutation();

  const employees = data?.employees || [];

  const handleDelete = async () => {
    try {
      await deleteEmployee(pendingDelete._id).unwrap();
      toast.success('Employee removed');
      setPendingDelete(null);
    } catch (error) {
      toast.error(error?.data?.message || 'Could not delete employee');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-[var(--text-primary)]">Employees</h1>
          <p className="text-sm text-[var(--text-muted)]">Manage employee records synced with your HRMS database.</p>
        </div>
        <Link to="/dashboard/employees/new">
          <Button icon={Plus}>Add Employee</Button>
        </Link>
      </div>

      <Card className="!p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              placeholder="Search by employee ID..."
              className="w-full rounded-xl border border-[var(--border-glass)] bg-[var(--bg-surface-alt)] py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary"
            />
          </div>
          <Select
            options={STATUS_OPTIONS}
            placeholder="All statuses"
            value={status}
            onChange={(e) => {
              setPage(1);
              setStatus(e.target.value);
            }}
            className="sm:w-48"
          />
        </div>
      </Card>

      <Card className="!p-0 overflow-hidden">
        {isLoading ? (
          <div className="space-y-3 p-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : isError ? (
          <div className="p-6">
            <EmptyState
              icon={Users}
              title="Couldn't load employees"
              description="Check that the backend is reachable and your session hasn't expired."
            />
          </div>
        ) : employees.length === 0 ? (
          <div className="p-6">
            <EmptyState
              icon={Users}
              title="No employees yet"
              description="Add your first employee to start building your organization."
              action={
                <Link to="/dashboard/employees/new">
                  <Button icon={Plus} size="sm">
                    Add Employee
                  </Button>
                </Link>
              }
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-[var(--border-glass)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                <tr>
                  <th className="px-6 py-3 font-medium">Employee</th>
                  <th className="px-6 py-3 font-medium">Employee ID</th>
                  <th className="px-6 py-3 font-medium">Department</th>
                  <th className="px-6 py-3 font-medium">Designation</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-glass)]">
                {employees.map((emp) => (
                  <tr key={emp._id} className="transition-colors hover:bg-[var(--bg-surface-alt)]/60">
                    <td className="px-6 py-3.5">
                      <p className="font-medium text-[var(--text-primary)]">
                        {emp.user?.firstName} {emp.user?.lastName}
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">{emp.user?.email}</p>
                    </td>
                    <td className="px-6 py-3.5 text-[var(--text-secondary)]">{emp.employeeId}</td>
                    <td className="px-6 py-3.5 text-[var(--text-secondary)]">{emp.department?.departmentName || '—'}</td>
                    <td className="px-6 py-3.5 text-[var(--text-secondary)]">{emp.designation?.designationName || '—'}</td>
                    <td className="px-6 py-3.5">
                      <Badge tone={emp.status}>{emp.status}</Badge>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/dashboard/employees/${emp._id}`}
                          className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--bg-surface-alt)] hover:text-primary"
                        >
                          <Eye size={15} />
                        </Link>
                        <Link
                          to={`/dashboard/employees/${emp._id}/edit`}
                          className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--bg-surface-alt)] hover:text-primary"
                        >
                          <Pencil size={15} />
                        </Link>
                        <button
                          onClick={() => setPendingDelete(emp)}
                          className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-danger/10 hover:text-danger"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {data?.pages > 1 && (
        <Pagination page={data.page} pages={data.pages} onChange={setPage} />
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        onClose={() => setPendingDelete(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete employee?"
        description={`This will permanently remove ${pendingDelete?.user?.firstName || 'this employee'}'s record from your HRMS.`}
      />
    </div>
  );
};

export default EmployeeList;
