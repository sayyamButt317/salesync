import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export type LoginFormValidator = z.infer<typeof LoginFormSchema>;