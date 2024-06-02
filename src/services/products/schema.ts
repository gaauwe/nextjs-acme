import { z } from 'zod';

export const productSchema = z.object({
  id: z.number(),
  image: z.string(),
  name: z.string(),
  price: z.string(),
  status: z.string(),
  category: z.string(),
  totalSales: z.string(),
  createdAt: z.string(),
});

export type Product = z.infer<typeof productSchema>;
