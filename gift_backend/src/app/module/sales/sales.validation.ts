import { z } from 'zod';

const saleValidationSchema = z.object({
  body: z.object({
    productId: z.string(),
    quantity: z.number(),
    buyerName: z.string(),
    date: z.string(),
    user: z.string(),
  }),
});
// const giftUpdateValidationSchema = z.object({
//   body: z.object({
//     name: z.string().optional(),
//     price: z.number().optional(),
//     quantity: z.number().optional(),
//     occasion: z.string().optional(),
//     recipient: z.string().optional(),
//     category: z.string().optional(),
//     theme: z.string().optional(),
//     brand: z.string().optional(),
//   }),
// });

export const SaleValidation = {
  saleValidationSchema,
};
