import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HotDealsSection = ({ products }) => {
  return (
    <motion.div
      className="py-8 bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-red-800 mb-6 text-center">
        Hot Deals 🔥
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        {products &&
          products.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
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
    </motion.div>
  );
};

export default HotDealsSection;
