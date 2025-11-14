import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await ProductService.getProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await ProductService.getProductById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await ProductService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await ProductService.updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ProductService.deleteProduct(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const createProductReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rating, comment } = req.body;
    // @ts-ignore
    const user = req.user;
    await ProductService.createProductReview(req.params.id, user, rating, comment);
    res.status(201).json({ message: 'Review added' });
  } catch (error) {
    next(error);
  }
};
