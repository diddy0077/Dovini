import React, { createContext, useContext, useState, useEffect } from 'react';

const RecentlyViewedContext = createContext();

const RECENTLY_VIEWED_KEY = 'dovini_recently_viewed';
const MAX_RECENTLY_VIEWED = 10;

export const RecentlyViewedProvider = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Load recently viewed from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setRecentlyViewed(parsed);
      }
    } catch (error) {
      console.error('Error loading recently viewed products:', error);
    }
  }, []);

  // Save to localStorage whenever recentlyViewed changes
  useEffect(() => {
    try {
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recentlyViewed));
    } catch (error) {
      console.error('Error saving recently viewed products:', error);
    }
  }, [recentlyViewed]);

  const addToRecentlyViewed = (product) => {
    if (!product || !product.id) return;

    setRecentlyViewed(prev => {
      // Remove the product if it already exists
      const filtered = prev.filter(item => item.id !== product.id);

      // Add the product to the beginning of the array
      const updated = [product, ...filtered];

      // Keep only the most recent MAX_RECENTLY_VIEWED items
      return updated.slice(0, MAX_RECENTLY_VIEWED);
    });
  };

  const removeFromRecentlyViewed = (productId) => {
    setRecentlyViewed(prev => prev.filter(item => item.id !== productId));
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  const isRecentlyViewed = (productId) => {
    return recentlyViewed.some(item => item.id === productId);
  };

  const getRecentlyViewedProducts = (limit = MAX_RECENTLY_VIEWED) => {
    return recentlyViewed.slice(0, limit);
  };

  const value = {
    recentlyViewed,
    addToRecentlyViewed,
    removeFromRecentlyViewed,
    clearRecentlyViewed,
    isRecentlyViewed,
    getRecentlyViewedProducts,
  };

  return (
    <RecentlyViewedContext.Provider value={value}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
};