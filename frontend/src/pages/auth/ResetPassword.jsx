import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, KeyRound, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import AuthLayout from '../../layouts/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { resetPasswordSchema } from '../../utils/validationSchemas';
import { authService } from '../../services/authService';
import { extractErrorMessage } from '../../hooks/useAuth';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: location.state?.email || '' },
  });

  const onSubmit = async ({ email, otp, newPassword }) => {
    try {
      await authService.resetPassword({ email, otp, newPassword });
      toast.success('Password reset. Please sign in.');
      navigate('/login', { replace: true });
    } catch (error) {
      toast.error(extractErrorMessage(error));
    }
  };

  return (
    <AuthLayout>
      <h1 className="font-display text-2xl font-semibold text-[var(--text-primary)]">Reset your password</h1>
      <p className="mt-1 text-sm text-[var(--text-muted)]">Enter the OTP we emailed you and choose a new password.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <Input label="Email address" type="email" icon={Mail} {...register('email')} error={errors.email?.message} />
        <Input label="OTP code" icon={KeyRound} {...register('otp')} error={errors.otp?.message} />
        <Input label="New password" type="password" icon={Lock} {...register('newPassword')} error={errors.newPassword?.message} />
        <Input
          label="Confirm new password"
          type="password"
          icon={Lock}
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />

        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Reset password
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
        <Link to="/login" className="font-medium text-primary hover:underline">
          Back to sign in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default ResetPassword;
