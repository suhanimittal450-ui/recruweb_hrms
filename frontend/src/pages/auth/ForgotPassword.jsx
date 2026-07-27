import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import AuthLayout from '../../layouts/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { forgotPasswordSchema } from '../../utils/validationSchemas';
import { authService } from '../../services/authService';
import { extractErrorMessage } from '../../hooks/useAuth';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = async ({ email }) => {
    try {
      await authService.forgotPassword(email);
      toast.success('OTP sent to your email');
      navigate('/reset-password', { state: { email: getValues('email') } });
    } catch (error) {
      toast.error(extractErrorMessage(error));
    }
  };

  return (
    <AuthLayout>
      <h1 className="font-display text-2xl font-semibold text-[var(--text-primary)]">Forgot your password?</h1>
      <p className="mt-1 text-sm text-[var(--text-muted)]">
        Enter your email and we&apos;ll send you a one-time code to reset it.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <Input label="Email address" type="email" icon={Mail} {...register('email')} error={errors.email?.message} />
        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Send reset code
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
        Remembered it?{' '}
        <Link to="/login" className="font-medium text-primary hover:underline">
          Back to sign in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default ForgotPassword;
