import React from 'react';
import { useForm } from 'react-hook-form';
import type { RegisterFormData, User } from '../types/auth';
import { localStorageService } from '../utils/localStorage';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onRegisterSuccess: () => void; 
}

const RegisterForm: React.FC<RegisterFormProps> = ({ 
  onSwitchToLogin, 
  onRegisterSuccess 
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset
  } = useForm<RegisterFormData>({
    mode: 'onChange'
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      console.log('Form submitted with data:', data);

      if (localStorageService.checkEmailExists(data.email)) {
        setError('email', {
          type: 'manual',
          message: 'Email already registered'
        });
        return;
      }

      if (!/^05\d{8}$/.test(data.mobileNumber)) {
        setError('mobileNumber', {
          type: 'manual',
          message: 'Must start with 05 and contain 10 digits'
        });
        return;
      }

      const password = data.password;
      if (password.length < 8) {
        setError('password', {
          type: 'manual',
          message: 'Password must be at least 8 characters'
        });
        return;
      }

      if (!/(?=.*[A-Z])/.test(password)) {
        setError('password', {
          type: 'manual',
          message: 'Password must contain at least one uppercase letter'
        });
        return;
      }

      if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password)) {
        setError('password', {
          type: 'manual',
          message: 'Password must contain at least one special character'
        });
        return;
      }

      const user: User = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobileNumber: data.mobileNumber,
        password: password
      };

      localStorageService.saveUser(user);
      
      console.log('User registered successfully:', user);
      
      reset();
      
      if (onRegisterSuccess) {
        onRegisterSuccess();
      } else {
        console.error('onRegisterSuccess is not defined');
      }
      
    } catch (error) {
      console.error('Registration error:', error);
      setError('root', {
        type: 'manual',
        message: error instanceof Error ? error.message : 'Registration failed'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <h2>Sign Up</h2>

      {errors.root && (
        <div className="error">{errors.root.message}</div>
      )}
      
      <input 
        type="text" 
        placeholder="First name" 
        className="input"
        {...register("firstName", { required: 'First name is required' })} 
      />
      {errors.firstName && (
        <div className="error">{errors.firstName.message}</div>
      )}
      
      <input 
        type="text" 
        placeholder="Last name" 
        className="input"
        {...register("lastName", { required: 'Last name is required' })} 
      />
      {errors.lastName && (
        <div className="error">{errors.lastName.message}</div>
      )}
      
      <input 
        type="email" 
        placeholder="Email" 
        className="input"
        {...register("email", { 
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Invalid email format'
          }
        })} 
      />
      {errors.email && (
        <div className="error">{errors.email.message}</div>
      )}
      
      <input 
        type="tel" 
        placeholder="Mobile number (05XXXXXXXX)" 
        className="input"
        {...register("mobileNumber", { 
          required: 'Mobile number is required',
          minLength: {
            value: 10,
            message: 'Mobile number must be 10 digits'
          },
          maxLength: {
            value: 10,
            message: 'Mobile number must be 10 digits'
          }
        })} 
      />
      {errors.mobileNumber && (
        <div className="error">{errors.mobileNumber.message}</div>
      )}

      <input 
        type="password" 
        placeholder="Password" 
        className="input"
        {...register("password", { 
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters'
          }
        })} 
      />
      {errors.password && (
        <div className="error">{errors.password.message}</div>
      )}

      <button 
        type="submit" 
        className="submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing Up...' : 'Sign Up'}
      </button>

      <p className="switch-form-text">
        Already have an account? 
        <span className="switch-link" onClick={onSwitchToLogin}>
          Login 
        </span>
      </p>
    </form>
  );
};

export default RegisterForm;