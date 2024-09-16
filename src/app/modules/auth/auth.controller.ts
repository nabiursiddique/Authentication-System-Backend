import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const signInUser = catchAsync(async (req, res) => {
  const result = await AuthServices.signInUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Logged In successfully',
    data: result,
  });
});

export const AuthControllers = {
  signInUser,
};
