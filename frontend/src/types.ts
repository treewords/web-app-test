export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: Category;
  reviews: Review[];
}

export interface Category {
  id: string;
  name: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface Order {
  id: string;
  total: number;
  status: string;
  items: OrderItem[];
  user: User;
  createdAt: string;
}

export interface OrderItem {
  price: number;
  quantity: number;
  product: Product;
}
