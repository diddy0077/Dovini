import React from 'react';
import { motion } from 'framer-motion';
import BannerSlider from '../components/BannerSlider';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import NewsletterSignup from '../components/NewsletterSignup';
import Testimonials from '../components/Testimonials';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { Phone, Trophy, Truck, MessageCircle, ArrowRight } from 'lucide-react';
import CallForDealsBanner from '../components/CallForDeals';

const PhoneIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.08 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

const Home = () => {
  const featuredProducts = products.slice(0, 8); // Show first 8 products

  

  return (
    <div className="min-h-screen">
      {/* Banner Slider */}
      <BannerSlider />

      {/* Call for Deals Section */}
    <CallForDealsBanner/>


      {/* Featured Categories */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-red-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Featured Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our wide range of professional camera equipment and accessories
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-white via-red-50/30 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-red-500 rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block mb-6"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-2xl shadow-xl">
                <Trophy className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            <motion.h2
              className="text-5xl md:text-6xl font-black text-gray-800 mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Why Choose <span className="gradient-bg bg-clip-text text-transparent">Dovini</span>?
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              We're not just another camera store. We're your creative partner, providing
              premium equipment, expert guidance, and unparalleled support for your artistic journey.
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Trophy,
                title: 'Premium Quality Guaranteed',
                description: 'Every product undergoes rigorous testing to ensure it meets our exacting standards for professional use.',
                stats: '99.8%',
                statLabel: 'Quality Rating',
                gradient: 'from-yellow-400 to-orange-500',
                bgGradient: 'from-yellow-50 to-orange-50',
                features: ['Rigorous Testing', 'Brand Authenticity', 'Warranty Coverage']
              },
              {
                icon: Truck,
                title: 'Lightning Fast Delivery',
                description: 'Same-day shipping on in-stock items with real-time tracking and secure packaging for your gear.',
                stats: '24hrs',
                statLabel: 'Average Delivery',
                gradient: 'from-blue-500 to-cyan-500',
                bgGradient: 'from-blue-50 to-cyan-50',
                features: ['Express Shipping', 'Real-time Tracking', 'Secure Packaging']
              },
              {
                icon: MessageCircle,
                title: 'Expert Support Team',
                description: 'Our certified technicians and photography experts are here to help you choose and use your equipment.',
                stats: '24/7',
                statLabel: 'Support Available',
                gradient: 'from-green-500 to-emerald-500',
                bgGradient: 'from-green-50 to-emerald-50',
                features: ['Certified Experts', 'Technical Support', 'Usage Guidance']
              },
              {
                icon: Phone,
                title: 'Direct Manufacturer Access',
                description: 'We work directly with manufacturers to offer exclusive deals and early access to new products.',
                stats: '50+',
                statLabel: 'Brand Partnerships',
                gradient: 'from-purple-500 to-pink-500',
                bgGradient: 'from-purple-50 to-pink-50',
                features: ['Exclusive Deals', 'Early Access', 'Direct Support']
              },
              {
                icon: ArrowRight,
                title: 'Flexible Financing',
                description: 'Easy payment plans and financing options to make professional equipment accessible to all creators.',
                stats: '0%',
                statLabel: 'Interest Options',
                gradient: 'from-red-500 to-rose-500',
                bgGradient: 'from-red-50 to-rose-50',
                features: ['Payment Plans', 'Easy Financing', 'Budget Options']
              },
              {
                icon: Trophy,
                title: 'Award-Winning Service',
                description: 'Recognized industry-wide for our exceptional customer service and product expertise.',
                stats: '15+',
                statLabel: 'Industry Awards',
                gradient: 'from-indigo-500 to-purple-500',
                bgGradient: 'from-indigo-50 to-purple-50',
                features: ['Industry Recognition', 'Customer Awards', 'Expert Endorsements']
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ delay: index * 0.15, duration: 0.8, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, rotateY: 5 }}
                style={{ perspective: "1000px" }}
              >
                <div className={`relative p-8 rounded-3xl bg-gradient-to-br ${feature.bgGradient} border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-full blur-xl`}></div>
                  </div>

                  {/* Icon */}
                  <motion.div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg mb-6`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <feature.icon className="w-8 h-8" />
                  </motion.div>

                  {/* Stats Badge */}
                  <motion.div
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-md"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.5, type: "spring", stiffness: 300 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-lg font-bold text-gray-800">{feature.stats}</div>
                    <div className="text-xs text-gray-600">{feature.statLabel}</div>
                  </motion.div>

                  {/* Content */}
                  <motion.h3
                    className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-red-600 transition-colors duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    {feature.title}
                  </motion.h3>

                  <motion.p
                    className="text-gray-600 mb-6 leading-relaxed"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 + 0.4 }}
                    viewport={{ once: true }}
                  >
                    {feature.description}
                  </motion.p>

                  {/* Feature List */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.15 + 0.5 }}
                    viewport={{ once: true }}
                  >
                    {feature.features.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        className="flex items-center text-sm text-gray-700"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 + 0.6 + itemIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient} mr-3`}></div>
                        {item}
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Hover Effect Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                  />

                  {/* Decorative Elements */}
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-red-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="absolute -top-1 -left-1 w-3 h-3 bg-red-400 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block p-8 rounded-3xl bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white shadow-2xl"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-bold mb-2">Ready to Elevate Your Craft?</h3>
              <p className="text-red-100 mb-6">Join thousands of creators who trust Dovini for their equipment needs.</p>
              <motion.button
                className="bg-white text-red-600 px-8 py-3 rounded-full font-bold hover:bg-red-50 transition-colors flex items-center space-x-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Start Shopping Today</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-red-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our handpicked selection of professional photography equipment
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="btn-primary px-8 py-3 text-lg flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View All Products</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Newsletter Signup Section */}
      <section className="py-16 bg-gradient-to-r from-red-50 to-red-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;