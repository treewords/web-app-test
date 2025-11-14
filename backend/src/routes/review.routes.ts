import { Router } from 'express';
import { deleteReview } from '../controllers/review.controller';
import { protect, admin } from '../middleware/authMiddleware';

const router = Router();

router.route('/:id').delete(protect, admin, deleteReview);

export default router;
