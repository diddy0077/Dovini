import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import {
  Camera,
  Lightbulb,
  Mic,
  ChevronLeft,
  ChevronRight,
  Zap,
  Sparkles,
  Star,
  Play,
  ArrowRight,
  Award,
  Users,
  TrendingUp
} from 'lucide-react';

const BANNERS_DATA = [
  {
    id: 1,
    title: 'Professional Camera Equipment',
    subtitle: 'Capture Every Moment in Stunning 8K Detail',
    description: 'From DSLR to mirrorless, find your perfect camera companion',
    imageUrl: 'https://st5.depositphotos.com/12982378/68292/i/450/depositphotos_682920948-stock-photo-selective-focus-digital-camera-eyeglasses.jpg',
    icon: Camera,
    buttonText: 'Explore Cameras',
    stats: { users: '50K+', rating: '4.9', growth: '+25%' },
    gradient: 'from-red-600 via-pink-600 to-purple-700',
    accentColor: 'red',
  },
  {
    id: 2,
    title: 'Precision Lighting Solutions',
    subtitle: 'Illuminate Your Vision, Unleash Your Creativity',
    description: 'Professional lighting equipment for studio and location shoots',
    imageUrl: 'https://static1.squarespace.com/static/55ad450ce4b00f4c52d6401e/55ed7b2de4b055e3b16b1912/55ed7b2fe4b055e3b16b19a2/1361759318000/Studio.jpg?format=original',
    icon: Lightbulb,
    buttonText: 'Discover Lighting',
    stats: { users: '35K+', rating: '4.8', growth: '+18%' },
    gradient: 'from-amber-500 via-orange-500 to-red-600',
    accentColor: 'amber',
  },
  {
    id: 3,
    title: 'Studio-Quality Audio Gear',
    subtitle: 'Crystal Clear Sound, Professional Recording',
    description: 'Premium microphones and audio equipment for content creators',
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    icon: Mic,
    buttonText: 'Browse Audio',
    stats: { users: '28K+', rating: '4.7', growth: '+32%' },
    gradient: 'from-blue-600 via-cyan-500 to-teal-600',
    accentColor: 'blue',
  },
];

const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  useEffect(() => {
    const interval = 20000; // 10 seconds
    const progressInterval = 1000; // Update progress every 100ms for smoother animation
    const totalSteps = interval / progressInterval;

    let step = 0;
    const timer = setInterval(() => {
      if (!isHovered) {
        step++;
        setProgress((step / totalSteps) * 100);

        if (step >= totalSteps) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % BANNERS_DATA.length);
          step = 0;
          setProgress(0);
        }
      } else {
        // Reset progress when hovered
        setProgress(0);
        step = 0;
      }
    }, progressInterval);

    return () => clearInterval(timer);
  }, [isHovered]);

  const goToPrev = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + BANNERS_DATA.length) % BANNERS_DATA.length);
  const goToNext = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % BANNERS_DATA.length);

  const currentBanner = BANNERS_DATA[currentIndex];

  // const handleMouseMove = (e) => {
  //   const rect = e.currentTarget.getBoundingClientRect();
  //   mouseX.set(e.clientX - rect.left - rect.width / 2);
  //   mouseY.set(e.clientY - rect.top - rect.height / 2);
  // };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-purple-900/20 pointer-events-none" />

      <motion.div
        className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-3xl shadow-2xl mx-4 md:mx-8 my-12"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateX: 15 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${currentBanner.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* Advanced Overlay System */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />

            {/* Dynamic Color Overlay */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${currentBanner.gradient} opacity-20`}
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Animated Particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Floating Geometric Shapes */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`shape-${i}`}
                className={`absolute border-2 border-white/20 ${
                  i % 4 === 0 ? 'w-16 h-16 rounded-full' :
                  i % 4 === 1 ? 'w-12 h-12 rotate-45' :
                  i % 4 === 2 ? 'w-20 h-8 rounded-lg' :
                  'w-10 h-10 rounded-lg'
                }`}
                style={{
                  top: `${15 + (i * 8)}%`,
                  left: `${10 + (i * 10)}%`,
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.1, 0.4, 0.1],
                }}
                transition={{
                  duration: 8 + i,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}

            {/* Shimmer Effects */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />

            {/* Content Container */}
            <div className="relative z-10 h-full flex items-center justify-center px-6 md:px-12">
              <motion.div
                className="text-center text-white max-w-6xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {/* Icon with Glow Effect */}
                <motion.div
                  className="relative mb-8 inline-block"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className={`p-6 rounded-2xl bg-gradient-to-br ${currentBanner.gradient} shadow-2xl`}
                    animate={{
                      boxShadow: [
                        `0 0 20px rgba(239, 68, 68, 0.3)`,
                        `0 0 40px rgba(239, 68, 68, 0.6)`,
                        `0 0 20px rgba(239, 68, 68, 0.3)`
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {React.createElement(currentBanner.icon, {
                      className: "w-16 h-16 md:w-20 md:h-20 text-white drop-shadow-lg"
                    })}
                  </motion.div>

                  {/* Pulsing Ring */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl border-2 border-white/30`}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>

                {/* Main Title with Advanced Effects */}
                <motion.h1
                  className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                      {currentBanner.title.split(' ').map((word, wordIndex) => (
                        <motion.span
                          key={wordIndex}
                          className="inline-block mr-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 + wordIndex * 0.1 }}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </span>

                    {/* Text Glow Effect */}
                    <motion.span
                      className={`absolute inset-0 bg-gradient-to-r ${currentBanner.gradient} opacity-20 blur-xl`}
                      animate={{ opacity: [0.1, 0.3, 0.1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  className="text-xl md:text-2xl lg:text-3xl font-light mb-4 text-gray-200 max-w-4xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  {currentBanner.subtitle}
                </motion.p>

                {/* Description */}
                <motion.p
                  className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                >
                  {currentBanner.description}
                </motion.p>

                {/* Stats Row */}
                <motion.div
                  className="flex justify-center items-center space-x-8 mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 0.8 }}
                >
                  {[
                    { icon: Users, label: currentBanner.stats.users, desc: 'Happy Customers' },
                    { icon: Star, label: currentBanner.stats.rating, desc: 'Average Rating' },
                    { icon: TrendingUp, label: currentBanner.stats.growth, desc: 'Growth' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="text-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center justify-center mb-2">
                        <stat.icon className="w-5 h-5 text-yellow-400 mr-2" />
                        <span className="text-2xl font-bold text-white">{stat.label}</span>
                      </div>
                      <p className="text-sm text-gray-300">{stat.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.8 }}
                >
                  <motion.button
                    className={`group px-8 py-4 bg-gradient-to-r ${currentBanner.gradient} text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span
                      className="relative z-10 flex items-center"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      {currentBanner.buttonText}
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </motion.span>

                    {/* Button Shine Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </motion.button>

                  <motion.button
                    className="px-8 py-4 border-2 border-white/50 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Watch Demo
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Enhanced Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
          {BANNERS_DATA.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative overflow-hidden rounded-full transition-all duration-500 ${
                index === currentIndex ? 'w-12 h-4' : 'w-4 h-4'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className={`w-full h-full rounded-full ${
                  index === currentIndex
                    ? `bg-gradient-to-r ${currentBanner.gradient}`
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                layoutId="activeDot"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />

              {index === currentIndex && (
                <motion.div
                  className="absolute inset-0 bg-white/30 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Enhanced Navigation Arrows */}
        <motion.button
          onClick={goToPrev}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all duration-300 z-20 shadow-2xl border border-white/20"
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-8 h-8" />
        </motion.button>

        <motion.button
          onClick={goToNext}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all duration-300 z-20 shadow-2xl border border-white/20"
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-8 h-8" />
        </motion.button>

        {/* Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-black/30 z-20"
          style={{ originX: 0 }}
        >
          <motion.div
            className={`h-full bg-gradient-to-r ${currentBanner.gradient}`}
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: 0.1, ease: "linear" }}
            style={{ originX: 0 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BannerSlider;

