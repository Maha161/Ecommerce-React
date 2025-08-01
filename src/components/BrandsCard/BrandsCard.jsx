// BrandsCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function BrandsCard({ brandInfo, onClick }) {
  const { image, name, slug } = brandInfo;

  return (
    <>
    <motion.div
      className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={onClick}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className=" relative aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
        <img
          className="w-full h-full object-contain p-4 transition-transform duration-500 hover:scale-105"
          src={image}
          alt={name}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
      </div>
      <div className="p-4 text-center">
        <h2 className="font-semibold text-gray-800 text-lg">{name}</h2>
      </div>
    </motion.div>
    </>
  );
}