import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import Skeleton from '../../components/ui/Skeleton';
import { employeeProfileStepSchema } from '../../utils/validationSchemas';
import { useGetEmployeeByIdQuery, useUpdateEmployeeMutation } from '../../redux/api/employeeApi';
import {
  useGetCompanysQuery,
  useGetBranchsQuery,
  useGetDepartmentsQuery,
  useGetDesignationsQuery,
} from '../../redux/api/organizationApi';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: employee, isLoading } = useGetEmployeeByIdQuery(id);
  const [updateEmployee, { isLoading: isSaving }] = useUpdateEmployeeMutation();

  const { data: companies } = useGetCompanysQuery();
  const { data: branches } = useGetBranchsQuery();
  const { data: departments } = useGetDepartmentsQuery();
  const { data: designations } = useGetDesignationsQuery();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(employeeProfileStepSchema),
  });

  useEffect(() => {
    if (employee) {
      reset({
        company: employee.company?._id || '',
        branch: employee.branch?._id || '',
        department: employee.department?._id || '',
        designation: employee.designation?._id || '',
        reportingManager: employee.reportingManager?._id || '',
        joiningDate: employee.joiningDate ? employee.joiningDate.slice(0, 10) : '',
        employmentType: employee.employmentType || 'Permanent',
        probationMonths: employee.probationMonths ?? 6,
        salary: employee.salary ?? 0,
        status: employee.status || 'Active',
      });
    }
  }, [employee, reset]);

  const onSubmit = async (values) => {
    try {
      const payload = { ...values };
      ['branch', 'department', 'designation', 'reportingManager'].forEach((key) => {
        if (!payload[key]) delete payload[key];
      });
      await updateEmployee({ id, ...payload }).unwrap();
      toast.success('Employee updated');
      navigate(`/dashboard/employees/${id}`);
    } catch (error) {
      toast.error(error?.data?.message || 'Could not update employee');
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]"
      >
        <ArrowLeft size={14} /> Back
      </button>
      <h1 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
        Edit {employee?.user?.firstName} {employee?.user?.lastName}
      </h1>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Select
            label="Company"
            options={(companies || []).map((c) => ({ label: c.companyName, value: c._id }))}
            {...register('company')}
            error={errors.company?.message}
          />
          <div className="grid grid-cols-2 gap-3">
            <Select label="Branch" options={(branches || []).map((b) => ({ label: b.branchName, value: b._id }))} {...register('branch')} />
            <Select label="Department" options={(departments || []).map((d) => ({ label: d.departmentName, value: d._id }))} {...register('department')} />
          </div>
          <Select
            label="Designation"
            options={(designations || []).map((d) => ({ label: d.designationName, value: d._id }))}
            {...register('designation')}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Joining date" type="date" {...register('joiningDate')} error={errors.joiningDate?.message} />
            <Select
              label="Employment type"
              options={['Permanent', 'Contract', 'Intern', 'Consultant'].map((v) => ({ label: v, value: v }))}
              {...register('employmentType')}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Monthly salary" type="number" {...register('salary')} />
            <Select
              label="Status"
              options={['Active', 'Inactive', 'On Leave', 'Resigned', 'Terminated'].map((v) => ({ label: v, value: v }))}
              {...register('status')}
            />
          </div>
          <Button type="submit" className="w-full" isLoading={isSaving}>
            Save changes
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default EditEmployee;
