import Stripe from 'stripe';
import { OrderService } from './order.service';
import { AppDataSource } from '../config/database';
import { Order } from '../models/Order';
import { User } from '../models/User';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});
const orderRepository = AppDataSource.getRepository(Order);

export class PaymentService {
  static async createCheckoutSession(orderId: string, user: User): Promise<Stripe.Checkout.Session> {
    const order = await orderRepository.findOne({ where: { id: orderId }, relations: ['items', 'items.product'] });

    if (!order) {
      throw new Error('Order not found');
    }
    if (order.user.id !== user.id) {
        throw new Error('Unauthorized');
    }

    const line_items = order.items.map((item) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.name,
          },
          unit_amount: Math.round(item.product.price * 100),
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/order/${order.id}`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
      metadata: {
        orderId: order.id,
      },
    });

    return session;
  }

  static async handleWebhook(payload: any, sig: string | string[] | Buffer): Promise<void> {
    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err: any) {
      throw new Error(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata!.orderId;
      await OrderService.updateOrderStatus(orderId, 'paid');
    }
  }
}
