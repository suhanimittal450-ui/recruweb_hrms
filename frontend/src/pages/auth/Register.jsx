import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, Users, Briefcase, Headset, Rocket, Wallet, UserRound } from 'lucide-react';
import AuthLayout from '../../layouts/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { registerSchema, SELF_REGISTERABLE_ROLES } from '../../utils/validationSchemas';
import { ROLE_LABELS } from '../../constants/roles';
import { useAuth } from '../../hooks/useAuth';

const ROLE_ICONS = {
  EMPLOYEE: UserRound,
  HR: Users,
  MANAGER: Briefcase,
  TEAM_LEAD: Headset,
  RECRUITER: Rocket,
  ACCOUNTANT: Wallet,
};

const Register = () => {
  const { register: registerAccount } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(registerSchema), defaultValues: { role: 'EMPLOYEE' } });

  const selectedRole = watch('role');

  const onSubmit = async (values) => {
    try {
      await registerAccount(values);
      navigate('/login', { replace: true });
    } catch {
      // toast already shown
    }
  };

  return (
    <AuthLayout>
      <h1 className="font-display text-2xl font-semibold text-[var(--text-primary)]">Create your account</h1>
      <p className="mt-1 text-sm text-[var(--text-muted)]">Join the HRMS workspace in seconds.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <div>
          <p className="mb-2 text-xs font-medium text-[var(--text-secondary)]">I am signing up as</p>
          <div className="grid grid-cols-3 gap-2">
            {SELF_REGISTERABLE_ROLES.map((role) => {
              const Icon = ROLE_ICONS[role];
              const active = selectedRole === role;
              return (
                <motion.button
                  key={role}
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setValue('role', role, { shouldValidate: true })}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-center transition-colors duration-200 ${
                    active
                      ? 'border-primary bg-primary/10 text-primary shadow-[0_0_0_3px_rgba(79,70,229,0.15)]'
                      : 'border-[var(--border-glass)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-alt)]'
                  }`}
                >
                  <Icon size={17} />
                  <span className="text-[11px] font-medium leading-tight">{ROLE_LABELS[role]}</span>
                </motion.button>
              );
            })}
          </div>
          <p className="mt-2 text-[11px] text-[var(--text-muted)]">
            Note: this is a demo signup — anyone can pick a role here to explore that dashboard. Lock this down to
            Employee-only self-signup (with HR/Admin promoting people afterward) before using this in production.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input label="First name" icon={User} {...register('firstName')} error={errors.firstName?.message} />
          <Input label="Last name" icon={User} {...register('lastName')} error={errors.lastName?.message} />
        </div>
        <Input label="Email address" type="email" icon={Mail} {...register('email')} error={errors.email?.message} />
        <Input label="Phone number" icon={Phone} {...register('phone')} error={errors.phone?.message} />
        <Input label="Password" type="password" icon={Lock} {...register('password')} error={errors.password?.message} />

        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
