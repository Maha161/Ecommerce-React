// Wishlist.jsx
import { useContext, useEffect } from "react";
import { WishlistContext } from "../../context/Wishlist.context"; 
import WishlistItem from "../../components/WishlistIItem/WishlistItem";
import { Link } from "react-router-dom"; 
import { motion } from "framer-motion";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet-async";

export default function WishList() {
  const { getWishlistProducts, wishlistInfo } = useContext(WishlistContext);

  useEffect(() => {
    getWishlistProducts(); 
  }, [getWishlistProducts]);

  return (
    <>
    <Helmet>
      <title>Wishlist | Shop Cart</title>
      <meta name="description" content="Your saved favorite items in one place." />
    </Helmet>

    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto mt-7 px-4 sm:px-6 lg:px-8">
        {wishlistInfo === null ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-12 w-12 rounded-full border-4 border-pop-500 border-t-transparent"
              />
            </div>
            <motion 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-medium text-gray-700 mt-4"
            >
              <Loading/>
            
            </motion>
          </div>
        ) : (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-8">
              {/* Main Content */}
              <div className="flex-1">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-pop-50 to-pop-100 px-6 py-5 border-b border-pop-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <i className="fa-solid fa-heart text-2xl text-pop-600"></i>
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-gray-800">Your Wishlist</h1>
                        <p className="text-sm text-gray-600">
                          {wishlistInfo.count === 0 ? '0 items' : `${wishlistInfo.count} cherished items`}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {wishlistInfo.count === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                          <i className="fa-solid fa-heart text-4xl text-gray-400"></i>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                          Your wishlist is empty
                        </h2>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                          Discover amazing products and add them to your wishlist to save them for later.
                        </p>
                        <Link
                          to="/product"
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pop-500 to-pop-600 hover:from-pop-600 hover:to-pop-700 text-white font-medium rounded-lg shadow-md transition-all transform hover:-translate-y-0.5"
                        >
                          <i className="fa-solid fa-magnifying-glass mr-2"></i>
                          Explore Products
                        </Link>
                      </div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ staggerChildren: 0.05 }}
                        className="divide-y divide-gray-100"
                      >
                        {wishlistInfo.data?.map((product) => (
                          <WishlistItem key={product._id} productInfo={product} />
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar - Only shows when there are items */}
              {wishlistInfo.count > 0 && (
                <div className="md:w-80">
                  <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <i className="fa-solid fa-sparkles text-pop-500 mr-2"></i>
                      Wishlist Tips
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex items-start">
                        <i className="fa-solid fa-circle-check text-pop-500 mt-1 mr-2 text-xs"></i>
                        <span>Items stay saved until you remove them</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fa-solid fa-circle-check text-pop-500 mt-1 mr-2 text-xs"></i>
                        <span>Get notified when prices drop</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fa-solid fa-circle-check text-pop-500 mt-1 mr-2 text-xs"></i>
                        <span>Easily move items to cart when ready</span>
                      </li>
                    </ul>

                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <Link
                        to="/products"
                        className="block w-full text-center px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors"
                      >
                        <i className="fa-solid fa-plus mr-2"></i>
                        Add More Items
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.section>
        )}
      </div>
    </div>
    </>
  );
}