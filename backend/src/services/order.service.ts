import { AppDataSource } from '../config/database';
import { Order } from '../models/Order';
import { OrderItem } from '../models/OrderItem';
import { Product } from '../models/Product';
import { User } from '../models/User';

const orderRepository = AppDataSource.getRepository(Order);
const productRepository = AppDataSource.getRepository(Product);

export class OrderService {
  static async createOrder(
    user: User,
    orderItemsData: { productId: string; quantity: number }[],
    shippingAddress: any, // Define a proper type/interface for this
    paymentMethod: string
  ): Promise<Order> {
    const orderItems: OrderItem[] = [];
    let total = 0;

    for (const itemData of orderItemsData) {
      const product = await productRepository.findOne({ where: { id: itemData.productId } });
      if (!product) {
        throw new Error(`Product with ID ${itemData.productId} not found`);
      }
      if (product.stock < itemData.quantity) {
        throw new Error(`Not enough stock for ${product.name}`);
      }

      const orderItem = new OrderItem();
      orderItem.product = product;
      orderItem.quantity = itemData.quantity;
      orderItem.price = product.price;
      orderItems.push(orderItem);

      total += product.price * itemData.quantity;
      product.stock -= itemData.quantity;
      await productRepository.save(product);
    }

    const order = new Order();
    order.user = user;
    order.items = orderItems;
    order.total = total;
    // You'd also save shippingAddress and paymentMethod on the order model
    // order.shippingAddress = shippingAddress;
    // order.paymentMethod = paymentMethod;

    return await orderRepository.save(order);
  }

  static async getOrderById(id: string): Promise<Order | null> {
    return await orderRepository.findOne({ where: { id }, relations: ['user', 'items', 'items.product'] });
  }

  static async getMyOrders(user: User): Promise<Order[]> {
    return await orderRepository.find({ where: { user: { id: user.id } }, relations: ['items', 'items.product'] });
  }

  static async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    const order = await orderRepository.findOne({where: {id: orderId}});
    if(!order) {
        throw new Error('Order not found');
    }
    order.status = status;
    return await orderRepository.save(order);
  }
}
