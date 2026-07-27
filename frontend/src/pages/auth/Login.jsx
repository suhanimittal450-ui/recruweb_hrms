import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import AuthLayout from '../../layouts/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { loginSchema } from '../../utils/validationSchemas';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values) => {
    try {
      await login(values);
      const redirectTo = location.state?.from?.pathname || '/dashboard';
      navigate(redirectTo, { replace: true });
    } catch {
      // toast already shown by useAuth
    }
  };

  return (
    <AuthLayout>
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-2xl font-semibold text-[var(--text-primary)]"
      >
        Welcome back
      </motion.h1>
      <p className="mt-1 text-sm text-[var(--text-muted)]">Sign in to your HRMS workspace.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <Input label="Email address" type="email" icon={Mail} {...register('email')} error={errors.email?.message} />
        <Input label="Password" type="password" icon={Lock} {...register('password')} error={errors.password?.message} />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-[var(--text-secondary)]">
            <input type="checkbox" className="rounded border-[var(--border-glass)]" />
            Remember me
          </label>
          <Link to="/forgot-password" className="font-medium text-primary hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-medium text-primary hover:underline">
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
