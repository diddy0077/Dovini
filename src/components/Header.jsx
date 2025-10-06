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
    <>
         <div className="bg-red-600 hidden sm:block">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 flex justify-end space-x-4">
                    <a href="#" className="text-xs text-white opacity-90 hover:opacity-100 transition">Buy on Dovini</a>
                    <a href="#" className="text-xs text-white opacity-90 hover:opacity-100 transition">Download App</a>
                </div>
            </div>
      <HeaderAd/>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md border-b border-red-100">
        <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="bg-red-600 p-1.5 sm:p-2 rounded-lg shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart w-4 h-4 sm:w-6 sm:h-6 text-white" aria-hidden="true"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
          </div>
          <Link
            to="/"
            className="text-lg sm:text-2xl font-extrabold bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent hover:scale-110 transition-transform duration-300"
          >
            DOVINI <span className="text-gray-800 text-sm sm:text-base">Camera<br className="sm:hidden"/> & Gears</span>
          </Link>
          </div>

          {/* Navigation (Desktop) */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              to="/"
              className="relative flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-all duration-300 font-medium group after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Home</span>
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
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-all duration-300"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 lg:w-8 lg:h-8 rounded-full border-2 border-red-200"
                  />
                  <span className="font-medium text-sm lg:text-base hidden xl:inline">{user.name}</span>
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
              <div className="flex items-center space-x-2 lg:space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-red-600 font-medium text-sm lg:text-base transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg font-medium text-sm lg:text-base hover:shadow-lg transition-all duration-200"
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
          <div className="md:hidden mt-4 pb-4 border-t border-red-100 pt-4 animate-slide-in-left">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="flex items-center space-x-3 text-gray-700 hover:text-red-600 transition-all duration-300 font-medium p-2.5 rounded-lg hover:bg-red-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home className="w-4 h-4" />
                <span className="text-sm">Home</span>
              </Link>

              <Link
                to="/wishlist"
                className="flex items-center space-x-3 text-gray-700 hover:text-red-600 transition-all duration-300 font-medium relative p-2.5 rounded-lg hover:bg-red-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Heart className="w-4 h-4" />
                <span className="text-sm">Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="bg-red-600 text-white text-xs rounded-full px-2 py-0.5 font-bold ml-2 animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className="flex items-center space-x-3 text-gray-700 hover:text-red-600 transition-all duration-300 font-medium relative p-2.5 rounded-lg hover:bg-red-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="text-sm">Cart</span>
                {cartCount > 0 && (
                  <span className="bg-red-600 text-white text-xs rounded-full px-2 py-0.5 font-bold ml-2 animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Auth Section (Mobile) */}
              {user ? (
                <div className="border-t border-red-100 pt-4 mt-4">
                  <div className="flex items-center space-x-2 p-2.5 bg-red-50 rounded-lg mb-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border-2 border-red-200"
                    />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{user.name}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-3 text-gray-700 hover:text-red-600 transition-all duration-300 font-medium p-2.5 rounded-lg hover:bg-red-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm">Profile</span>
                    </Link>
                    <Link
                      to="/orders"
                      className="flex items-center space-x-3 text-gray-700 hover:text-red-600 transition-all duration-300 font-medium p-2.5 rounded-lg hover:bg-red-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span className="text-sm">Orders</span>
                    </Link>
                    {user.role === 'seller' && (
                      <Link
                        to="/seller/dashboard"
                        className="flex items-center space-x-3 text-gray-700 hover:text-red-600 transition-all duration-300 font-medium p-2.5 rounded-lg hover:bg-red-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span className="text-sm">Seller Dashboard</span>
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 w-full text-red-600 hover:text-red-700 transition-all duration-300 font-medium p-2.5 rounded-lg hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-t border-red-100 pt-3 mt-3 space-y-2">
                  <Link
                    to="/login"
                    className="flex items-center justify-center w-full bg-red-600 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center justify-center w-full bg-white text-red-600 font-semibold py-2.5 px-4 rounded-lg border-2 border-red-600 shadow-md hover:bg-red-50 transition-all duration-300 text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              <div className="flex items-center space-x-2 text-white font-semibold bg-red-600 px-4 py-2.5 rounded-lg shadow-md mt-3 text-sm">
                <Phone className="w-4 h-4" />
                <span>08063971335</span>
              </div>
            </nav>
          </div>
        )}

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mt-4 sm:mt-6 relative group">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 sm:pl-14 pr-12 sm:pr-14 py-3 sm:py-4 border border-gray-200 rounded-full focus:outline-none focus:ring-4 focus:ring-red-200 focus:border-transparent shadow-md hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm text-sm sm:text-base"
          />
          <Search className="absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
          <button
            type="submit"
            className="absolute flex items-center justify-center right-2 sm:right-3 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-1.5 sm:p-2 rounded-full hover:bg-red-700 transition-colors"
          >
            <Search className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </form>
      </div>
    </header>
    </>
  );
};

export default Header;
