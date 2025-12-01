import type{ LoginFormData, RegisterFormData } from './auth';

export interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  className: string;
  validation?: {
    required?: string | boolean;
    minLength?: {
      value: number;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
    pattern?: {
      value: RegExp | string;
      message: string;
    };
    validate?: (value: any) => boolean | string;
  };
}

export interface LoginFormField extends FormField {
  name: keyof LoginFormData;
}

export interface RegisterFormField extends FormField {
  name: keyof RegisterFormData;
}

export type AnyFormField = LoginFormField | RegisterFormField;