import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';

const Header = () => {
  const { user, logout } = useAuthStore();
  const { items } = useCartStore();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              Kitchen Utensils
            </Link>
          </div>
          <div className="flex items-center">
            <Link to="/cart" className="text-gray-600 hover:text-gray-800 mr-4">
              Cart ({items.length})
            </Link>
            {user ? (
              <>
                <Link to="/profile" className="text-gray-600 hover:text-gray-800 mr-4">
                  Profile
                </Link>
                <button onClick={logout} className="text-gray-600 hover:text-gray-800">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-800 mr-4">
                  Login
                </Link>
                <Link to="/register" className="text-gray-600 hover:text-gray-800">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
