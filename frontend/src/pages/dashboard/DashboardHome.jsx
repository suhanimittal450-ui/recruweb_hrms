import { useSelector } from 'react-redux';
import { Users, CalendarCheck, Wallet, Briefcase } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { selectCurrentUser } from '../../redux/slices/authSlice';
import { useGetDashboardQuery } from '../../redux/api/dashboardApi';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import Skeleton from '../../components/ui/Skeleton';
import EmptyState from '../../components/ui/EmptyState';

const DashboardHome = () => {
  const user = useSelector(selectCurrentUser);
  const { data, isLoading, isError } = useGetDashboardQuery();

  const overview = data?.overview || {};
  const kpis = data?.kpis || {};
  const departmentChart = Array.isArray(data?.departments)
    ? data.departments.map((d) => ({ name: d.departmentName || d.name || 'Dept', count: d.count || d.employeeCount || 0 }))
    : [];

  const greetingHour = new Date().getHours();
  const greeting = greetingHour < 12 ? 'Good morning' : greetingHour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-6">
      <div className="glass-card relative overflow-hidden p-8">
        <div className="aurora-bg opacity-60" />
        <div className="relative z-10">
          <p className="text-sm text-[var(--text-muted)]">{greeting},</p>
          <h1 className="font-display text-3xl font-semibold gradient-text">{user?.firstName || 'there'} 👋</h1>
          <p className="mt-2 max-w-lg text-sm text-[var(--text-secondary)]">
            Here&apos;s a live look at your organization, pulled straight from your HRMS database.
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      )}

      {isError && (
        <EmptyState
          title="Couldn't load dashboard data"
          description="Make sure your backend is running at the configured API URL and that you're signed in."
        />
      )}

      {!isLoading && !isError && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={Users}
              label="Total Employees"
              value={overview.totalEmployees ?? kpis.totalEmployees ?? 0}
              tone="primary"
              delay={0}
            />
            <StatCard
              icon={CalendarCheck}
              label="Present Today"
              value={overview.presentToday ?? kpis.presentToday ?? 0}
              tone="success"
              delay={0.05}
            />
            <StatCard
              icon={Wallet}
              label="Payroll Processed"
              value={overview.payrollProcessed ?? kpis.payrollProcessed ?? 0}
              tone="accent"
              delay={0.1}
            />
            <StatCard
              icon={Briefcase}
              label="Open Positions"
              value={overview.openPositions ?? kpis.openPositions ?? 0}
              tone="secondary"
              delay={0.15}
            />
          </div>

          <Card className="!p-6">
            <h3 className="mb-4 font-display text-base font-semibold text-[var(--text-primary)]">
              Headcount by Department
            </h3>
            {departmentChart.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={departmentChart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-glass)" />
                  <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} />
                  <YAxis stroke="var(--text-muted)" fontSize={12} />
                  <Tooltip
                    contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 12 }}
                  />
                  <Bar dataKey="count" fill="#4F46E5" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyState title="No department data yet" description="Add departments and employees to see this chart populate." />
            )}
          </Card>
        </>
      )}
    </div>
  );
};

export default DashboardHome;
