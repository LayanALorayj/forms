import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '../types/auth';
import { localStorageService } from '../utils/localStorage';

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onSwitchToRegister, 
  onLoginSuccess 
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const user = localStorageService.validateLogin(data.email, data.password);
      
      if (user) {
        localStorageService.setCurrentUser(user);
        console.log('Login successful:', user);
        onLoginSuccess();
      } else {
        setError('root', {
          type: 'manual',
          message: 'Invalid email or password'
        });
      }
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'Login failed'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <h2>Login</h2>

      {errors.root && (
        <div className="error">{errors.root.message}</div>
      )}
      
      <input 
        type="text" 
        placeholder="Email" 
        className="input"
        {...register("email")} 
      />
      {errors.email && (
        <div className="error">{errors.email.message}</div>
      )}

      <input 
        type="password" 
        placeholder="Password" 
        className="input"
        {...register("password")} 
      />
      {errors.password && (
        <div className="error">{errors.password.message}</div>
      )}

      <button 
        type="submit" 
        className="submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>

      <p className="switch-form-text">
        Don't have an account? 
        <span className="switch-link" onClick={onSwitchToRegister}>
          Sign up 
        </span>
      </p>
    </form>
  );
};

export default LoginForm;