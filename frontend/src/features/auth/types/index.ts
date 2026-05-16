import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(['Admin', 'Sales']).default('Sales'),
});

export type LoginCredentials = z.infer<typeof loginSchema>;
export type RegisterCredentials = z.input<typeof registerSchema>;

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}
