import { Router } from 'express';
import { createOrder, getOrderById, getMyOrders } from '../controllers/order.controller';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.route('/').post(protect, createOrder);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);

export default router;
