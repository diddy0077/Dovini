import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Facebook, Home, Grid3X3, ShoppingCart, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="gradient-bg text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Dovini Camera & Gears</h3>
            <p className="text-red-100 mb-6 max-w-md">
              Your trusted source for professional camera equipment and gear. We provide top-quality products for photographers and videographers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-red-200 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-red-200 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-red-200 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-red-100 hover:text-white transition-colors flex items-center">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link></li>
              <li><Link to="/categories" className="text-red-100 hover:text-white transition-colors flex items-center">
                <Grid3X3 className="w-4 h-4 mr-2" />
                Categories
              </Link></li>
              <li><Link to="/cart" className="text-red-100 hover:text-white transition-colors flex items-center">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
              </Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center text-red-100">
                <Phone className="w-5 h-5 mr-3 text-red-300" />
                <div>
                  <p className="font-medium">Call for Deals</p>
                  <p>08063971335</p>
                </div>
              </div>
              <div className="flex items-center text-red-100">
                <Mail className="w-5 h-5 mr-3 text-red-300" />
                <div>
                  <p className="font-medium">Email</p>
                  <p>info@dovini.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-red-400 mt-12 pt-8 text-center">
          <p className="text-red-100">&copy; 2024 Dovini Camera & Gears. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;