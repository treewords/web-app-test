import { Link, Outlet } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
        <nav>
          <ul>
            <li><Link to="/admin/products" className="block py-2">Products</Link></li>
            <li><Link to="/admin/orders" className="block py-2">Orders</Link></li>
            <li><Link to="/admin/users" className="block py-2">Users</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-grow p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPage;
