import React from "react";
import { motion } from "framer-motion";

const NewsletterSignup = () => {
  return (
    <motion.div
      className="bg-red-100 py-12 rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.6 }}
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-red-800 mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-700 mb-8">
          Get exclusive deals and be the first to know about new products.
        </p>
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-64 px-4 py-2 rounded-l-md focus:outline-none text-gray-700"
          />
          <button className="btn-primary rounded-r-md px-6">Subscribe</button>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsletterSignup;
