import { useCartStore } from '../store/cartStore';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity } = useCartStore();

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty. <Link to="/" className="text-blue-500">Go shopping</Link></p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center">
                <img src={item.images[0]} alt={item.name} className="w-24 h-24 object-cover rounded mr-4" />
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 text-center border rounded mx-4"
                />
                <button onClick={() => removeFromCart(item.id)} className="text-red-500">Remove</button>
              </div>
            </div>
          ))}
          <div className="mt-6 text-right">
            <h2 className="text-2xl font-semibold">Total: ${total.toFixed(2)}</h2>
            <Link to="/checkout" className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
