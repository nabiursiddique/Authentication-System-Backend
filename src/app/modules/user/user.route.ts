import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidations.userValidationSchema),
  UserControllers.createUser,
);

router.get('/all-users', UserControllers.getAllUsers);

export const UserRoutes = router;
