import { DataSource } from 'typeorm';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { Order } from '../models/Order';
import { Review } from '../models/Review';
import { Category } from '../models/Category';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true, // Set to false in production
  logging: false,
  entities: [Product, User, Order, Review, Category],
  migrations: [],
  subscribers: [],
});
