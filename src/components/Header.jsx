import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import {
  Home,
  Grid3X3,
  ShoppingCart,
  Phone,
  Search,
  Menu,
  X,
  Heart,
} from "lucide-react";

const Header = () => {
  const { cart } = useCart();
  const { wishlistCount } = useWishlist();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-red-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-red-600 p-2 rounded-lg shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart w-6 h-6 text-white" aria-hidden="true"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
          </div>
          <Link
            to="/"
            className="text-2xl font-extrabold bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent hover:scale-110 transition-transform duration-300"
          >
            Dovini <span className="text-gray-800">Camera & Gears</span>
          </Link>
          </div>

          {/* Navigation (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="relative flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-all duration-300 font-medium group after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Home</span>
            </Link>

            <Link
              to="/categories"
              className="relative flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-all duration-300 font-medium group after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              <Grid3X3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Categories</span>
            </Link>

            <Link
              to="/wishlist"
              className="relative flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-all duration-300 font-medium group"
            >
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-3 -right-4 bg-red-600 text-white text-xs rounded-full px-2 py-0.5 font-bold animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-all duration-300 font-medium group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-3 -right-4 bg-red-600 text-white text-xs rounded-full px-2 py-0.5 font-bold animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Call for Deals (Desktop) */}
          <div className="hidden lg:flex items-center space-x-2 text-white font-semibold bg-red-600 px-4 py-2 rounded-full shadow-md hover:bg-red-700 transition cursor-pointer">
            <Phone className="w-5 h-5" />
            <span>08063971335</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-6 pb-6 border-t border-red-100 pt-6 animate-slide-in-left">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="flex items-center space-x-3 text-gray-700 hover:text-red-600 transition-all duration-300 font-medium p-3 rounded-lg hover:bg-red-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>

              <Link
                to="/categories"
                className="flex items-center space-x-3 text-gray-700 hover:text-red-600 transition-all duration-300 font-medium p-3 rounded-lg hover:bg-red-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Grid3X3 className="w-5 h-5" />
                <span>Categories</span>
              </Link>

              <Link
                to="/wishlist"
                className="flex items-center space-x-3 text-gray-700 hover:text-red-600 transition-all duration-300 font-medium relative p-3 rounded-lg hover:bg-red-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Heart className="w-5 h-5" />
                <span>Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="bg-red-600 text-white text-xs rounded-full px-2 py-0.5 font-bold ml-2 animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className="flex items-center space-x-3 text-gray-700 hover:text-red-600 transition-all duration-300 font-medium relative p-3 rounded-lg hover:bg-red-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="bg-red-600 text-white text-xs rounded-full px-2 py-0.5 font-bold ml-2 animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>

              <div className="flex items-center space-x-3 text-white font-semibold bg-red-600 px-4 py-3 rounded-lg shadow-md">
                <Phone className="w-5 h-5" />
                <span>08063971335</span>
              </div>
            </nav>
          </div>
        )}

        {/* Search Bar */}
        <div className="mt-6 relative group">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-14 pr-4 py-4 border border-gray-200 rounded-full focus:outline-none focus:ring-4 focus:ring-red-200 focus:border-transparent shadow-md hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm"
          />
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
        </div>
      </div>
    </header>
  );
};

export default Header;
