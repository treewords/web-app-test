const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-center">&copy; {new Date().getFullYear()} Kitchen Utensils. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
