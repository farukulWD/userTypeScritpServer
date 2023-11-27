import express from 'express';
import { userControllers } from './user.controler';

const router = express.Router();

router.post('/api/users', userControllers.createUser);
router.get('/api/users', userControllers.getAllUser);
router.get('/api/users/:userId', userControllers.getSingleUser);
router.put('/api/users/:userId', userControllers.updateSingleUser);
router.delete('/api/users/:userId', userControllers.deleteUser);
router.put('/api/users/:userId/orders', userControllers.addOrder);
router.get('/api/users/:userId/orders', userControllers.getAllOrders);
router.get(
  '/api/users/:userId/orders/total-price',
  userControllers.getTotalPriceOfOrders,
);
export const userRoutes = router;
