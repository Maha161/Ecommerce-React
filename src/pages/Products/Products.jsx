import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Loading from '../../components/Loading/Loading';
import axios from 'axios';
import ProductCard from '../../components/ProudctCard/ProductCard';
import { Helmet } from 'react-helmet-async';
export default function Products() {
  const [products, setProducts] = useState(null);

  async function getProducts() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      setProducts(data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
    <Helmet>
      <title>Products | Shop Cart</title>
      <meta name="description" content="Browse our wide range of products with great deals." />
    </Helmet>

    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4  py-12">
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 mt-7"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-pop-700 mb-4">
            Our Product Collection
          </h1>
          <p className="text-primary-600 max-w-2xl mx-auto text-lg">
            Discover our wide range of high-quality products. 
            Each item is carefully selected to bring you the best shopping experience.
          </p>
        </motion.section>

        {/* Products Grid */}
        {products ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <ProductCard productInfo={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <Loading />
        )}

        {/* Empty State */}
        {products && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No products found.</p>
            <button 
              onClick={getProducts}
              className="px-6 py-2 bg-pop-600 text-white rounded-lg hover:bg-pop-700 transition-colors"
            >
              Refresh Products
            </button>
          </div>
        )}
      </main>
    </div>
    </>
  );
}