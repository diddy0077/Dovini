import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import {
  Eye,
  Star,
  ShoppingCart,
  Heart,
  Zap,
  Award,
  TrendingUp,
  Plus,
  Check,
  Sparkles
} from 'lucide-react';

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showSuccess } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Simulate product status (in a real app, this would come from props or API)
  const isNew = index < 3; // First 3 products are "new"
  const isBestseller = index % 4 === 0; // Every 4th product is bestseller
  const isOnSale = index % 7 === 0; // Every 7th product is on sale
  const discount = isOnSale ? Math.floor(Math.random() * 30) + 10 : 0;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    setIsAddingToCart(true);

    // Simulate API call delay
    setTimeout(() => {
      addToCart(product);
      showSuccess(`${product.name} added to cart!`);
      setIsAddingToCart(false);
    }, 600);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    toggleWishlist(product);
    showSuccess(
      isInWishlist(product.id)
        ? `${product.name} removed from wishlist`
        : `${product.name} added to wishlist!`
    );
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    // In a real app, this would open a modal
    showSuccess(`Quick view for ${product.name}`);
  };

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -12, rotateY: 2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="card overflow-hidden relative"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-600 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-red-400 rounded-full blur-xl"></div>
        </div>

        {/* Product Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col space-y-2">
          <AnimatePresence>
            {isNew && (
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -45 }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg"
              >
                <Zap className="w-3 h-3" />
                <span>NEW</span>
              </motion.div>
            )}
            {isBestseller && (
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -45 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg"
              >
                <Award className="w-3 h-3" />
                <span>BESTSELLER</span>
              </motion.div>
            )}
            {isOnSale && (
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -45 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg"
              >
                <TrendingUp className="w-3 h-3" />
                <span>-{discount}%</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link to={`/product/${product.id}`} className="block">
          {/* Image Section */}
          <div className="relative overflow-hidden">
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />

            {/* Dynamic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
              animate={isHovered ? { x: ["-100%", "100%"] } : {}}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
            />

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <motion.button
                onClick={handleWishlistToggle}
                className="bg-white/90 backdrop-blur-md rounded-full p-3 shadow-lg hover:bg-white transition-all duration-200"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    isInWishlist(product.id)
                      ? 'text-red-600 fill-red-600'
                      : 'text-gray-700 hover:text-red-600'
                  }`}
                />
              </motion.button>

              <motion.button
                onClick={handleQuickView}
                className="bg-white/90 backdrop-blur-md rounded-full p-3 shadow-lg hover:bg-white transition-all duration-200"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Eye className="w-5 h-5 text-gray-700" />
              </motion.button>
            </div>

            {/* Quick Add to Cart Overlay */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
                >
                  <motion.button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className="w-full bg-white text-red-600 font-semibold py-2 px-4 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isAddingToCart ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Adding...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Quick Add</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Content Section */}
          <div className="p-6">
            {/* Product Name */}
            <motion.h3
              className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors duration-300 line-clamp-2 leading-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {product.name}
            </motion.h3>

            {/* Rating and Price Row */}
            <motion.div
              className="flex items-center justify-between mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-gray-600 ml-1">(4.8)</span>
              </div>

              <div className="flex items-center space-x-2">
                {isOnSale && (
                  <span className="text-sm text-gray-500 line-through">
                    ₦{(product.price * (1 + discount / 100)).toLocaleString()}
                  </span>
                )}
                <span className="text-2xl font-bold gradient-bg bg-clip-text text-transparent">
                  ₦{product.price.toLocaleString()}
                </span>
              </div>
            </motion.div>

            {/* Product Features */}
            <motion.div
              className="flex items-center justify-between text-sm text-gray-600 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center space-x-1">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center space-x-1">
                <Check className="w-4 h-4 text-green-500" />
                <span>In Stock</span>
              </div>
            </motion.div>
          </div>
        </Link>

        {/* Add to Cart Button */}
        <div className="px-6 pb-6">
          <motion.button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="btn-primary w-full flex items-center justify-center space-x-2 relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <AnimatePresence mode="wait">
              {isAddingToCart ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center space-x-2"
                >
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span>Adding to Cart...</span>
                </motion.div>
              ) : (
                <motion.div
                  key="add"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-red-400 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;