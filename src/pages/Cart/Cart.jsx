// Cart.jsx
import { useContext, useEffect } from "react";
import { CartContext } from "../../context/Cart.context";
import CartItem from "../../components/CartItem/CartItem";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet-async";

export default function Cart() {
  const { getCartProduct, cartInfo, clearCart } = useContext(CartContext);

  useEffect(() => {
    getCartProduct();
  }, []);

  return (
    <>
    <Helmet>
      <title>My Cart | Shop Cart</title>
      <meta name="description" content="Review and manage items in your shopping cart." />
    </Helmet>

    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {cartInfo === null ? (
          <div className="text-center">
            <Loading/>
          </div>
        ) : (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-8 mt-7">
              {/* Main Content */}
              <div className="flex-1">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-pop-50 to-pop-100 px-6 py-5 border-b border-pop-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <i className="fa-solid fa-cart-shopping text-2xl text-pop-600"></i>
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-gray-800">Your Shopping Cart</h1>
                        <p className="text-sm text-gray-600">
                          {cartInfo.numOfCartItems === 0 ? '0 items' : `${cartInfo.numOfCartItems} ${cartInfo.numOfCartItems === 1 ? 'item' : 'items'}`}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {cartInfo.numOfCartItems === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                          <i className="fa-solid fa-cart-plus text-4xl text-gray-400"></i>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                          Your cart is empty
                        </h2>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                          Discover amazing products and add them to your cart to get started.
                        </p>
                        <Link
                          to="/product"
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pop-500 to-pop-600 hover:from-pop-600 hover:to-pop-700 text-white font-medium rounded-lg shadow-md transition-all transform hover:-translate-y-0.5"
                        >
                          <i className="fa-solid fa-magnifying-glass mr-2"></i>
                          Browse Products
                        </Link>
                      </div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ staggerChildren: 0.05 }}
                        className="divide-y divide-gray-100"
                      >
                        {cartInfo.data?.products.map((product) => (
                          <CartItem key={product._id} productInfo={product} />
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              {cartInfo.numOfCartItems > 0 && (
                <div className="md:w-80">
                  <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <i className="fa-solid fa-receipt text-pop-500 mr-2"></i>
                      Order Summary
                    </h3>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">{cartInfo.data?.totalCartPrice} L.E</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium text-green-600">Free</span>
                      </div>
                      <div className="border-t border-gray-200 pt-3 flex justify-between">
                        <span className="text-gray-800 font-semibold">Total</span>
                        <span className="text-xl font-bold text-pop-700">
                          {cartInfo.data?.totalCartPrice} L.E
                        </span>
                      </div>
                    </div>

                    <Link 
                      to="/checkout" 
                      className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 outline-none bg-gradient-to-r from-pop-500 to-pop-600 hover:from-pop-600 hover:to-pop-700 text-white rounded-full font-medium transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base mb-4"
                    >
                      <i className="fa-solid fa-credit-card mr-2"></i>
                      Proceed to Checkout
                    </Link>

                    <button
                      onClick={clearCart}
                      className="w-full px-4 py-3 border border-red-700 text-red-700  hover:bg-red-50 transition-colors flex items-center justify-center rounded-full gap-2"
                    >
                      <i className="fa-solid fa-trash"></i>
                      Clear Cart
                    </button>

                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                        <i className="fa-solid fa-tag text-pop-500 mr-2"></i>
                        Promo Code
                      </h4>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Enter code" 
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pop-500 focus:border-transparent"
                        />
                        <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                          Apply
                        </button>
                      </div>
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