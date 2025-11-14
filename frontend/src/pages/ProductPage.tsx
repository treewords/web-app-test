import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Product } from '../types';
import { useCartStore } from '../store/cartStore';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      navigate('/cart');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <img src={product.images[0]} alt={product.name} className="w-full rounded-lg shadow-lg" />
      </div>
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-2xl text-gray-800 my-4">${product.price}</p>
        <p className="text-gray-600">{product.description}</p>
        <button
          onClick={handleAddToCart}
          className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add to Cart
        </button>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {product.reviews.length === 0 && <p>No reviews yet.</p>}
        {product.reviews.map((review) => (
          <div key={review.id} className="border-b py-4">
            <p><strong>{review.user.firstName}</strong> - {review.rating}/5</p>
            <p>{review.comment}</p>
          </div>
        ))}
        <form className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Write a review</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Rating</label>
            <select className="w-full px-3 py-2 border rounded">
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Comment</label>
            <textarea className="w-full px-3 py-2 border rounded" rows={3}></textarea>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductPage;
