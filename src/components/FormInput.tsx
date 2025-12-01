import React from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import '../App.css';

interface FormInputProps {
  type: string;
  placeholder?: string;
  className?: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
  maxLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}

const FormInput: React.FC<FormInputProps> = ({
  type,
  placeholder,
  className = "",
  error,
  registration,
  maxLength,
  inputMode
}) => {
  return (
    <div className="form-input-wrapper">
      <input
        type={type}
        placeholder={placeholder}
        className={`input ${className}`}
        maxLength={maxLength}
        inputMode={inputMode}
        {...registration}
      />

      {error && <div className="error">{error.message}</div>}
    </div>
  );
};

export default FormInput;
