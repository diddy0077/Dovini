import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FeaturedProductsSection = ({ products }) => {
  return (
    <motion.div
      className="py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products &&
          products.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-red-600 font-bold">
                    ₦{product.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
      </div>
      <div className="text-center mt-8">
        <Link to="/products" className="btn-secondary">
          View All Products
        </Link>
      </div>
    </motion.div>
  );
};

export default FeaturedProductsSection;
