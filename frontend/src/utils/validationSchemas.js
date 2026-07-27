import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Mirrors backend/validators/authValidator.js registerValidator exactly.
// `role` is optional client-side (defaults to EMPLOYEE) — the backend has
// its own allowlist (SELF_REGISTERABLE_ROLES) and silently falls back to
// EMPLOYEE for anything outside it, so this is just for the picker UI.
export const SELF_REGISTERABLE_ROLES = ['EMPLOYEE', 'HR', 'MANAGER', 'TEAM_LEAD', 'RECRUITER', 'ACCOUNTANT'];

export const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(SELF_REGISTERABLE_ROLES),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Enter a valid email address'),
});

export const resetPasswordSchema = z
  .object({
    email: z.string().email('Enter a valid email address'),
    otp: z.string().min(4, 'Enter the OTP sent to your email'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const otpSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  otp: z.string().min(4, 'Enter the OTP sent to your email'),
});

// Employee wizard — Step 1 creates the User account (POST /auth/register)
export const employeeUserStepSchema = registerSchema;

// Employee wizard — Step 2 creates the Employee profile (POST /employees),
// mirroring backend/models/employee/Employee.js.
export const employeeProfileStepSchema = z.object({
  company: z.string().min(1, 'Select a company'),
  branch: z.string().optional(),
  department: z.string().optional(),
  designation: z.string().optional(),
  reportingManager: z.string().optional(),
  joiningDate: z.string().min(1, 'Joining date is required'),
  employmentType: z.enum(['Permanent', 'Contract', 'Intern', 'Consultant']),
  probationMonths: z.coerce.number().min(0).optional(),
  salary: z.coerce.number().min(0).optional(),
  status: z.enum(['Active', 'Inactive', 'On Leave', 'Resigned', 'Terminated']),
});

export const companySchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  companyCode: z.string().min(1, 'Company code is required'),
  email: z.string().email('Enter a valid email address').optional().or(z.literal('')),
  phone: z.string().optional(),
  website: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
});

export const branchSchema = z.object({
  branchName: z.string().min(1, 'Branch name is required'),
  branchCode: z.string().min(1, 'Branch code is required'),
  company: z.string().min(1, 'Select a company'),
  city: z.string().optional(),
  phone: z.string().optional(),
});

export const departmentSchema = z.object({
  departmentName: z.string().min(1, 'Department name is required'),
  departmentCode: z.string().min(1, 'Department code is required'),
});

export const designationSchema = z.object({
  designationName: z.string().min(1, 'Designation name is required'),
  designationCode: z.string().min(1, 'Designation code is required'),
  department: z.string().min(1, 'Select a department'),
  level: z.coerce.number().min(1).optional(),
});
