import { AppDataSource } from '../config/database';
import { Review } from '../models/Review';

const reviewRepository = AppDataSource.getRepository(Review);

export class ReviewService {
  static async deleteReview(id: string): Promise<void> {
    await reviewRepository.delete(id);
  }
}
