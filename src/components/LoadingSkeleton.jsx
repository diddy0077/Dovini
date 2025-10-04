import React from 'react';
import { motion } from 'framer-motion';

export const ProductCardSkeleton = () => (
  <div className="card">
    <div className="rounded-t-2xl h-56 bg-gray-200 skeleton"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-200 rounded skeleton mb-2"></div>
      <div className="h-4 bg-gray-200 rounded skeleton w-3/4 mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-200 rounded skeleton w-20"></div>
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-gray-200 rounded skeleton"></div>
          ))}
        </div>
      </div>
    </div>
    <div className="px-6 pb-6">
      <div className="h-12 bg-gray-200 rounded-xl skeleton"></div>
    </div>
  </div>
);

export const CategoryCardSkeleton = () => (
  <div className="card">
    <div className="rounded-t-2xl h-40 bg-gray-200 skeleton"></div>
    <div className="p-6 text-center">
      <div className="h-6 bg-gray-200 rounded skeleton mb-2 mx-auto w-24"></div>
      <div className="h-4 bg-gray-200 rounded skeleton mx-auto w-32"></div>
    </div>
  </div>
);

export const BannerSkeleton = () => (
  <div className="relative h-80 md:h-96 overflow-hidden rounded-2xl mx-4 mt-6 shadow-2xl">
    <div className="absolute inset-0 bg-gray-200 skeleton rounded-2xl"></div>
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="w-4 h-4 bg-white bg-opacity-50 rounded-full"></div>
      ))}
    </div>
  </div>
);

export const ProductGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {[...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
      >
        <ProductCardSkeleton />
      </motion.div>
    ))}
  </div>
);

export const CategoryGridSkeleton = ({ count = 4 }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
    {[...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
      >
        <CategoryCardSkeleton />
      </motion.div>
    ))}
  </div>
);