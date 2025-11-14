import { Request, Response, NextFunction } from 'express';
import { OrderService } from '../services/order.service';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;
    // @ts-ignore
    const user = req.user;
    const order = await OrderService.createOrder(user, orderItems, shippingAddress, paymentMethod);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await OrderService.getOrderById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const user = req.user;
    const orders = await OrderService.getMyOrders(user);
    res.json(orders);
  } catch (error) {
    next(error);
  }
};
