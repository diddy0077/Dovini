import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <motion.div
      className="relative bg-gray-100 overflow-hidden rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <img
        src="https://images.unsplash.com/photo-1519389950473-47a0480f545f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        alt="Camera equipment"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative px-6 py-12 md:px-12 md:py-24 text-white">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Capture Your Best Moments
        </h2>
        <p className="text-lg mb-8">
          Find the perfect camera and equipment for your photography journey.
        </p>
        <Link to="/products" className="btn-primary">
          Shop Now
        </Link>
      </div>
    </motion.div>
  );
};

export default HeroSection;
