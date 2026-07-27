import { useState } from 'react';
import clsx from 'clsx';
import OrgResourceManager from '../../components/organization/OrgResourceManager';
import {
  companySchema,
  branchSchema,
  departmentSchema,
  designationSchema,
} from '../../utils/validationSchemas';
import {
  useGetCompanysQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  useGetBranchsQuery,
  useCreateBranchMutation,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetDesignationsQuery,
  useCreateDesignationMutation,
  useUpdateDesignationMutation,
  useDeleteDesignationMutation,
} from '../../redux/api/organizationApi';

const TABS = ['Companies', 'Branches', 'Departments', 'Designations'];

const OrganizationSettings = () => {
  const [tab, setTab] = useState('Companies');
  const { data: companies } = useGetCompanysQuery();
  const { data: departments } = useGetDepartmentsQuery();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-[var(--text-primary)]">Organization</h1>
        <p className="text-sm text-[var(--text-muted)]">
          Set up companies, branches, departments and designations. These power the dropdowns in Employee records.
        </p>
      </div>

      <div className="flex gap-1 overflow-x-auto rounded-xl bg-[var(--bg-surface-alt)] p-1">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={clsx(
              'flex-1 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              tab === t ? 'bg-grad-primary text-white shadow-glow' : 'text-[var(--text-secondary)] hover:bg-white/40',
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Companies' && (
        <OrgResourceManager
          title="Company"
          description="Legal entities within your organization."
          schema={companySchema}
          useListQuery={useGetCompanysQuery}
          useCreateMutation={useCreateCompanyMutation}
          useUpdateMutation={useUpdateCompanyMutation}
          useDeleteMutation={useDeleteCompanyMutation}
          fields={[
            { name: 'companyName', label: 'Company name' },
            { name: 'companyCode', label: 'Company code' },
            { name: 'email', label: 'Email' },
            { name: 'phone', label: 'Phone' },
            { name: 'city', label: 'City' },
          ]}
          columns={[
            { key: 'companyName', label: 'Name' },
            { key: 'companyCode', label: 'Code' },
            { key: 'city', label: 'City' },
          ]}
        />
      )}

      {tab === 'Branches' && (
        <OrgResourceManager
          title="Branch"
          description="Office locations under each company."
          schema={branchSchema}
          useListQuery={useGetBranchsQuery}
          useCreateMutation={useCreateBranchMutation}
          useUpdateMutation={useUpdateBranchMutation}
          useDeleteMutation={useDeleteBranchMutation}
          fields={[
            { name: 'branchName', label: 'Branch name' },
            { name: 'branchCode', label: 'Branch code' },
            {
              name: 'company',
              label: 'Company',
              type: 'select',
              options: (companies || []).map((c) => ({ label: c.companyName, value: c._id })),
            },
            { name: 'city', label: 'City' },
          ]}
          columns={[
            { key: 'branchName', label: 'Name' },
            { key: 'branchCode', label: 'Code' },
            { key: 'company', label: 'Company', render: (item) => item.company?.companyName || '—' },
          ]}
        />
      )}

      {tab === 'Departments' && (
        <OrgResourceManager
          title="Department"
          description="Functional groups employees belong to."
          schema={departmentSchema}
          useListQuery={useGetDepartmentsQuery}
          useCreateMutation={useCreateDepartmentMutation}
          useUpdateMutation={useUpdateDepartmentMutation}
          useDeleteMutation={useDeleteDepartmentMutation}
          fields={[
            { name: 'departmentName', label: 'Department name' },
            { name: 'departmentCode', label: 'Department code' },
          ]}
          columns={[
            { key: 'departmentName', label: 'Name' },
            { key: 'departmentCode', label: 'Code' },
          ]}
        />
      )}

      {tab === 'Designations' && (
        <OrgResourceManager
          title="Designation"
          description="Job titles mapped to a department."
          schema={designationSchema}
          useListQuery={useGetDesignationsQuery}
          useCreateMutation={useCreateDesignationMutation}
          useUpdateMutation={useUpdateDesignationMutation}
          useDeleteMutation={useDeleteDesignationMutation}
          fields={[
            { name: 'designationName', label: 'Designation name' },
            { name: 'designationCode', label: 'Designation code' },
            {
              name: 'department',
              label: 'Department',
              type: 'select',
              options: (departments || []).map((d) => ({ label: d.departmentName, value: d._id })),
            },
            { name: 'level', label: 'Level', type: 'number' },
          ]}
          columns={[
            { key: 'designationName', label: 'Name' },
            { key: 'designationCode', label: 'Code' },
            { key: 'department', label: 'Department', render: (item) => item.department?.departmentName || '—' },
          ]}
        />
      )}
    </div>
  );
};

export default OrganizationSettings;
