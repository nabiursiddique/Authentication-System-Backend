import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const user = req.body;
  const result = await UserServices.createUserIntoDB(user);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Users retrieved successfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getAllUsers,
};
