import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import HeaderAd from "./HeaderAds";
import {
  Home,
  Grid3X3,
  ShoppingCart,
  ShoppingBag,
  Phone,
  Search,
  Menu,
  X,
  Heart,
  User,
  LogOut,
  Settings,
} from "lucide-react";

const Header = () => {
  const { cart } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const userMenuRef = useRef(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-red-100">
      <HeaderAd/>
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
              to="/products"
              className="relative flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-all duration-300 font-medium group after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Shop</span>
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

          {/* User Menu / Auth (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-all duration-300"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border-2 border-red-200"
                  />
                  <span className="font-medium">{user.name}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-1 text-xs bg-red-100 text-red-600 rounded-full capitalize">
                        {user.role}
                      </span>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/orders"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Orders</span>
                    </Link>
                    {user.role === 'seller' && (
                      <Link
                        to="/seller/dashboard"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Seller Dashboard</span>
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Call for Deals (Desktop) */}
            <div className="hidden lg:flex items-center space-x-2 text-white font-semibold bg-red-600 px-4 py-2 rounded-full shadow-md hover:bg-red-700 transition cursor-pointer">
              <Phone className="w-5 h-5" />
              <span>08063971335</span>
            </div>
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

              {/* Auth Section (Mobile) */}
              {user ? (
                <div className="border-t border-red-100 pt-4 mt-4">
                  <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg mb-4">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full border-2 border-red-200"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-3 text-gray-700 hover:text-red-600 transition-all duration-300 font-medium p-3 rounded-lg hover:bg-red-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/orders"
                      className="flex items-center space-x-3 text-gray-700 hover:text-red-600 transition-all duration-300 font-medium p-3 rounded-lg hover:bg-red-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span>Orders</span>
                    </Link>
                    {user.role === 'seller' && (
                      <Link
                        to="/seller/dashboard"
                        className="flex items-center space-x-3 text-gray-700 hover:text-red-600 transition-all duration-300 font-medium p-3 rounded-lg hover:bg-red-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Settings className="w-5 h-5" />
                        <span>Seller Dashboard</span>
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 w-full text-red-600 hover:text-red-700 transition-all duration-300 font-medium p-3 rounded-lg hover:bg-red-50"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-t border-red-100 pt-4 mt-4 space-y-3">
                  <Link
                    to="/login"
                    className="flex items-center justify-center w-full bg-red-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center justify-center w-full bg-white text-red-600 font-semibold py-3 px-4 rounded-lg border-2 border-red-600 shadow-md hover:bg-red-50 transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              <div className="flex items-center space-x-3 text-white font-semibold bg-red-600 px-4 py-3 rounded-lg shadow-md mt-4">
                <Phone className="w-5 h-5" />
                <span>08063971335</span>
              </div>
            </nav>
          </div>
        )}

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mt-6 relative group">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-14 py-4 border border-gray-200 rounded-full focus:outline-none focus:ring-4 focus:ring-red-200 focus:border-transparent shadow-md hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm text-base md:text-sm"
          />
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
