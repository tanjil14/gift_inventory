import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SaleServices } from './sales.service';

const saleProduct = catchAsync(async (req, res) => {
  const result = await SaleServices.createSaleIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is sale succesfully!',
    data: result,
  });
});
const getAllSales = catchAsync(async (req, res) => {
  const result = await SaleServices.getSaleHistoryFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sale is retrived succesfully!',
    data: result,
  });
});

export const SalesController = {
  saleProduct,
  getAllSales,
};
