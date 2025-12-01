import { z } from 'zod';

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password: string;
}

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(1, 'Password is required')
});

export type LoginFormData = z.infer<typeof loginSchema>;

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password: string;
}