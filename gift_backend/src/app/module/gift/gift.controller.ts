import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { GiftServices } from './gift.service';

const createGift = catchAsync(async (req, res) => {
  const result = await GiftServices.createGiftIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Gift is create succesfully!',
    data: result,
  });
});
const getSingleGift = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await GiftServices.getSingleGiftFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Gift is retrieved succesfully',
    data: result,
  });
});

const getAllGifts = catchAsync(async (req, res) => {
  const result = await GiftServices.getAllGiftFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Gifts are retrieved successfully',
    data: result,
  });
});

const updateGift = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await GiftServices.updateGiftIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Gift is updated succesfully',
    data: result,
  });
});

const deleteGift = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await GiftServices.deleteGiftFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Gift is deleted succesfully',
    data: result,
  });
});

export const GiftControllers = {
  createGift,
  deleteGift,
  updateGift,
  getAllGifts,
  getSingleGift,
};
