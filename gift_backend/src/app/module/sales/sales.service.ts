/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Gift } from '../gift/gift.model';
import { TSale } from './sales.interface';
import { Sale } from './sales.model';

const createSaleIntoDB = async (payload: TSale) => {
  const { productId, quantity, buyerName, date, user } = payload;

  // Find the product
  const product = await Gift.findById(productId);

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  // Check if requested quantity exceeds available stock
  if (quantity > product.quantity) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Insufficient stock');
  }
  // Reduce the available stock
  product.quantity -= quantity;

  // If stock reaches zero, delete the product
  if (product.quantity === 0) {
    await Gift.findByIdAndDelete(productId);
  } else {
    await product.save();
  }

  const totalPrice = quantity * product.price;
  // Add sale record
  const sale = await Sale.create({
    productId,
    quantity,
    buyerName,
    date,
    user,
    totalPrice,
  });
  return sale;
};

const getSaleHistoryFromDB = async (payload: any) => {
  const { interval } = payload;

  // Define default interval (e.g., daily if not specified)
  const defaultInterval = 'daily';

  // Determine the time interval to use (default to daily if not specified)
  const selectedInterval = interval || defaultInterval;

  let dateFormat;

  switch (selectedInterval) {
    case 'weekly':
      dateFormat = '%Y-%U';
      break;
    case 'monthly':
      dateFormat = '%Y-%m';
      break;
    case 'yearly':
      dateFormat = '%Y';
      break;
    case 'daily':
    default:
      dateFormat = '%Y-%m-%d';
      break;
  }

  const dateProjection = {
    $dateToString: { format: dateFormat, date: '$date' },
  };

  const sales = await Sale.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'userData',
      },
    },
    {
      $unwind: '$userData',
    },
    {
      $group: {
        _id: {
          user: '$user',
          date: dateProjection,
        },
        totalSales: { $sum: '$quantity' },
        totalPrice: { $sum: '$totalPrice' },
        userDetails: { $first: '$userData' },
      },
    },
    {
      $project: {
        _id: 0,
        date: '$_id.date',
        totalSales: 1,
        totalPrice: 1,
        userDetails: 1,
      },
    },
  ]);

  return sales;
};

export const SaleServices = {
  createSaleIntoDB,
  getSaleHistoryFromDB,
};
