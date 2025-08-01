import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User.context";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

export default function Orders() {
  const { token } = useContext(UserContext);
  const [orders, setOrders] = useState(null);
  const { id } = jwtDecode(token);

  async function getUserOrder() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
        method: "GET",
        headers: { token },
      };
      const { data } = await axios.request(options);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => { getUserOrder(); }, []);

  return (
    <>
    <Helmet>
        <title>My Orders | Shop Cart</title>
        <meta name="description" content="Track your orders and view order history." />
    </Helmet>
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4 mt-7 sm:px-6 lg:px-8">
        {orders ? (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <i className="fa-solid fa-box-open text-2xl text-pop-600"></i>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Your Order History</h1>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <i className="fa-solid fa-boxes-packing text-4xl text-gray-400"></i>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">No Orders Yet</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Your order history will appear here once you make purchases.
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pop-500 to-pop-600 hover:from-pop-600 hover:to-pop-700 text-white font-medium rounded-lg shadow-md transition-all transform hover:-translate-y-0.5"
                >
                  <i className="fa-solid fa-bag-shopping mr-2"></i>
                  Start Shopping
                </Link>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
                className="space-y-6"
              >
                {orders.map((order) => (
                  <motion.div 
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-pop-50 to-pop-100 px-6 py-4 border-b border-pop-200">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div>
                          <h2 className="text-sm text-gray-600">ORDER #</h2>
                          <span className="font-bold text-gray-800">{order.id}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {order.isPaid ? 'Paid' : 'Unpaid'}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order.isDelivered ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {order.isDelivered ? 'Delivered' : 'Shipping'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {order.cartItems.map((product) => (
                          <motion.div 
                            key={product._id}
                            whileHover={{ y: -5 }}
                            className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                          >
                            <Link to={`/product/${product.product.id}`}>
                              <img 
                                src={product.product.imageCover} 
                                alt={product.product.title}
                                className="w-full h-40 object-cover"
                              />
                              <div className="p-3">
                                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                                  {product.product.title}
                                </h3>
                                <div className="flex justify-between items-center mt-2">
                                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                    Qty: {product.count}
                                  </span>
                                  <span className="font-medium text-pop-700">
                                    {product.price} L.E
                                  </span>
                                </div>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Order Date</p>
                          <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Total Order</p>
                          <p className="text-xl font-bold text-pop-700">
                            {order.totalOrderPrice} L.E
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.section>
        ) : (
          <div className="flex justify-center items-center h-64">
            <Loading />
          </div>
        )}
      </div>
    </div>
    </>
  );
}
