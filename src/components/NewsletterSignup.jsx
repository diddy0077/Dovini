import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      showSuccess('Successfully subscribed to our newsletter!');
      setEmail('');
    }, 1500);
  };

  if (isSubscribed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200"
      >
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Welcome to our community!</h3>
        <p className="text-gray-600">You'll receive exclusive deals and updates soon.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-red-50 via-red-100 to-red-50 rounded-2xl p-8 border border-red-200"
    >
      <div className="text-center mb-6">
        <motion.div
          className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Mail className="w-8 h-8 text-white" />
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Stay Updated</h3>
        <p className="text-gray-600">Get exclusive deals, new product launches, and photography tips delivered to your inbox.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-lg hover:shadow-xl transition-all duration-300"
            required
          />
        </div>

        <motion.button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full flex items-center justify-center space-x-2 py-4"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <>
              <motion.div
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span>Subscribing...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Subscribe Now</span>
            </>
          )}
        </motion.button>
      </form>

      <p className="text-xs text-gray-500 text-center mt-4">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </motion.div>
  );
};

export default NewsletterSignup;