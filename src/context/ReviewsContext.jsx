import React, { createContext, useContext, useState, useEffect } from 'react';

const ReviewsContext = createContext();

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
};

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    // Load reviews from localStorage
    const storedReviews = localStorage.getItem('dovini_reviews');
    if (storedReviews) {
      try {
        setReviews(JSON.parse(storedReviews));
      } catch (error) {
        console.error('Error parsing stored reviews:', error);
      }
    }
  }, []);

  const saveReviews = (newReviews) => {
    setReviews(newReviews);
    localStorage.setItem('dovini_reviews', JSON.stringify(newReviews));
  };

  const addReview = (productId, review) => {
    const newReviews = { ...reviews };
    if (!newReviews[productId]) {
      newReviews[productId] = [];
    }
    newReviews[productId].push({
      ...review,
      id: Date.now(),
      date: new Date().toISOString(),
    });
    saveReviews(newReviews);
    return newReviews[productId];
  };

  const getProductReviews = (productId) => {
    return reviews[productId] || [];
  };

  const getProductRating = (productId) => {
    const productReviews = getProductReviews(productId);
    if (productReviews.length === 0) return 0;

    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / productReviews.length;
  };

  const getReviewStats = (productId) => {
    const productReviews = getProductReviews(productId);
    const totalReviews = productReviews.length;
    const averageRating = getProductRating(productId);

    // Calculate rating distribution
    const distribution = [5, 4, 3, 2, 1].map(rating => ({
      rating,
      count: productReviews.filter(review => review.rating === rating).length,
      percentage: totalReviews > 0 ? (productReviews.filter(review => review.rating === rating).length / totalReviews) * 100 : 0
    }));

    return {
      totalReviews,
      averageRating,
      distribution
    };
  };

  const value = {
    reviews,
    addReview,
    getProductReviews,
    getProductRating,
    getReviewStats,
  };

  return (
    <ReviewsContext.Provider value={value}>
      {children}
    </ReviewsContext.Provider>
  );
};