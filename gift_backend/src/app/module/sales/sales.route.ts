import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SaleValidation } from './sales.validation';
import { SalesController } from './sales.controller';
// import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-sale',
  validateRequest(SaleValidation.saleValidationSchema),
  SalesController.saleProduct,
);
router.get('/', SalesController.getAllSales);
// router.get('/:id', GiftControllers.getSingleGift);
// router.put(
//   '/update-gift/:id',
//   validateRequest(GiftValidation.giftUpdateValidationSchema),
//   GiftControllers.updateGift,
// );
// router.delete('/:id', GiftControllers.deleteGift);

export const SaleRoutes = router;
