import { Request, Response, NextFunction } from 'express';
import { ReviewService } from '../services/review.service';

export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ReviewService.deleteReview(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
