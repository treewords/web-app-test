import { Router } from 'express';
import { createCheckoutSession, stripeWebhook } from '../controllers/payment.controller';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/create-checkout-session', protect, createCheckoutSession);
router.post('/webhook', stripeWebhook);

export default router;
