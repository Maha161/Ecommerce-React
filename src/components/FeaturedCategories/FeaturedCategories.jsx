import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from 'axios';
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import Loading from '../Loading/Loading';

// Animation config for the section
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

// Animation config for each item
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export default function FeaturedCategories() {
  const [categories, setCategories] = useState(null); // State to hold fetched categories
  const navigate = useNavigate(); 

  // Fetch first 4 categories from API
  async function getCategories() {
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
      setCategories(data.data.slice(0, 4)); // Only show the first 4 categories
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

 // Run once when component mounts phase 
  useEffect(() => {
    getCategories();
  }, []);

  // Navigate to subcategory page when category is clicked
  const handleCategoryClick = (categoryId, categoryName) => {
    navigate('/subcategory', {
      state: {
        categoryId,
        categoryName
      }
    });
  };

  return (
    <>
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="my-16  container"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-pop-700 mb-2">
          Shop by Category
        </h2>
        <p className="text-primary-600 max-w-2xl mx-auto">
          Find what you're looking for in our specialized collections
        </p>
      </div>

      {categories ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-3 md:px-4 lg:px-0">
            {categories.map((category) => (
              <CategoryCard
                key={category._id}
                categoryInfo={category}
                onCategoryClick={handleCategoryClick}
              />
            ))}
          </div>

          {/* Button to view all categories */}
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/category')}
              className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 outline-none bg-gradient-to-r from-pop-500 to-pop-600 hover:from-pop-600 hover:to-pop-700 text-white rounded-full font-medium transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base mx-auto"
            >
              <span>View All Categories</span>
              <i className="fa-solid fa-arrow-right text-sm text-white"></i>
            </button>
          </div>
        </>
      ) : (
        // Show loading while categories are being fetched
        <Loading />
      )}
    </motion.section>
    </>
  );
}
