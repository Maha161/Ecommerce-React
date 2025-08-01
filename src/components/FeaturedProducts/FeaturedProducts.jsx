import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../../components/ProudctCard/ProductCard";
import axios from "axios";
import Loading from "../Loading/Loading";

// Animation settings for the section container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Animate children one by one
    },
  },
};

// Animation settings for each product card
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export default function FeaturedProducts() {
  const [products, setProducts] = useState(null);
  const [randomProducts, setRandomProducts] = useState([]);
  const navigate = useNavigate(); 

  // Fetch products from API
  async function getProducts() {
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");

      setProducts(data.data);

      // Shuffle and select 8 random products
      const shuffled = [...data.data].sort(() => 0.5 - Math.random());
      setRandomProducts(shuffled.slice(0, 8));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  // Run once when component mounts phase 
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="my-16  container px-3 lg:px-0 md:px-4 "
      id="featuredProducts"
    >
      {/* Section header */}
      <motion.div variants={itemVariants} className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-pop-700 mb-2">
          Featured Products
        </h2>
        <p className="text-primary-600 max-w-2xl mx-auto">
          Discover our carefully selected collection of premium products
        </p>
      </motion.div>

      {/* Show random products if available */}
      {randomProducts.length > 0 ? (
        <>
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
          >
            {randomProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -5 }} 
                className="transition-transform duration-300"
              >
                <ProductCard productInfo={product} />
              </motion.div>
            ))}
          </motion.div>

          {/* Button to navigate to all products */}
          <motion.div variants={itemVariants} className="text-center">
            <button
              onClick={() => navigate("/products")}
              className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 outline-none bg-gradient-to-r from-pop-500 to-pop-600 hover:from-pop-600 hover:to-pop-700 text-white rounded-full font-medium transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mx-auto text-sm sm:text-base"
            >
              <span>View All Products</span>
              <i className="fa-solid fa-arrow-right text-sm text-white"></i>
            </button>
          </motion.div>
        </>
      ) : (
        // Show loading while data is being fetched
        <Loading />
      )}
    </motion.section>
    </>
  );
}
