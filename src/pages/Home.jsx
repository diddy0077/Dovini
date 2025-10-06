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
import { Phone, Trophy, Truck, MessageCircle, ArrowRight, Award, Users, Clock, Zap, Package, Heart, ShoppingBag, Timer, Flame, Sparkles,Star, Eye, Share2, Bell } from 'lucide-react';
import CallForDealsBanner from '../components/CallForDeals';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

const PhoneIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.08 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showSuccess, showError } = useToast();

  const featuredProducts = products.slice(0, 8); // Show first 8 products
  const flashDeals = products.filter(product => product.isFlashDeal).slice(0, 6);
  const limitedStock = products.filter(product => product.isLimitedStock).slice(0, 6);

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
      <BannerSlider />

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
              className="text-4xl md:text-5xl font-black text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Limited Time Offers
            </motion.h2>

            <motion.p
              className="text-xl text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Don't miss out on these incredible deals - ending soon!
            </motion.p>

            {/* Countdown Timer */}
            <motion.div
              className="inline-flex items-center space-x-6 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-xl border border-red-200"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
            >
              <Clock className="w-8 h-8 text-red-600" />
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-3xl font-black text-red-600">{timeLeft.hours.toString().padStart(2, '0')}</div>
                  <div className="text-sm text-gray-600 font-medium">HOURS</div>
                </div>
                <div className="text-4xl font-bold text-red-400">:</div>
                <div className="text-center">
                  <div className="text-3xl font-black text-red-600">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                  <div className="text-sm text-gray-600 font-medium">MINUTES</div>
                </div>
                <div className="text-4xl font-bold text-red-400">:</div>
                <div className="text-center">
                  <div className="text-3xl font-black text-red-600">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                  <div className="text-sm text-gray-600 font-medium">SECONDS</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Flash Deals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashDeals.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-red-100">
                  {/* Flash Deal Badge */}
                  <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse-slow">
                    -{product.discount}%
                  </div>

                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Quick Actions */}
                    <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.button
                        onClick={() => handleWishlistToggle(product)}
                        className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'text-red-600 fill-red-600' : 'text-red-600'}`} />
                      </motion.button>
                      <motion.button
                        onClick={() => handleQuickView(product)}
                        className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Eye className="w-4 h-4 text-red-600" />
                      </motion.button>
                      <motion.button
                        onClick={() => handleShare(product)}
                        className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Share2 className="w-4 h-4 text-red-600" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                      {product.name}
                    </h3>

                    {/* Pricing */}
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-2xl font-black text-red-600">
                        ₦{product.price.toLocaleString()}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ₦{product.originalPrice.toLocaleString()}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({product.reviews})</span>
                    </div>

                    {/* Stock Indicator */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Package className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600 font-medium">
                          {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
                        </span>
                      </div>
                      <motion.button
                        onClick={() => handleBuyNow(product)}
                        className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Buy Now</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View More Button */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => navigate('/products?flashDeals=true')}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-3 mx-auto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Flame className="w-6 h-6" />
              <span>View All Flash Deals</span>
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Limited Stock Deals Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 relative overflow-hidden">
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
              className="text-4xl md:text-5xl font-black text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Almost Gone - Limited Stock!
            </motion.h2>

            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              These premium items are selling fast. Secure yours before they're gone!
            </motion.p>
          </motion.div>

          {/* Limited Stock Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {limitedStock.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: index * 0.15, duration: 0.6, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-amber-100">
                  {/* Limited Stock Badge */}
                  <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-bounce-slow">
                    Limited Stock
                  </div>

                  {/* Stock Warning */}
                  <div className="absolute top-3 right-3 z-20 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    Only {product.stock} left
                  </div>

                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Urgency Indicator */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm animate-pulse-slow">
                        ACT FAST!
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                      {product.name}
                    </h3>

                    {/* Action Buttons Row */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex space-x-2">
                        <motion.button
                          onClick={() => handleWishlistToggle(product)}
                          className="p-2 rounded-lg bg-gray-100 hover:bg-red-100 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'text-red-600 fill-red-600' : 'text-gray-600'}`} />
                        </motion.button>
                        <motion.button
                          onClick={() => handleQuickView(product)}
                          className="p-2 rounded-lg bg-gray-100 hover:bg-blue-100 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </motion.button>
                        <motion.button
                          onClick={() => handleShare(product)}
                          className="p-2 rounded-lg bg-gray-100 hover:bg-green-100 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Share2 className="w-4 h-4 text-gray-600" />
                        </motion.button>
                      </div>
                      <motion.button
                        onClick={() => handleNotifyWhenBackInStock(product)}
                        className="p-2 rounded-lg bg-gray-100 hover:bg-purple-100 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Bell className="w-4 h-4 text-gray-600" />
                      </motion.button>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-2xl font-black text-amber-600">
                        ₦{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          ₦{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({product.reviews})</span>
                    </div>

                    {/* Progress Bar for Stock */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Stock Level</span>
                        <span>{product.stock} remaining</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(product.stock / 20) * 100}%` }}
                          transition={{ delay: index * 0.2, duration: 1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      onClick={() => handleGrabItNow(product)}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Zap className="w-5 h-5" />
                      <span>Grab It Now</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
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
                <ArrowRight className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            <motion.h2
              className="text-5xl md:text-6xl font-black text-gray-800 mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Featured <span className="gradient-bg bg-clip-text text-white">Categories</span>
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              { number: '500+', label: 'Products', icon: Trophy },
              { number: '50+', label: 'Brands', icon: Award },
              { number: '10K+', label: 'Customers', icon: Users },
              { number: '24/7', label: 'Support', icon: MessageCircle }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="inline-flex p-3 rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-white mb-3"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <stat.icon className="w-6 h-6" />
                </motion.div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

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
                  className="bg-white text-red-600 px-8 py-3 rounded-full font-bold hover:bg-red-50 transition-colors flex items-center space-x-2 mx-auto shadow-lg"
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
      <section className="py-20 bg-gradient-to-br from-white via-red-50/30 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-red-500 rounded-full blur-2xl"></div>
        </div>

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
                <Trophy className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            <motion.h2
              className="text-5xl md:text-6xl font-black text-gray-800 mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Why Choose <span className="gradient-bg bg-clip-text text-transparent">Dovini</span>?
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              We're not just another camera store. We're your creative partner, providing
              premium equipment, expert guidance, and unparalleled support for your artistic journey.
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Trophy,
                title: 'Premium Quality Guaranteed',
                description: 'Every product undergoes rigorous testing to ensure it meets our exacting standards for professional use.',
                stats: '99.8%',
                statLabel: 'Quality Rating',
                gradient: 'from-yellow-400 to-orange-500',
                bgGradient: 'from-yellow-50 to-orange-50',
                features: ['Rigorous Testing', 'Brand Authenticity', 'Warranty Coverage']
              },
              {
                icon: Truck,
                title: 'Lightning Fast Delivery',
                description: 'Same-day shipping on in-stock items with real-time tracking and secure packaging for your gear.',
                stats: '24hrs',
                statLabel: 'Average Delivery',
                gradient: 'from-blue-500 to-cyan-500',
                bgGradient: 'from-blue-50 to-cyan-50',
                features: ['Express Shipping', 'Real-time Tracking', 'Secure Packaging']
              },
              {
                icon: MessageCircle,
                title: 'Expert Support Team',
                description: 'Our certified technicians and photography experts are here to help you choose and use your equipment.',
                stats: '24/7',
                statLabel: 'Support Available',
                gradient: 'from-green-500 to-emerald-500',
                bgGradient: 'from-green-50 to-emerald-50',
                features: ['Certified Experts', 'Technical Support', 'Usage Guidance']
              },
              {
                icon: Phone,
                title: 'Direct Manufacturer Access',
                description: 'We work directly with manufacturers to offer exclusive deals and early access to new products.',
                stats: '50+',
                statLabel: 'Brand Partnerships',
                gradient: 'from-purple-500 to-pink-500',
                bgGradient: 'from-purple-50 to-pink-50',
                features: ['Exclusive Deals', 'Early Access', 'Direct Support']
              },
              {
                icon: ArrowRight,
                title: 'Flexible Financing',
                description: 'Easy payment plans and financing options to make professional equipment accessible to all creators.',
                stats: '0%',
                statLabel: 'Interest Options',
                gradient: 'from-red-500 to-rose-500',
                bgGradient: 'from-red-50 to-rose-50',
                features: ['Payment Plans', 'Easy Financing', 'Budget Options']
              },
              {
                icon: Trophy,
                title: 'Award-Winning Service',
                description: 'Recognized industry-wide for our exceptional customer service and product expertise.',
                stats: '15+',
                statLabel: 'Industry Awards',
                gradient: 'from-indigo-500 to-purple-500',
                bgGradient: 'from-indigo-50 to-purple-50',
                features: ['Industry Recognition', 'Customer Awards', 'Expert Endorsements']
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ delay: index * 0.15, duration: 0.8, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, rotateY: 5 }}
                style={{ perspective: "1000px" }}
              >
                <div className={`relative p-8 rounded-3xl bg-gradient-to-br ${feature.bgGradient} border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-full blur-xl`}></div>
                  </div>

                  {/* Icon */}
                  <motion.div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg mb-6`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <feature.icon className="w-8 h-8" />
                  </motion.div>

                  {/* Stats Badge */}
                  <motion.div
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-md"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.5, type: "spring", stiffness: 300 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-lg font-bold text-gray-800">{feature.stats}</div>
                    <div className="text-xs text-gray-600">{feature.statLabel}</div>
                  </motion.div>

                  {/* Content */}
                  <motion.h3
                    className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-red-600 transition-colors duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    {feature.title}
                  </motion.h3>

                  <motion.p
                    className="text-gray-600 mb-6 leading-relaxed"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 + 0.4 }}
                    viewport={{ once: true }}
                  >
                    {feature.description}
                  </motion.p>

                  {/* Feature List */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.15 + 0.5 }}
                    viewport={{ once: true }}
                  >
                    {feature.features.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        className="flex items-center text-sm text-gray-700"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 + 0.6 + itemIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient} mr-3`}></div>
                        {item}
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Hover Effect Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                  />

                  {/* Decorative Elements */}
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-red-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="absolute -top-1 -left-1 w-3 h-3 bg-red-400 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block p-8 rounded-3xl bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white shadow-2xl"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-bold mb-2">Ready to Elevate Your Craft?</h3>
              <p className="text-red-100 mb-6">Join thousands of creators who trust Dovini for their equipment needs.</p>
              <motion.button
                className="bg-white text-red-600 px-8 py-3 rounded-full font-bold hover:bg-red-50 transition-colors flex items-center space-x-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Start Shopping Today</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-red-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our handpicked selection of professional photography equipment
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="btn-primary px-8 py-3 text-lg flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View All Products</span>
              <ArrowRight className="w-5 h-5" />
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