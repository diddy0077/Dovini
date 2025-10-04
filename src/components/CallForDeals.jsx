import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Tag } from 'lucide-react';

// --- Framer Motion Variants ---
const itemVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 150, damping: 20 } },
};

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const CallForDealsBanner = () => {
  return (
    <motion.div
      // Concise height: py-8 / py-10
      // Brand color background: Red-600
      className="relative overflow-hidden text-white py-8 md:py-10 text-center mx-auto max-w-5xl rounded-2xl shadow-xl 
                 bg-red-600"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      variants={containerVariants}
    >
      
      {/* Subtle White/Gray background texture for depth on Red-600 */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
      
      {/* Container for content */}
      <div className="relative z-10 container mx-auto px-4">
        
        {/* Animated Header Icons and Title */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6"
          initial="initial"
          animate="animate"
          variants={containerVariants}
        >
          {/* Main Title and Icon (combined for a cleaner look) */}
          <motion.h2
            className="text-2xl md:text-3xl font-extrabold tracking-tight drop-shadow-md flex items-center"
            variants={itemVariants}
          >
            <Phone className="w-6 h-6 mr-3 text-white" />
            Call Our Deals Hotline
          </motion.h2>

          {/* Separator or Subtitle Hint */}
          <motion.div variants={itemVariants} className="hidden md:block text-red-200 text-3xl font-light">|</motion.div>
          
          {/* Subtitle/Offer */}
          <motion.p
            className="text-base md:text-xl font-medium text-red-100" // Red-100 (light gray/red) for subtle contrast
            variants={itemVariants}
          >
            <Tag className="inline w-5 h-5 mr-2 -mt-1" />
            Exclusive pricing starts here.
          </motion.p>
        </motion.div>

        {/* Phone Number - The main attraction */}
        <motion.a
          href="tel:08063971335"
          className="block w-full mt-3 md:mt-4"
          initial="initial"
          animate="animate"
          variants={containerVariants}
        >
          <motion.p
            className="text-4xl md:text-6xl font-black text-white transition-all duration-300 tracking-wider
                       drop-shadow-lg cursor-pointer"
            variants={itemVariants}
            whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
            whileTap={{ scale: 0.98 }}
          >
            080-6397-1335
          </motion.p>
        </motion.a>
        
        {/* Hidden pulsing element using Gray for accent (less intense than the previous Red pulse) */}
        <motion.div
          className="absolute w-12 h-12 bg-gray-800 rounded-full blur-xl opacity-20 top-1/2 left-1/4"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />
        
      </div>
    </motion.div>
  );
};

// Main App component to make the file runnable
export default CallForDealsBanner;
