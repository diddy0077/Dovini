import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/ProductCard';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { showSuccess } = useToast();

  const handleRemoveFromWishlist = (productId, productName) => {
    removeFromWishlist(productId);
    showSuccess(`${productName} removed from wishlist`);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-12 h-12 text-red-600 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              My Wishlist
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your saved items are waiting for you. Browse through your favorite products and add them to cart when you're ready.
          </p>
        </motion.div>

        {/* Wishlist Content */}
        {wishlist.length > 0 ? (
          <>
            {/* Stats */}
            <motion.div
              className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-6 mb-8 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="flex items-center justify-center space-x-8">
                <div>
                  <div className="text-3xl font-bold text-red-600">{wishlist.length}</div>
                  <div className="text-sm text-gray-600">Saved Items</div>
                </div>
                <div className="w-px h-12 bg-red-200"></div>
                <div>
                  <div className="text-3xl font-bold text-red-600">
                    ₦{wishlist.reduce((total, item) => total + item.price, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Value</div>
                </div>
              </div>
            </motion.div>

            {/* Products Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {wishlist.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative group"
                >
                  <ProductCard product={product} />

                  {/* Remove from Wishlist Button */}
                  <motion.button
                    onClick={() => handleRemoveFromWishlist(product.id, product.name)}
                    className="absolute top-3 right-3 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-700 hover:scale-110 shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="text-center mt-12 space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link
                to="/cart"
                className="btn-primary px-8 py-3 text-lg inline-flex items-center space-x-2 mr-4"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>View Cart</span>
              </Link>
              <Link
                to="/"
                className="btn-secondary px-8 py-3 text-lg inline-flex items-center space-x-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Continue Shopping</span>
              </Link>
            </motion.div>
          </>
        ) : (
          /* Empty Wishlist State */
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-16 h-16 text-red-400" />
            </motion.div>

            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your wishlist is empty</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              Start saving your favorite products by clicking the heart icon on any product card.
            </p>

            <Link
              to="/"
              className="btn-primary px-8 py-4 text-lg inline-flex items-center space-x-2"
            >
              <ShoppingBag className="w-6 h-6" />
              <span>Start Shopping</span>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;