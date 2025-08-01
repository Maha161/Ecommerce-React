// Category.jsx 
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import Loading from '../../components/Loading/Loading';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Category() {
  const [categories, setCategories] = useState(null);
  const navigate = useNavigate();

  async function getCategories() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setCategories(data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  const handleCategoryClick = (categoryId, categoryName) => {
  
    navigate('/subcategory', { 
      state: { 
        categoryId,
        categoryName 
      } 
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
    <Helmet>
      <title>Categories | Shop Cart</title>
      <meta name="description" content="Explore our product categories to find exactly what you need." />
    </Helmet>
    <div className="min-h-screen  bg-gray-50">
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <section className="text-center mt-7 mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-pop-700 mb-4"
          >
            Shop by Category
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-primary-600 max-w-2xl mx-auto text-lg"
          >
            Browse our product categories below. Click on any category to explore its subcategories and products.
          </motion.p>
        </section>

        {/* Categories Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {categories ? (
            categories.map((category) => (
              <CategoryCard
                key={category._id}
                categoryInfo={category}
                onCategoryClick={handleCategoryClick}
              />
            ))
          ) : (
            <div className="flex justify-center items-center w-full col-span-full min-h-[300px]">
               <Loading />
            </div>
          )}
        </motion.div>
      </main>
    </div>
    </>
  );
}