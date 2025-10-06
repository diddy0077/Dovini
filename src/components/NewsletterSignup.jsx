import React from "react";
import { motion } from "framer-motion";

const NewsletterSignup = () => {
  return (
    <motion.div
      className="bg-red-100 py-8 sm:py-12 rounded-xl sm:rounded-2xl shadow-lg mx-4 sm:mx-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.6 }}
    >
      <div className="container mx-auto text-center px-4">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-800 mb-3 sm:mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-700 mb-6 sm:mb-8 text-sm sm:text-base">
          Get exclusive deals and be the first to know about new products.
        </p>
        <div className="flex flex-col sm:flex-row justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-64 px-4 py-3 sm:py-2 rounded-t-md sm:rounded-l-md sm:rounded-r-none focus:outline-none text-gray-700 border border-red-200 sm:border-r-0"
          />
          <button className="btn-primary rounded-b-md sm:rounded-r-md sm:rounded-l-none px-6 py-3 sm:py-2 mt-2 sm:mt-0 text-sm sm:text-base">
            Subscribe
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsletterSignup;
