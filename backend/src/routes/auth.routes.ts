import { Router } from 'express';
import { register, login, logout, refreshToken } from '../controllers/auth.controller';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, logout);
router.post('/refresh-token', refreshToken);

export default router;
