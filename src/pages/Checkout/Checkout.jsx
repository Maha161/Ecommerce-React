import { useFormik } from "formik";
import { useContext, useState } from "react";
import { CartContext } from "../../context/Cart.context";
import { UserContext } from "../../context/User.context";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

export default function Checkout() {
  const { cartInfo } = useContext(CartContext);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function createCashOrder(values) {
    const toastId = toast.loading("We are creating your order...");
    setIsSubmitting(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
        { ...values, paymentMethodType: "cash" },
        { headers: { token } }
      );
      if (data.status === "success") {
        toast.dismiss(toastId);
        toast.success("Your order has been created");
        setTimeout(() => navigate("/allorders"), 2000);
      }
    } catch (err) {
      toast.dismiss(toastId);
      toast.error("Failed to create order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleOnlinePayment(values) {
    setIsSubmitting(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
        { ...values, paymentMethodType: "card" },
        { headers: { token } }
      );
      if (data.status === "success") {
        toast.success("Redirecting you to Stripe...");
        setTimeout(() => window.location.assign(data.session.url), 2000);
      }
    } catch (err) {
      toast.error("Failed to redirect. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      shippingAddress: { details: "", phone: "", city: "" },
    },
    onSubmit: (values) => {
      if (paymentMethod === "cash") createCashOrder(values);
      else handleOnlinePayment(values);
    },
  });

  return (
    <>
      <Helmet>
        <title>Checkout | Shop Cart</title>
        <meta name="description" content="Review your items and complete your purchase securely." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mt-7 mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-pop-50 to-pop-100 px-6 py-5 border-b border-pop-200">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <i className="fa-solid fa-truck-fast text-2xl text-pop-600"></i>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
                  <p className="text-sm text-gray-600">Complete your purchase</p>
                </div>
              </div>
            </div>

            <form onSubmit={formik.handleSubmit} className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <i className="fa-solid fa-map-location-dot text-pop-500 mr-2"></i>
                  Shipping Information
                </h2>

                <div className="space-y-4">
                  <input
                    type="text"
                    id="city"
                    placeholder="Enter your city"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pop-500"
                    value={formik.values.shippingAddress.city}
                    onChange={(e) => formik.setFieldValue("shippingAddress.city", e.target.value)}
                    required
                  />

                  <input
                    type="tel"
                    id="phone"
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pop-500"
                    value={formik.values.shippingAddress.phone}
                    onChange={(e) => formik.setFieldValue("shippingAddress.phone", e.target.value)}
                    required
                  />

                  <textarea
                    id="details"
                    rows="3"
                    placeholder="Enter your full address details"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pop-500"
                    value={formik.values.shippingAddress.details}
                    onChange={(e) => formik.setFieldValue("shippingAddress.details", e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <i className="fa-solid fa-credit-card text-pop-500 mr-2"></i>
                  Payment Method
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cash")}
                    className={`p-4 border-2 rounded-xl flex flex-col items-center ${
                      paymentMethod === "cash"
                        ? "border-pop-500 bg-pop-50"
                        : "border-gray-200 hover:border-pop-300"
                    }`}
                  >
                    <i className="fa-solid fa-money-bill-wave text-2xl mb-2 text-gray-700"></i>
                    <span>Cash on Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("Online")}
                    className={`p-4 border-2 rounded-xl flex flex-col items-center ${
                      paymentMethod === "Online"
                        ? "border-pop-500 bg-pop-50"
                        : "border-gray-200 hover:border-pop-300"
                    }`}
                  >
                    <i className="fa-brands fa-cc-stripe text-2xl mb-2 text-gray-700"></i>
                    <span>Online Payment</span>
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={!paymentMethod || isSubmitting}
                  className={`w-full px-6 py-4 rounded-xl font-bold text-white transition-all ${
                    !paymentMethod
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-pop-500 to-pop-600 hover:from-pop-600 hover:to-pop-700"
                  } ${isSubmitting ? "opacity-75" : ""}`}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin mr-2"></i> Processing...
                    </>
                  ) : (
                    <>
                      Complete Order <i className="fa-solid fa-arrow-right ml-2"></i>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
}
