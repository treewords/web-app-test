import { AppDataSource } from '../config/database';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { Review } from '../models/Review';

const productRepository = AppDataSource.getRepository(Product);
const reviewRepository = AppDataSource.getRepository(Review);

export class ProductService {
  static async getProducts(): Promise<Product[]> {
    return await productRepository.find({ relations: ['category', 'reviews'] });
  }

  static async getProductById(id: string): Promise<Product | null> {
    return await productRepository.findOne({ where: { id }, relations: ['category', 'reviews'] });
  }

  static async createProduct(productData: Partial<Product>): Promise<Product> {
    const product = productRepository.create(productData);
    return await productRepository.save(product);
  }

  static async updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
    const product = await productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error('Product not found');
    }
    Object.assign(product, productData);
    return await productRepository.save(product);
  }

  static async deleteProduct(id: string): Promise<void> {
    await productRepository.delete(id);
  }

  static async createProductReview(productId: string, user: User, rating: number, comment: string): Promise<void> {
    const product = await productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new Error('Product not found');
    }

    const review = new Review();
    review.product = product;
    review.user = user;
    review.rating = rating;
    review.comment = comment;

    await reviewRepository.save(review);
  }
}
