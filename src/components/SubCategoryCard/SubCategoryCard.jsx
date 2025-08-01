import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

export default function SubCategoryCard({ 
  categoryId, 
  categoryName, 
  subCategories, 
  loading 
}) {
  const navigate = useNavigate();

  const handleSubCategoryClick = (subCategoryId, subCategoryName) => {
    navigate('/products', { 
      state: { 
        filters: {
          category: categoryId,
          subcategory: subCategoryId
        },
        title: `${categoryName} - ${subCategoryName}`
      }
    });
  };

  return (
    <>
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-pop-700 mb-2">
          {categoryName} Subcategories
        </h2>
        <p className="text-primary-600">
          Explore our specialized collections in {categoryName.toLowerCase()}
        </p>
      </div>

      {loading ? (
        <Loading />
      ) : subCategories && subCategories.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-6">
          {subCategories.map((subCategory) => (
            <motion.div
              key={subCategory._id}
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all p-4 cursor-pointer"
              onClick={() => handleSubCategoryClick(subCategory._id, subCategory.name)}
            >
              <div className="aspect-square h-5 bg-gray-100 rounded-lg  flex items-center justify-center">
                <i className="fa-solid fa-tags text-pop-700"></i>
              </div>
              <h3 className="font-semibold text-gray-800 text-center">
                {subCategory.name}
              </h3>
          
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-white rounded-lg">
          <p className="text-gray-600">No subcategories available for this category.</p>
          <button 
            className="mt-4 px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
            onClick={() => navigate('/product', { 
              state: { 
                filters: { category: categoryId },
                title: `${categoryName} Products`
              }
            })}
          >
            View All {categoryName} Products
          </button>
        </div>
      )}
    </div>
    </>
  );
}