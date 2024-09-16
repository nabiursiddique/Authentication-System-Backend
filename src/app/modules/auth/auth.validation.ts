import { z } from 'zod';

const signInUserValidationSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: 'Invalid email' })
    .min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const AuthValidations = {
  signInUserValidationSchema,
};
