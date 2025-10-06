import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BannerSlider from '../components/BannerSlider';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import NewsletterSignup from '../components/NewsletterSignup';
import Testimonials from '../components/Testimonials';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { Phone, Trophy, Truck, MessageCircle, ArrowRight, Award, Users, Clock, Zap, Package, Heart, ShoppingBag, Timer, Flame, Sparkles,Star, Eye, Share2, Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import CallForDealsBanner from '../components/CallForDeals';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import Hero from '../components/Hero';

const PhoneIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.08 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showSuccess, showError } = useToast();

  const featuredProducts = products // Show first 8 products
  const flashDeals = products.filter(product => product.isFlashDeal).slice(0, 6);
  const limitedStock = products.filter(product => product.isLimitedStock).slice(0, 9);

  // Countdown timer for flash deals
  const [timeLeft, setTimeLeft] = useState({ hours: 24, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handler functions for interactive buttons
  const handleBuyNow = (product) => {
    addToCart(product);
    showSuccess(`🎉 ${product.name} added to cart!`, {
      action: {
        label: 'View Cart',
        onClick: () => navigate('/cart')
      }
    });
  };

  const handleGrabItNow = (product) => {
    addToCart(product);
    showSuccess(`⚡ ${product.name} secured! Limited stock grabbed!`, {
      action: {
        label: 'Checkout Now',
        onClick: () => navigate('/cart')
      }
    });
  };

  const handleWishlistToggle = (product) => {
    toggleWishlist(product);
    const isInWish = isInWishlist(product.id);
    showSuccess(
      isInWish
        ? `💔 ${product.name} removed from wishlist`
        : `❤️ ${product.name} added to wishlist!`
    );
  };

  const handleQuickView = (product) => {
    navigate(`/product/${product.id}`);
  };

  const handleShare = (product) => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this amazing ${product.name} on Dovini!`,
        url: window.location.origin + `/product/${product.id}`
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.origin + `/product/${product.id}`);
      showSuccess('🔗 Product link copied to clipboard!');
    }
  };

  const handleNotifyWhenBackInStock = (product) => {
    showSuccess(`🔔 We'll notify you when ${product.name} is back in stock!`);
  };

  

  return (
    <div className="min-h-screen">
      {/* Banner Slider */}
      <Hero />

      {/* Call for Deals Section */}
    <CallForDealsBanner/>

      {/* Flash Deals Section */}
      <section className="py-16 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-red-500 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-500 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-yellow-500 rounded-full blur-2xl animate-pulse-slow"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full mb-6 shadow-xl"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
            >
              <Flame className="w-6 h-6 animate-bounce-slow" />
              <span className="font-bold text-lg">FLASH DEALS</span>
              <Zap className="w-6 h-6 animate-bounce-slow" />
            </motion.div>

            <motion.h2
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-800 mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Limited Time Offers
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Don't miss out on these incredible deals - ending soon!
            </motion.p>

            {/* Countdown Timer */}
            <motion.div
              className="inline-flex items-center space-x-3 sm:space-x-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-3 sm:py-4 shadow-lg border border-red-200"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
            >
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0" />
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-red-600 leading-none">{timeLeft.hours.toString().padStart(2, '0')}</div>
                  <div className="text-xs text-gray-600 font-medium">HRS</div>
                </div>
                <div className="text-lg sm:text-xl font-bold text-red-400 leading-none">:</div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-red-600 leading-none">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                  <div className="text-xs text-gray-600 font-medium">MIN</div>
                </div>
                <div className="text-lg sm:text-xl font-bold text-red-400 leading-none">:</div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-red-600 leading-none">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                  <div className="text-xs text-gray-600 font-medium">SEC</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Flash Deals Horizontal Slider */}
          <div className="relative">
            {/* Scroll Buttons */}
            <button
              onClick={() => {
                const container = document.getElementById("flash-deals-slider");
                if (container) {
                  container.scrollBy({ left: -280, behavior: "smooth" });
                }
              }}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg border border-gray-200 hover:bg-white transition-all duration-200 hidden sm:block"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            <button
              onClick={() => {
                const container = document.getElementById("flash-deals-slider");
                if (container) {
                  container.scrollBy({ left: 280, behavior: "smooth" });
                }
              }}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg border border-gray-200 hover:bg-white transition-all duration-200 hidden sm:block"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>

            {/* Horizontal Slider Container */}
            <div
              id="flash-deals-slider"
              className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {/* Custom scrollbar hide */}
              <style>{`
                #flash-deals-slider::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              {flashDeals.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-64 sm:w-72 group"
                >
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-red-100">
                    {/* Flash Deal Badge */}
                    <div className="absolute top-2 left-2 z-20 bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse-slow">
                      -{product.discount}%
                    </div>

                    {/* Product Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Quick Actions */}
                      <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.button
                          onClick={() => handleWishlistToggle(product)}
                          className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-md hover:bg-white transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Heart className={`w-3 h-3 ${isInWishlist(product.id) ? 'text-red-600 fill-red-600' : 'text-red-600'}`} />
                        </motion.button>
                        <motion.button
                          onClick={() => handleQuickView(product)}
                          className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-md hover:bg-white transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Eye className="w-3 h-3 text-red-600" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors leading-tight">
                        {product.name}
                      </h3>

                      {/* Pricing */}
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg font-black text-red-600">
                          ₦{product.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ₦{product.originalPrice.toLocaleString()}
                        </span>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center space-x-1 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">({product.reviews})</span>
                      </div>

                      {/* Stock Indicator & CTA */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Package className="w-3 h-3 text-green-600" />
                          <span className="text-xs text-green-600 font-medium">
                            {product.stock > 10 ? 'In Stock' : `${product.stock} left`}
                          </span>
                        </div>
                        <motion.button
                          onClick={() => handleBuyNow(product)}
                          className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1.5 rounded-md font-semibold text-xs hover:shadow-md transition-all duration-300 flex items-center space-x-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Buy</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* View More Button */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            viewport={{ once: true }}
          >
    
          </motion.div>
        </div>
      </section>

      {/* Limited Stock Deals Section */}
      <section className="py-2 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-36 h-36 bg-amber-500 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 left-20 w-28 h-28 bg-yellow-500 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-orange-500 rounded-full blur-2xl animate-float"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full mb-6 shadow-xl"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
            >
              <Timer className="w-6 h-6 animate-pulse-slow" />
              <span className="font-bold text-lg">LIMITED STOCK</span>
              <Sparkles className="w-6 h-6 animate-pulse-slow" />
            </motion.div>

            <motion.h2
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-800 mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Almost Gone - Limited Stock!
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              These premium items are selling fast. Secure yours before they're gone!
            </motion.p>
          </motion.div>

          {/* Limited Stock Horizontal Slider */}
          <div className="relative">
            {/* Scroll Buttons */}
            <button
              onClick={() => {
                const container = document.getElementById("limited-stock-slider");
                if (container) {
                  container.scrollBy({ left: -200, behavior: "smooth" });
                }
              }}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-lg border border-gray-200 hover:bg-white transition-all duration-200 hidden sm:block"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-4 h-4 text-gray-700" />
            </button>

            <button
              onClick={() => {
                const container = document.getElementById("limited-stock-slider");
                if (container) {
                  container.scrollBy({ left: 200, behavior: "smooth" });
                }
              }}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-lg border border-gray-200 hover:bg-white transition-all duration-200 hidden sm:block"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </button>

            {/* Horizontal Slider Container */}
            <div
              id="limited-stock-slider"
              className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {/* Custom scrollbar hide */}
              <style>{`
                #limited-stock-slider::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              {limitedStock.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-50 group"
                >
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-amber-100">
                    {/* Limited Stock Badge */}
                    <div className="absolute top-1 left-1 z-20 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-1.5 py-0.5 rounded text-xs font-bold shadow-md">
                      Limited
                    </div>

                    {/* Stock Warning */}
                    <div className="absolute top-1 right-1 z-20 bg-red-500 text-white px-1.5 py-0.5 rounded text-xs font-bold shadow-md">
                      {product.stock}
                    </div>

                    {/* Product Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-30 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Product Info */}
                    <div className="p-2">
                      <h3 className="text-xs font-bold text-gray-800 mb-1 line-clamp-2 group-hover:text-amber-600 transition-colors leading-tight">
                        {product.name}
                      </h3>

                      {/* Pricing */}
                      <div className="flex items-center space-x-1 mb-1">
                        <span className="text-sm font-black text-amber-600">
                          ₦{product.price.toLocaleString()}
                        </span>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center space-x-1 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-2.5 h-2.5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">({product.reviews})</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-1">
                          <motion.button
                            onClick={() => handleWishlistToggle(product)}
                            className="p-1 rounded bg-gray-100 hover:bg-red-100 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Heart className={`w-3 h-3 ${isInWishlist(product.id) ? 'text-red-600 fill-red-600' : 'text-gray-600'}`} />
                          </motion.button>
                          <motion.button
                            onClick={() => handleQuickView(product)}
                            className="p-1 rounded bg-gray-100 hover:bg-blue-100 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Eye className="w-3 h-3 text-gray-600" />
                          </motion.button>
                        </div>
                        <motion.button
                          onClick={() => handleGrabItNow(product)}
                          className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded text-xs font-semibold hover:shadow-md transition-all duration-300 flex items-center space-x-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Zap className="w-2.5 h-2.5" />
                          <span>Buy</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block p-8 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white shadow-2xl"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-bold mb-2">⚡ Don't Wait!</h3>
              <p className="text-amber-100 mb-6 max-w-md mx-auto">
                These limited stock items are disappearing fast. Add them to your cart before someone else gets them!
              </p>
              <motion.button
                onClick={() => navigate('/products?limitedStock=true')}
                className="bg-white text-amber-600 px-8 py-3 rounded-full font-bold hover:bg-amber-50 transition-colors flex items-center space-x-2 mx-auto shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Shop Limited Stock</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-red-50/20 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-20 w-40 h-40 bg-red-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-32 h-32 bg-red-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-1/3 w-24 h-24 bg-red-500 rounded-full blur-2xl"></div>
        </div>

        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-red-400/20 rounded-full"
            style={{
              top: `${20 + (i * 10)}%`,
              left: `${10 + (i * 12)}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block mb-6"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-2xl shadow-xl">
                <ArrowRight className="w-5 h-5 md:w-8 md:h-8 text-white" />
              </div>
            </motion.div>

            <motion.h2
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-800 mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Featured <span className="bg-clip-text text-red-600">Categories</span>
            </motion.h2>

            <motion.p
              className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Explore our comprehensive collection of professional photography equipment,
              from cameras and lenses to lighting and audio gear for every creative need.
            </motion.p>
          </motion.div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 p-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 60, rotateY: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ y: -12, rotateY: 5 }}
                style={{ perspective: "1000px" }}
                className="group"
              >
                <div className="relative">
                  {/* Category Stats Badge */}
                  <motion.div
                    className="absolute -top-3 -right-3 z-20 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                    initial={{ scale: 0, rotate: -45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: index * 0.2 + 0.5,
                      type: "spring",
                      stiffness: 300
                    }}
                    viewport={{ once: true }}
                  >
                    {Math.floor(Math.random() * 500) + 100}+ Items
                  </motion.div>

                  {/* Enhanced Category Card */}
                  <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100">
                    {/* Background Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Floating Elements */}
                    <div className="absolute top-4 left-4 w-8 h-8 bg-red-500/10 rounded-full blur-xl group-hover:bg-red-500/20 transition-colors duration-500"></div>
                    <div className="absolute bottom-4 right-4 w-6 h-6 bg-red-400/10 rounded-full blur-lg group-hover:bg-red-400/20 transition-colors duration-500"></div>

                    <CategoryCard category={category} />

                    {/* Hover Overlay */}
                    <motion.div
                      className="absolute pointer-events-none inset-0 bg-gradient-to-t from-red-600/90 via-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6"
                      initial={{ y: 20 }}
                      whileHover={{ y: 0 }}
                    >
                      <motion.button
                        className="bg-white text-red-600 px-6 py-2 rounded-full font-semibold hover:bg-red-50 transition-colors flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>Explore</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-red-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="absolute -top-1 -left-1 w-3 h-3 bg-red-400 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Category Stats Section */}
      

          {/* Call to Action */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block p-8 rounded-3xl bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white shadow-2xl relative overflow-hidden"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600"
                animate={{
                  x: ['-100%', '100%'],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">Find Your Perfect Gear</h3>
                <p className="text-red-100 mb-6 max-w-md mx-auto">
                  Browse our extensive collection and discover the tools that will elevate your creative work.
                </p>
                <motion.button
                  onClick={() => navigate('/products')}
                  className="bg-white text-red-600 px-6 py-3 rounded-full font-bold hover:bg-red-50 transition-colors flex cursor-pointer items-center space-x-2 mx-auto shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Browse All Categories</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      

      {/* Featured Products */}
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-red-50 px-5 sm:px-8 lg:px-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Section Header */}
    <motion.div
      className="text-center mb-8 sm:mb-10 lg:mb-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
        Featured Products
      </h2>
      <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
        Explore our handpicked selection of professional photography equipment
      </p>
    </motion.div>

    {/* Product Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
      {featuredProducts.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>

    {/* Button */}
    <motion.div
      className="text-center mt-10 sm:mt-12 lg:mt-14"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      viewport={{ once: true }}
    >
      <motion.button
        className="bg-red-600 text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg rounded-xl font-semibold hover:bg-red-700 transition flex items-center mx-auto space-x-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span>View All Products</span>
        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </motion.button>
    </motion.div>
  </div>
</section>


      {/* Testimonials Section */}
      {/* <Testimonials /> */}

      {/* Newsletter Signup Section */}
      <section className="py-16 bg-gradient-to-r from-red-50 to-red-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;