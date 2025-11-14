import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import { Order } from '../types';

const OrderPage = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data);
      } catch (err) {
        setError('Failed to fetch order');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!order) return <div>Order not found</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <p><strong>Order ID:</strong> {order.id}</p>
      <p><strong>Total:</strong> ${order.total}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <h2 className="text-2xl font-semibold mt-6">Items</h2>
      {order.items.map((item) => (
        <div key={item.product.id} className="flex items-center justify-between border-b py-4">
          <div className="flex items-center">
            <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-24 object-cover rounded mr-4" />
            <div>
              <h3 className="text-xl font-semibold">{item.product.name}</h3>
              <p className="text-gray-600">${item.price} x {item.quantity}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderPage;
