import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Tag, MessageCircle, Clock, Award } from 'lucide-react';

// --- Framer Motion Variants ---
const itemVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 150, damping: 20 } },
};

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const CallForDealsBanner = () => {
  return (
    <motion.div
      className="relative overflow-hidden md:mx-auto mx-4 max-w-7xl rounded-2xl sm:rounded-3xl shadow-2xl my-8 sm:my-12 "
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      style={{
        backgroundImage: `linear-gradient(rgba(239, 68, 68, 0.9), rgba(220, 38, 38, 0.95)), url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '280px'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full blur-lg"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Container for content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left Content Section */}
          <motion.div
            className="text-center lg:text-left"
            initial="initial"
            animate="animate"
            variants={containerVariants}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 sm:mb-6"
              variants={itemVariants}
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <span className="text-white font-semibold text-sm sm:text-base">24/7 SUPPORT</span>
            </motion.div>

            {/* Main Title */}
            <motion.h2
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white mb-3 sm:mb-4 leading-tight drop-shadow-lg"
              variants={itemVariants}
            >
              Need Expert Advice?
              <br />
              <span className="text-red-200">Call Our Photography Pros</span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              className="text-base sm:text-lg lg:text-xl text-red-100 mb-6 sm:mb-8 max-w-md mx-auto lg:mx-0 drop-shadow-md"
              variants={itemVariants}
            >
              Get personalized recommendations, exclusive deals, and instant answers from our certified photography experts.
            </motion.p>

            {/* Features List */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 mb-6 sm:mb-8"
              variants={itemVariants}
            >
              <div className="flex items-center space-x-2 text-white/90">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
                <span className="text-sm sm:text-base font-medium">Certified Experts</span>
              </div>
              <div className="flex items-center space-x-2 text-white/90">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" />
                <span className="text-sm sm:text-base font-medium">24/7 Available</span>
              </div>
              <div className="flex items-center space-x-2 text-white/90">
                <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" />
                <span className="text-sm sm:text-base font-medium">Exclusive Deals</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content Section - Phone Number */}
          <motion.div
            className="text-center lg:text-right"
            initial="initial"
            animate="animate"
            variants={containerVariants}
          >
            {/* Phone Number CTA */}
            <motion.a
              href="tel:08063971335"
              className="group block"
              variants={itemVariants}
            >
              <motion.div
                className="bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 hover:bg-white/20 transition-all duration-300 shadow-2xl"
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 drop-shadow-2xl tracking-wider"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  080-6397-1335
                </motion.div>

                <motion.div
                  className="flex items-center justify-center lg:justify-end space-x-2 text-white/90 mb-4"
                  variants={itemVariants}
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base font-medium">Tap to Call Now</span>
                </motion.div>

                <motion.button
                  className="bg-white text-red-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base lg:text-lg shadow-xl hover:bg-red-50 transition-all duration-300 flex items-center justify-center space-x-2 mx-auto lg:mx-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Call for Deals</span>
                </motion.button>
              </motion.div>
            </motion.a>

            {/* Additional Info */}
            <motion.p
              className="text-xs sm:text-sm text-white/80 mt-4 max-w-sm mx-auto lg:mx-0 lg:text-right"
              variants={itemVariants}
            >
              Free consultation • No obligation • Instant expert advice
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-4 right-4 w-3 h-3 bg-white/30 rounded-full"
        animate={{
          y: [0, -10, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-4 left-4 w-2 h-2 bg-white/40 rounded-full"
        animate={{
          y: [0, 8, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </motion.div>
  );
};

// Main App component to make the file runnable
export default CallForDealsBanner;
