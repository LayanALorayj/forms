import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData, type User } from '../types/auth';
import { localStorageService } from '../utils/localStorage';
import type { RegisterFormField } from '../types/formFields';
import registerFields from '../json/registerFields.json';
import FormInput from './FormInput';
import '../App.css';

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
    resolver: zodResolver(registerSchema),
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


      const user: User = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobileNumber: data.mobileNumber,
        password: data.password
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

  const fields = registerFields as RegisterFormField[];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <h2>Sign Up</h2>

      {errors.root && (
        <div className="error">{errors.root.message}</div>
      )}
      
      {fields.map((field) => (
        <FormInput
          key={field.name}
          type={field.type}
          placeholder={field.placeholder || field.label}
          className={field.className}
          error={errors[field.name]}
          registration={register(field.name)}
          maxLength={field.name === 'mobileNumber' ? 10 : undefined}
          inputMode={field.name === 'mobileNumber' ? 'numeric' : undefined}
        />
      ))}
      
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