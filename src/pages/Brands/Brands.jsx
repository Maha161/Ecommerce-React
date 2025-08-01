// Brands.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import BrandsCard from '../../components/BrandsCard/BrandsCard';
import Loading from '../../components/Loading/Loading';
import BrandDetails from '../../components/BrandDetails/BrandDetails';
import { Helmet } from 'react-helmet-async';

export default function Brands() {
  const [brands, setBrands] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState(null);

  async function getBrands() {
    try {
      setLoading(true);
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      setBrands(data.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
  };

  const closeModal = () => {
    setSelectedBrand(null);
  };

  return (
    <>
    <Helmet>
      <title>Brands | Shop Cart</title>
      <meta name="description" content="Shop by your favorite brands at Shop Cart." />
    </Helmet>
    <div className="min-h-screen bg-gray-50">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4  py-12"
      >
        {/* Page Header */}
        <div className="text-center my-7">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-3xl md:text-4xl font-bold text-pop-700 mb-3"
          >
            Our Brands
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-primary-600 max-w-2xl mx-auto text-lg"
          >
            Discover products from trusted brands
          </motion.p>
        </div>

        {/* Brands Grid */}
        {loading ? (
          <Loading />
        ) : brands && brands.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
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
            {brands.map((brand) => (
              <motion.div
                key={brand._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <BrandsCard
                  brandInfo={brand}
                  onClick={() => handleBrandClick(brand)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-600 mb-4">No brands available at the moment.</p>
            <button
              onClick={getBrands}
              className="px-6 py-2 bg-pop-600 text-white rounded-lg hover:bg-pop-700 transition-colors"
            >
              Refresh Brands
            </button>
          </div>
        )}

        {/* Brand Details Modal */}
        {selectedBrand && (
          <BrandDetails
            brand={selectedBrand}
            closeModal={closeModal}
          />
        )}
      </motion.section>
    </div>
    </>
  );
}