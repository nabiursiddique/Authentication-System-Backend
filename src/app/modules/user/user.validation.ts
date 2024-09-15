import { z } from 'zod';

const userValidationSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Invalid email' })
    .min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  phone: z.string().trim().min(1, { message: 'Phone is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  role: z.enum(['admin', 'user']).optional(),
});

export const UserValidations = {
  userValidationSchema,
};
