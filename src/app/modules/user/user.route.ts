import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/create-user', UserControllers.createUser);

router.get('/all-users', UserControllers.getAllUsers);

export const UserRoutes = router;
