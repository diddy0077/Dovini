import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { useReviews } from '../context/ReviewsContext';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { products } from '../data/products';
import { categories } from '../data/categories';
import ReviewsSection from '../components/ReviewsSection';
import ProductCard from '../components/ProductCard';
import {
  Shield,
  Award,
  Star,
  Heart,
  Share2,
  Truck,
  RefreshCw,
  ShieldCheck,
  Clock,
  MapPin,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Eye,
  MessageCircle,
  CheckCircle,
  AlertTriangle,
  ShoppingBag,
  Users,
  ThumbsUp,
  Zap,
  Camera,
  Battery,
  Wifi,
  Settings
} from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const productId = parseInt(id);
  const product = products.find(p => p.id === productId);
  const { addToCart } = useCart();
  const { addToRecentlyViewed } = useRecentlyViewed();
  const { getProductRating, getProductReviews } = useReviews();
  const { startConversation } = useChat();
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const rating = getProductRating(productId);
  const reviewCount = getProductReviews(productId).length;

  // Mock data for enhanced features
  const relatedProducts = products.filter(p => p.categoryId === product?.categoryId && p.id !== productId).slice(0, 4);
  const recentlyViewed = products.slice(0, 6); // Mock recently viewed
  const customerQuestions = [
    { id: 1, question: "Is this camera compatible with my existing lenses?", answer: "Yes, this camera uses the standard lens mount compatible with most professional lenses.", author: "Dovini Support", date: "2024-01-15" },
    { id: 2, question: "What's the warranty period?", answer: "This product comes with a 2-year manufacturer warranty covering defects and malfunctions.", author: "Dovini Support", date: "2024-01-14" }
  ];

  // Track product view when component mounts
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product, addToRecentlyViewed]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Product not found</h1>
          <Link to="/" className="btn-primary">Go Home</Link>
        </div>
      </div>
    );
  }

  const category = categories.find(cat => cat.id === product.categoryId);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    showSuccess(`${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to cart!`);
  };

  const handleContactSeller = () => {
    if (!user) {
      showError('Please sign in to contact the seller');
      return;
    }

    const sellerId = 999;
    const sellerName = 'Dovini Seller';

    const conversationId = startConversation(sellerId, sellerName, productId);
    if (conversationId) {
      showSuccess('Chat opened! You can now message the seller.');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this amazing ${product.name} on Dovini!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showSuccess('Product link copied to clipboard!');
    }
  };

  const tabs = [
    { id: 'description', label: 'Description', icon: Eye },
    { id: 'specifications', label: 'Specifications', icon: Settings },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'questions', label: 'Q&A', icon: MessageCircle }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <motion.nav
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-red-600 transition-colors">Home</Link></li>
            <li>/</li>
            {category && (
              <>
                <li><Link to={`/category/${category.id}`} className="hover:text-red-600 transition-colors">{category.name}</Link></li>
                <li>/</li>
              </>
            )}
            <li className="text-gray-800 font-medium">{product.name}</li>
          </ol>
        </motion.nav>

        {/* Main Product Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Gallery */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                <motion.img
                  key={selectedImage}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Product Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    -15% OFF
                  </div>
                  <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    In Stock
                  </div>
                </div>

                {/* Wishlist & Share */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <motion.button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-3 rounded-full shadow-lg ${isWishlisted ? 'bg-red-600 text-white' : 'bg-white text-gray-600'}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </motion.button>
                  <motion.button
                    onClick={handleShare}
                    className="p-3 rounded-full shadow-lg bg-white text-gray-600"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="p-4 bg-gray-50">
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === index
                          ? 'border-red-500 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Product Information */}
            <motion.div
              className="p-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Title & Badges */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                    {product.name}
                  </h1>
                  <div className="flex items-center space-x-2 ml-4">
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <Shield className="w-4 h-4" />
                      <span>Verified</span>
                    </div>
                    <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <Award className="w-4 h-4" />
                      <span>Top Rated</span>
                    </div>
                  </div>
                </div>

                {/* Rating & Reviews */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-gray-600 ml-2 font-medium">{rating.toFixed(1)}</span>
                  </div>
                  <span className="text-gray-500">•</span>
                  <Link to="#reviews" className="text-blue-600 hover:text-blue-800 font-medium">
                    {reviewCount} reviews
                  </Link>
                  <span className="text-gray-500">•</span>
                  <span className="text-green-600 font-medium">In Stock</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline space-x-3">
                  <span className="text-4xl font-bold text-red-600">
                    ₦{product.price.toLocaleString()}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ₦{(product.price * 1.2).toLocaleString()}
                  </span>
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-medium">
                    Save 17%
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Price includes VAT</p>
              </div>

              {/* Key Features */}
              <div className="bg-blue-50 p-4 rounded-xl mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <Camera className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-700">4K Video</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Battery className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-700">Long Battery</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wifi className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-700">WiFi Enabled</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-700">2 Year Warranty</span>
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-3 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="p-3 hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">Only 5 left in stock</span>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-green-50 p-4 rounded-xl mb-6">
                <div className="flex items-center space-x-3 mb-2">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">Free Delivery</span>
                </div>
                <p className="text-sm text-gray-700">Get it by tomorrow when you order within 2 hours</p>
                <div className="flex items-center space-x-2 mt-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Deliver to Lagos, Nigeria</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <motion.button
                  onClick={handleAddToCart}
                  className="w-full bg-red-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingBag className="w-6 h-6" />
                  <span>Add to Cart - ₦{(product.price * quantity).toLocaleString()}</span>
                </motion.button>

                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    onClick={handleContactSeller}
                    className="bg-white border-2 border-red-600 text-red-600 py-3 px-4 rounded-lg font-semibold hover:bg-red-50 transition-colors flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Ask Seller</span>
                  </motion.button>

                  <motion.button
                    onClick={() => showSuccess('Buy Now feature coming soon!')}
                    className="bg-gray-900 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Zap className="w-5 h-5" />
                    <span>Buy Now</span>
                  </motion.button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="border-t pt-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <ShieldCheck className="w-8 h-8 text-green-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Secure Payment</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <RefreshCw className="w-8 h-8 text-blue-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Easy Returns</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Users className="w-8 h-8 text-purple-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Expert Support</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tabbed Content Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'border-b-2 border-red-600 text-red-600 bg-red-50'
                        : 'text-gray-600 hover:text-red-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {activeTab === 'description' && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="prose prose-lg max-w-none">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {product.description}
                    </p>

                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">What's in the Box</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>{product.name}</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Battery and Charger</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>USB Cable</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Quick Start Guide</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>2-Year Warranty Card</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'specifications' && (
                <motion.div
                  key="specifications"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="border-b border-gray-200 pb-3">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-900">Sensor Type</span>
                          <span className="text-gray-600">Full-Frame CMOS</span>
                        </div>
                      </div>
                      <div className="border-b border-gray-200 pb-3">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-900">Resolution</span>
                          <span className="text-gray-600">24.2 MP</span>
                        </div>
                      </div>
                      <div className="border-b border-gray-200 pb-3">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-900">ISO Range</span>
                          <span className="text-gray-600">100-51200</span>
                        </div>
                      </div>
                      <div className="border-b border-gray-200 pb-3">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-900">Video Resolution</span>
                          <span className="text-gray-600">4K UHD</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="border-b border-gray-200 pb-3">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-900">Weight</span>
                          <span className="text-gray-600">650g</span>
                        </div>
                      </div>
                      <div className="border-b border-gray-200 pb-3">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-900">Dimensions</span>
                          <span className="text-gray-600">142 x 93 x 46mm</span>
                        </div>
                      </div>
                      <div className="border-b border-gray-200 pb-3">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-900">Battery Life</span>
                          <span className="text-gray-600">400 shots</span>
                        </div>
                      </div>
                      <div className="border-b border-gray-200 pb-3">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-900">Connectivity</span>
                          <span className="text-gray-600">WiFi, Bluetooth</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ReviewsSection productId={productId} />
                </motion.div>
              )}

              {activeTab === 'questions' && (
                <motion.div
                  key="questions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-gray-900">Customer Questions & Answers</h3>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
                        Ask a Question
                      </button>
                    </div>

                    {customerQuestions.map((qa) => (
                      <div key={qa.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">{qa.question}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>Asked on {new Date(qa.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="font-medium text-gray-900">{qa.author}</span>
                          </div>
                          <p className="text-gray-700">{qa.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Related Products */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct, index) => (
              <motion.div
                key={relatedProduct.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <ProductCard product={relatedProduct} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recently Viewed */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recently Viewed</h2>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {recentlyViewed.map((viewedProduct) => (
                <Link
                  key={viewedProduct.id}
                  to={`/product/${viewedProduct.id}`}
                  className="flex-shrink-0 w-48 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <img
                    src={viewedProduct.image}
                    alt={viewedProduct.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2">
                    {viewedProduct.name}
                  </h3>
                  <p className="text-red-600 font-semibold">₦{viewedProduct.price.toLocaleString()}</p>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Shipping & Returns */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Truck className="w-8 h-8 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-900">Shipping Information</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Standard Delivery</span>
                <span className="font-medium">₦2,500</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Express Delivery</span>
                <span className="font-medium">₦5,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Free Delivery</span>
                <span className="font-medium text-green-600">Orders over ₦50,000</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <RefreshCw className="w-8 h-8 text-green-600" />
              <h3 className="text-xl font-bold text-gray-900">Returns & Warranty</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">30-Day Returns</p>
                  <p className="text-sm text-gray-600">Return any item within 30 days for a full refund</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">2-Year Warranty</p>
                  <p className="text-sm text-gray-600">Manufacturer warranty covers defects and malfunctions</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Expert Support</p>
                  <p className="text-sm text-gray-600">24/7 customer support for all your questions</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;
