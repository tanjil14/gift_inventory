import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { GiftControllers } from './gift.controller';
import { GiftValidation } from './gift.validation';
import auth from '../../middlewares/auth';
// import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-gift',
  auth(),
  validateRequest(GiftValidation.giftValidationSchema),
  GiftControllers.createGift,
);
router.get('/', auth(), GiftControllers.getAllGifts);
router.get('/:id', auth(), GiftControllers.getSingleGift);
router.put(
  '/update-gift/:id',
  auth(),
  validateRequest(GiftValidation.giftUpdateValidationSchema),
  GiftControllers.updateGift,
);
router.delete('/:id', auth(), GiftControllers.deleteGift);

export const GiftRoutes = router;
