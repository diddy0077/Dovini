import React from 'react'
import { motion } from 'framer-motion'
import {
  Trophy, Award, Users, MessageCircle, Truck, Phone, ArrowRight,
  Camera, Heart, Star, MapPin, Calendar, Target, Eye, Shield,
  CheckCircle, Clock, Globe, Zap, Sparkles, Building, UserCheck,
  TrendingUp, Gift, Package, ShoppingCart, Headphones, Settings, Lightbulb, HandHeart
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const About = () => {
  const currentYear = new Date().getFullYear();
  const nav = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-20 sm:py-28">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white rounded-full"></div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-20 w-4 h-4 bg-white rounded-full"
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-3 h-3 bg-white rounded-full"
          animate={{ y: [0, 15, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Camera className="w-5 h-5" />
              <span className="font-semibold">About Dovini</span>
              <Heart className="w-5 h-5" />
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Capturing Moments,
              <br />
              <span className="text-red-200">Creating Memories</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl lg:text-2xl text-red-100 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Since 2018, we've been the trusted partner for photographers and videographers worldwide,
              providing premium equipment and unparalleled expertise to bring your creative vision to life.
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Award className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-medium">Award Winning</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Globe className="w-4 h-4 text-blue-300" />
                <span className="text-sm font-medium">Global Reach</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Users className="w-4 h-4 text-green-300" />
                <span className="text-sm font-medium">10K+ Customers</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-40 h-40 bg-red-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-32 h-32 bg-red-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Story Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold text-sm mb-6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
              >
                <Calendar className="w-4 h-4" />
                <span>Founded in 2018</span>
              </motion.div>

              <motion.h2
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
              >
                From Passion to
                <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent"> Purpose</span>
              </motion.h2>

              <motion.p
                className="text-lg text-gray-600 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
              >
                Dovini was born from a simple belief: every creator deserves access to world-class equipment
                without compromising on quality or service. What started as a small passion project has grown
                into Nigeria's most trusted photography equipment destination.
              </motion.p>

              <motion.p
                className="text-lg text-gray-600 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              >
                Today, we serve over 10,000 photographers, videographers, and creative professionals across
                Africa and beyond, providing not just products, but partnerships that help bring creative
                visions to life.
              </motion.p>

              <motion.div
                className="grid grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-1">{currentYear - 2018}+</div>
                  <div className="text-sm text-gray-600">Years of Excellence</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-1">500+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Story Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-red-100 to-red-200 rounded-3xl p-8 shadow-2xl">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div className="w-full h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center">
                          <Camera className="w-8 h-8 text-white" />
                        </div>
                        <div className="w-full h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                          <Settings className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="w-full h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                          <Lightbulb className="w-6 h-6 text-white" />
                        </div>
                        <div className="w-full h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                          <Heart className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 p-3 rounded-full shadow-lg"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Star className="w-6 h-6" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="w-6 h-6" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-red-50/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block mb-6"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-2xl shadow-xl">
                <Target className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Our <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">Core Values</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Eye,
                title: "Our Vision",
                description: "To be the leading photography equipment provider in Africa, empowering every creator with access to world-class tools and expertise.",
                color: "from-blue-500 to-cyan-500",
                bgColor: "from-blue-50 to-cyan-50"
              },
              {
                icon: Target,
                title: "Our Mission",
                description: "To provide exceptional photography equipment and unparalleled customer service that inspires creativity and professional excellence.",
                color: "from-red-500 to-rose-500",
                bgColor: "from-red-50 to-rose-50"
              },
              {
                icon: HandHeart,
                title: "Our Values",
                description: "Integrity, innovation, customer-centricity, and a passion for helping creators achieve their artistic vision through quality products and service.",
                color: "from-green-500 to-emerald-500",
                bgColor: "from-green-50 to-emerald-50"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className={`bg-gradient-to-br ${item.bgColor} p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100`}>
                  <motion.div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg mb-6`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <item.icon className="w-8 h-8" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 border border-white rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              By The Numbers
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '10,000+', label: 'Happy Customers', icon: Users },
              { number: '500+', label: 'Premium Products', icon: Package },
              { number: '50+', label: 'Brand Partnerships', icon: Building },
              { number: '24/7', label: 'Customer Support', icon: Headphones }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="inline-flex p-4 rounded-2xl bg-white/10 backdrop-blur-sm mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>
                <div className="text-3xl sm:text-4xl font-black mb-2">{stat.number}</div>
                <div className="text-red-200 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-white via-red-50/30 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
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
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-800 mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Why Choose <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">Dovini</span>?
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Quality Guarantee',
                description: 'Every product is rigorously tested and backed by our comprehensive warranty.',
                features: ['Rigorous Testing', 'Brand Authenticity', 'Extended Warranty']
              },
              {
                icon: Truck,
                title: 'Fast & Secure Delivery',
                description: 'Lightning-fast shipping with real-time tracking and professional packaging.',
                features: ['Express Shipping', 'Real-time Tracking', 'Secure Packaging']
              },
              {
                icon: MessageCircle,
                title: 'Expert Support',
                description: '24/7 customer support from certified photography professionals.',
                features: ['Certified Experts', 'Technical Support', 'Usage Guidance']
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                  <motion.div
                    className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <feature.icon className="w-8 h-8" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="space-y-2">
                    {feature.features.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Ready to Start Your Creative Journey?
            </motion.h2>

            <motion.p
              className="text-lg sm:text-xl text-red-100 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Join thousands of creators who trust Dovini for their photography equipment needs.
              Start exploring our premium collection today.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={() => nav('/')}
                className="bg-white text-red-600 px-8 py-4 rounded-2xl font-bold hover:bg-red-50 transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Shop Now</span>
              </motion.button>

              <motion.button
                onClick={() => nav('/')}
                className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-red-600 transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-5 h-5" />
                <span>Contact Us</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About