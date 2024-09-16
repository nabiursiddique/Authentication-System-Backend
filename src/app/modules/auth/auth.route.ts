import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidations } from './auth.validation';
import { AuthControllers } from './auth.controller';

const router = Router();

router.post(
  '/signIn',
  validateRequest(AuthValidations.signInUserValidationSchema),
  AuthControllers.signInUser,
);

export const AuthRoutes = router;
