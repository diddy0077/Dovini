import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';
import { AuthProvider } from './context/AuthContext';
import { ReviewsProvider } from './context/ReviewsContext';
import { ChatProvider } from './context/ChatContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSkeleton from './components/LoadingSkeleton';
import Chat from './components/Chat';


// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Category = lazy(() => import('./pages/Category'));
// const Products = lazy(() => import('./pages/Products'));
import ProductDetails from './pages/ProductDetails';
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const SellerDashboard = lazy(() => import('./pages/SellerDashboard'));
const Orders = lazy(() => import('./pages/Orders'));

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSkeleton type="page" />
  </div>
);

const App = () => {
  return (
    <AuthProvider>
      <ChatProvider>
        <ReviewsProvider>
          <ToastProvider>
            <RecentlyViewedProvider>
              <WishlistProvider>
                <CartProvider>
                  <div className="min-h-screen flex flex-col">
                    <Header />
                    <main className="flex-grow">
                      <Suspense fallback={<PageLoader />}>
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/category/:id" element={<Category />} />
                          {/* <Route path="/products" element={<Products />} /> */}
                          <Route path="/product/:id" element={<ProductDetails />} />
                          <Route path="/wishlist" element={<Wishlist />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/checkout" element={<Checkout />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/signup" element={<Signup />} />
                          <Route path="/seller/dashboard" element={<SellerDashboard />} />
                          <Route path="/orders" element={<Orders />} />
                        </Routes>
                      </Suspense>
                    </main>
                    <Footer />
                    <Chat />
                  </div>
                </CartProvider>
              </WishlistProvider>
            </RecentlyViewedProvider>
          </ToastProvider>
        </ReviewsProvider>
      </ChatProvider>
    </AuthProvider>
  );
};

export default App;