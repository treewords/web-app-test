import { Request, Response, NextFunction } from 'express';
import { PaymentService } from '../services/payment.service';
import { OrderService } from '../services/order.service';

export const createCheckoutSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderId } = req.body;
    // @ts-ignore
    const user = req.user;
    const session = await PaymentService.createCheckoutSession(orderId, user);
    res.json({ id: session.id });
  } catch (error) {
    next(error);
  }
};

export const stripeWebhook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sig = req.headers['stripe-signature'];
    await PaymentService.handleWebhook(req.body, sig);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
