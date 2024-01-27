import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TGift } from './gift.interface';
import { Gift } from './gift.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { GiftSearchableFields } from './gift.constant';

const createGiftIntoDB = async (payload: TGift) => {
  const result = await Gift.create(payload);
  return result;
};

const getSingleGiftFromDB = async (id: string) => {
  const result = await Gift.findById({ _id: id });
  return result;
};

const getAllGiftFromDB = async (query: Record<string, unknown>) => {
  const giftQuery = new QueryBuilder(Gift.find(), query)
    .search(GiftSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await giftQuery.modelQuery;
  const meta = await giftQuery.countTotal();
  return { meta, result };
};

const updateGiftIntoDB = async (id: string, payload: Partial<TGift>) => {
  const result = await Gift.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteGiftFromDB = async (id: string) => {
  const deletedGift = await Gift.findByIdAndDelete({ _id: id });

  if (!deletedGift) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete gift');
  }
  return deletedGift;
};

export const GiftServices = {
  createGiftIntoDB,
  deleteGiftFromDB,
  updateGiftIntoDB,
  getAllGiftFromDB,
  getSingleGiftFromDB,
};
