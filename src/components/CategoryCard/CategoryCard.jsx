// CategoryCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function CategoryCard({ categoryInfo, onCategoryClick }) {
  const { image, name, _id } = categoryInfo;

  return (
    <>
    <motion.div
      className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={() => onCategoryClick(_id, name)}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
          src={image} 
          alt={name} 
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      <div className="p-4 text-center">
        <h3 className="font-semibold text-gray-800 text-lg">{name}</h3>
        <p className="mt-2 text-sm text-pop-700 font-medium">
          View Subcategories →
        </p>
      </div>
    </motion.div>
    </>
  );
}