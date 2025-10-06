import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Package, Sparkles } from "lucide-react";
import { products } from "../data/products";

const CategoryCard = ({ category }) => {
  // Get product count for this category
  const categoryProducts = products.filter(product => product.categoryId === category.id);
  const productCount = categoryProducts.length;

  // Get average price for the category
  const avgPrice = categoryProducts.length > 0
    ? Math.round(categoryProducts.reduce((sum, product) => sum + product.price, 0) / categoryProducts.length)
    : 0;

  return (
    <motion.div
      className="group cursor-pointer"
      whileHover={{ y: -12, rotateY: 5 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ perspective: "1000px" }}
    >
      <Link to={`/products?category=${category.name.toLowerCase().replace(/\s+/g, '-')}`} className="block">
        <motion.div
          className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden relative border border-gray-100"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4 }}
        >
          {/* Background Pattern */}
          <div className="absolute pointer-events-none inset-0 opacity-5">
            <div className="absolute pointer-events-none top-0 right-0 w-32 h-32 bg-red-600 rounded-full blur-3xl"></div>
            <div className="absolute pointer-events-none bottom-0 left-0 w-24 h-24 bg-red-400 rounded-full blur-2xl"></div>
          </div>

          {/* Image Section */}
          <div className="relative overflow-hidden">
            <motion.img
              src={category.image}
              alt={category.name}
              className="w-full h-40 sm:h-48 lg:h-56 object-cover"
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.6 }}
            />

            {/* Dynamic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Floating Elements */}
            <motion.div
              className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-red-600 shadow-lg"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Package className="w-3 h-3 inline mr-1" />
              {productCount} items
            </motion.div>

            {/* Hover CTA */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
              initial={{ scale: 0.8, rotate: -45 }}
              whileHover={{ scale: 1.1, rotate: 0 }}
            >
              <motion.div
                className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full p-4 shadow-2xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRight className="w-6 h-6" />
              </motion.div>
            </motion.div>

            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            />
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-5 lg:p-6 relative z-10">
            {/* Category Name */}
            <motion.h3
              className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-red-600 transition-colors duration-300 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {category.name}
            </motion.h3>

            {/* Description */}
            <motion.p
              className="text-gray-600 text-xs sm:text-sm text-center mb-3 sm:mb-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Professional {category.name.toLowerCase()} equipment for creators and photographers
            </motion.p>

            {/* Stats */}
            <motion.div
              className="flex items-center justify-between text-xs sm:text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center text-gray-500">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-yellow-500" />
                <span className="hidden sm:inline">Premium Quality</span>
                <span className="sm:hidden">Premium</span>
              </div>
              <div className="text-red-600 font-semibold">
                From ₦{avgPrice.toLocaleString()}
              </div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              className="mt-4 bg-gray-200 rounded-full h-2 overflow-hidden"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((productCount / 5) * 100, 100)}%` }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
            </motion.div>

            {/* Call to Action */}
            <motion.div
              className="mt-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.span
                className="inline-flex items-center text-red-600 font-medium text-sm group-hover:text-red-700"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Explore Collection
                <ArrowRight className="w-4 h-4 ml-1" />
              </motion.span>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-red-400 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;

