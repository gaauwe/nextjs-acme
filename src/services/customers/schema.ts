import { z } from 'zod';

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  role: z.string(),
  createdAt: z.string(),
});

export type Product = z.infer<typeof productSchema>;
