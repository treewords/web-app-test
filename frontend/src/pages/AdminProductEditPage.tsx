import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Product } from '../types';

const AdminProductEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    images: [],
  });

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      };
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/products/${id}`, product);
      } else {
        await api.post('/products', product);
      }
      navigate('/admin/products');
    } catch (err) {
      console.error('Failed to save product');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{id ? 'Edit Product' : 'Add Product'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea name="description" value={product.description} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div>
          <label className="block text-gray-700">Price</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div>
          <label className="block text-gray-700">Stock</label>
          <input type="number" name="stock" value={product.stock} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save Product
        </button>
      </form>
    </div>
  );
};

export default AdminProductEditPage;
