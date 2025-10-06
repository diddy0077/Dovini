import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Facebook, Home, Grid3X3, ShoppingCart, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="gradient-bg text-white py-8 sm:py-12 mt-12 sm:mt-16">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Dovini Camera & Gears</h3>
            <p className="text-red-100 mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
              Your trusted source for professional camera equipment and gear. We provide top-quality products for photographers and videographers.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="#" className="text-white hover:text-red-200 transition-colors">
                <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="#" className="text-white hover:text-red-200 transition-colors">
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="#" className="text-white hover:text-red-200 transition-colors">
                <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link to="/" className="text-red-100 hover:text-white transition-colors flex items-center text-sm sm:text-base">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link></li>
              <li><Link to="/categories" className="text-red-100 hover:text-white transition-colors flex items-center text-sm sm:text-base">
                <Grid3X3 className="w-4 h-4 mr-2" />
                Categories
              </Link></li>
              <li><Link to="/cart" className="text-red-100 hover:text-white transition-colors flex items-center text-sm sm:text-base">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
              </Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact Info</h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center text-red-100">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-red-300 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm sm:text-base">Call for Deals</p>
                  <p className="text-sm sm:text-base">08063971335</p>
                </div>
              </div>
              <div className="flex items-center text-red-100">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-red-300 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm sm:text-base">Email</p>
                  <p className="text-xs sm:text-sm">info@dovini.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-red-400 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
          <p className="text-red-100 text-sm sm:text-base">&copy; 2024 Dovini Camera & Gears. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;