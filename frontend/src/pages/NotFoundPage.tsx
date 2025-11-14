import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold">404 - Not Found</h1>
      <p className="mt-4">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="mt-6 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
