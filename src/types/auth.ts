import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z.string()
    .min(1, 'First name is required')
    .max(50, 'First name must be less than 50 characters'),
  
  lastName: z.string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be less than 50 characters'),
  
  email: z.string()
    .email('Invalid email format')
    .min(1, 'Email is required'),
  
  mobileNumber: z.string()
    .length(10, 'Mobile number must be 10 digits')
    .regex(/^05\d{8}$/, 'Must start with 05 and contain 10 digits'),
  
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
    .regex(/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/, 'Password must contain at least one special character')
});

export const loginSchema = z.object({
  email: z.string()
    .email('Invalid email format')
    .min(1, 'Email is required'),
  password: z.string()
    .min(1, 'Password is required')
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password: string;
}