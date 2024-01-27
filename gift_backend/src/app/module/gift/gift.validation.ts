import { z } from 'zod';

const giftValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    occasion: z.string().optional(),
    recipient: z.string().optional(),
    category: z.string().optional(),
    theme: z.string().optional(),
    brand: z.string().optional(),
  }),
});
const giftUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    price: z.number().optional(),
    quantity: z.number().optional(),
    occasion: z.string().optional(),
    recipient: z.string().optional(),
    category: z.string().optional(),
    theme: z.string().optional(),
    brand: z.string().optional(),
  }),
});

export const GiftValidation = {
  giftValidationSchema,
  giftUpdateValidationSchema,
};
