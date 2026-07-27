import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, User, Mail, Phone, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import { employeeUserStepSchema, employeeProfileStepSchema, SELF_REGISTERABLE_ROLES } from '../../utils/validationSchemas';
import { ROLE_LABELS } from '../../constants/roles';
import { authService } from '../../services/authService';
import { useCreateEmployeeMutation } from '../../redux/api/employeeApi';
import {
  useGetCompanysQuery,
  useGetBranchsQuery,
  useGetDepartmentsQuery,
  useGetDesignationsQuery,
} from '../../redux/api/organizationApi';
import { useGetEmployeesQuery } from '../../redux/api/employeeApi';
import { extractErrorMessage } from '../../hooks/useAuth';

const steps = ['Account', 'Employment details'];

const AddEmployee = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [createdUser, setCreatedUser] = useState(null);

  const userForm = useForm({
    resolver: zodResolver(employeeUserStepSchema),
    defaultValues: { role: 'EMPLOYEE' },
  });
  const profileForm = useForm({
    resolver: zodResolver(employeeProfileStepSchema),
    defaultValues: { employmentType: 'Permanent', status: 'Active', probationMonths: 6 },
  });

  const { data: companies } = useGetCompanysQuery();
  const { data: branches } = useGetBranchsQuery();
  const { data: departments } = useGetDepartmentsQuery();
  const { data: designations } = useGetDesignationsQuery();
  const { data: employeesData } = useGetEmployeesQuery({ limit: 100 });
  const [createEmployee, { isLoading: isCreatingProfile }] = useCreateEmployeeMutation();

  const onSubmitUserStep = async (values) => {
    try {
      const res = await authService.register(values);
      setCreatedUser(res.data);
      toast.success('Account created — now add employment details');
      setStep(1);
    } catch (error) {
      toast.error(extractErrorMessage(error));
    }
  };

  const onSubmitProfileStep = async (values) => {
    try {
      const payload = {
        ...values,
        user: createdUser._id,
      };
      // Empty-string optional ObjectId fields must be omitted, not sent as ''.
      ['branch', 'department', 'designation', 'reportingManager'].forEach((key) => {
        if (!payload[key]) delete payload[key];
      });
      await createEmployee(payload).unwrap();
      toast.success('Employee created successfully');
      navigate('/dashboard/employees');
    } catch (error) {
      toast.error(error?.data?.message || 'Could not create employee profile');
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]"
        >
          <ArrowLeft size={14} /> Back
        </button>
        <h1 className="mt-2 font-display text-2xl font-semibold text-[var(--text-primary)]">Add Employee</h1>
      </div>

      <div className="flex items-center gap-3">
        {steps.map((label, idx) => (
          <div key={label} className="flex flex-1 items-center gap-3">
            <div
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-semibold transition-colors ${
                idx < step ? 'bg-success text-white' : idx === step ? 'bg-grad-primary text-white' : 'bg-[var(--bg-surface-alt)] text-[var(--text-muted)]'
              }`}
            >
              {idx < step ? <Check size={14} /> : idx + 1}
            </div>
            <span className={`text-sm ${idx === step ? 'font-medium text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
              {label}
            </span>
            {idx < steps.length - 1 && <div className="h-px flex-1 bg-[var(--border-glass)]" />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
          <Card>
            <p className="mb-4 text-sm text-[var(--text-secondary)]">
              This creates the employee&apos;s login account (<code>POST /auth/register</code>). They&apos;ll use this
              email and password to sign in.
            </p>
            <form onSubmit={userForm.handleSubmit(onSubmitUserStep)} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input label="First name" icon={User} {...userForm.register('firstName')} error={userForm.formState.errors.firstName?.message} />
                <Input label="Last name" icon={User} {...userForm.register('lastName')} error={userForm.formState.errors.lastName?.message} />
              </div>
              <Input label="Email address" type="email" icon={Mail} {...userForm.register('email')} error={userForm.formState.errors.email?.message} />
              <Input label="Phone number" icon={Phone} {...userForm.register('phone')} error={userForm.formState.errors.phone?.message} />
              <Input label="Temporary password" type="password" icon={Lock} {...userForm.register('password')} error={userForm.formState.errors.password?.message} />
              <Select
                label="System role"
                options={SELF_REGISTERABLE_ROLES.map((r) => ({ label: ROLE_LABELS[r], value: r }))}
                {...userForm.register('role')}
                error={userForm.formState.errors.role?.message}
              />
              <Button type="submit" className="w-full" icon={ArrowRight} iconPosition="right" isLoading={userForm.formState.isSubmitting}>
                Continue
              </Button>
            </form>
          </Card>
        </motion.div>
      )}

      {step === 1 && (
        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
          <Card>
            <p className="mb-4 text-sm text-[var(--text-secondary)]">
              Account for <strong>{createdUser?.email}</strong> created. Now set up their employment profile.
            </p>
            <form onSubmit={profileForm.handleSubmit(onSubmitProfileStep)} className="space-y-4">
              <Select
                label="Company"
                options={(companies || []).map((c) => ({ label: c.companyName, value: c._id }))}
                {...profileForm.register('company')}
                error={profileForm.formState.errors.company?.message}
              />
              <div className="grid grid-cols-2 gap-3">
                <Select
                  label="Branch"
                  options={(branches || []).map((b) => ({ label: b.branchName, value: b._id }))}
                  {...profileForm.register('branch')}
                />
                <Select
                  label="Department"
                  options={(departments || []).map((d) => ({ label: d.departmentName, value: d._id }))}
                  {...profileForm.register('department')}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Select
                  label="Designation"
                  options={(designations || []).map((d) => ({ label: d.designationName, value: d._id }))}
                  {...profileForm.register('designation')}
                />
                <Select
                  label="Reporting manager"
                  options={(employeesData?.employees || []).map((e) => ({
                    label: `${e.user?.firstName || ''} ${e.user?.lastName || ''} (${e.employeeId})`,
                    value: e._id,
                  }))}
                  {...profileForm.register('reportingManager')}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Joining date" type="date" {...profileForm.register('joiningDate')} error={profileForm.formState.errors.joiningDate?.message} />
                <Select
                  label="Employment type"
                  options={['Permanent', 'Contract', 'Intern', 'Consultant'].map((v) => ({ label: v, value: v }))}
                  {...profileForm.register('employmentType')}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Monthly salary" type="number" {...profileForm.register('salary')} />
                <Select
                  label="Status"
                  options={['Active', 'Inactive', 'On Leave', 'Resigned', 'Terminated'].map((v) => ({ label: v, value: v }))}
                  {...profileForm.register('status')}
                />
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(0)}>
                  Back
                </Button>
                <Button type="submit" className="flex-1" isLoading={isCreatingProfile}>
                  Create Employee
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default AddEmployee;
