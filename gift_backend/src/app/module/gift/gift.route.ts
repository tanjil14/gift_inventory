import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { GiftControllers } from './gift.controller';
import { GiftValidation } from './gift.validation';
// import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-gift',
  validateRequest(GiftValidation.giftValidationSchema),
  GiftControllers.createGift,
);
router.get('/', GiftControllers.getAllGifts);
router.get('/:id', GiftControllers.getSingleGift);
router.put(
  '/update-gift/:id',
  validateRequest(GiftValidation.giftUpdateValidationSchema),
  GiftControllers.updateGift,
);
router.delete('/:id', GiftControllers.deleteGift);

export const GiftRoutes = router;
