// SubCategory.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import SubCategoryCard from '../../components/SubCategoryCard/SubCategoryCard';
import Loading from '../../components/Loading/Loading';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

export default function SubCategory() {
  const location = useLocation();
  const { categoryId, categoryName } = location.state || {};
  const [subCategories, setSubCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!categoryId) {
      navigate('/categories'); // Redirect if no category selected
      return;
    }

    const getSubCategories = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
        );
        setSubCategories(data.data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        setSubCategories([]);
      } finally {
        setLoading(false);
      }
    };

    getSubCategories();
  }, [categoryId, navigate]);

  return (
    <>
    <Helmet>
      <title>Subcategories | Shop Cart</title>
      <meta name="description" content="Explore our product subcategories tailored to your needs." />
    </Helmet>
      <main className="container mx-auto px-4 py-12">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm p-6 my-12"
        >
          {loading ? (
            <Loading />
          ) : (
            <SubCategoryCard 
              categoryId={categoryId}
              categoryName={categoryName}
              subCategories={subCategories}
            />
          )}
        </motion.section>

        <div className="text-center">
          <button
            onClick={() => navigate('/category')}
            className="px-6 py-2 border bg-pop-700 text-white rounded-lg hover:bg-pop-600 transition-colors"
          >
            <i className="fa-solid fa-arrow-left text-xs ps-2 text-white"></i>  Back to All Categories 
          </button>
        </div>
      </main>
    </>
  );
}