import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0); // Tracks the currently selected step

  // Steps for the "How It Works" section
  const steps = [
    {
      title: "Browse Products",
      icon: "fa-magnifying-glass",
      description: "Explore our wide selection of premium products"
    },
    {
      title: "Create Account",
      icon: "fa-user-plus",
      description: "Sign up to save favorites and track orders"
    },
    {
      title: "Add to Cart",
      icon: "fa-cart-plus",
      description: "Select items and add them to your shopping cart"
    },
    {
      title: "Secure Checkout",
      icon: "fa-lock",
      description: "Complete your purchase with our safe payment system"
    },
    {
      title: "Enjoy!",
      icon: "fa-box-open",
      description: "Receive your order and enjoy your products"
    }
  ];

  // Animation variants for framer-motion
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
    <section className="py-5 bg-gradient-to-b to-white px-3 md:px-4 lg:px-0" id='howItWorks' >
      <div className="container mx-auto">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 conatiner"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pop-700 mb-3">
            How It Works
          </h2>
          <p className="text-primary-600 max-w-2xl mx-auto">
            Simple steps to shop with us. Login required to save favorites and checkout.
          </p>
        </motion.div>

        {/* Step Buttons + Step Content */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
          
          {/* Step Buttons List */}
          <div className="md:w-1/3  space-y-4 md:sticky md:top-24 z-10">
            {steps.map((step, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveStep(index)}
                className={`w-full text-left px-6 py-3 rounded-xl transition-all ${
                  activeStep === index
                    ? 'bg-pop-700 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activeStep === index ? 'bg-white/20' : 'bg-gray-100'
                  }`}>
                    <i className={`fa-solid ${step.icon} ${activeStep === index ? 'text-white' : 'text-pop-700'}`}></i>
                  </div>
                  <span className="font-medium">{step.title}</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Step Content Display */}
          <motion.div
            key={activeStep}
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ duration: 0.5 }}
            className="md:w-1/2 bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-8">
              
              {/* Step Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="w-12 h-12 rounded-full bg-pop-700 flex items-center justify-center mb-4">
                    <i className={`fa-solid ${steps[activeStep].icon} text-white text-xl`}></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {steps[activeStep].title}
                  </h3>
                </div>
                <span className="text-gray-400 font-medium">
                  Step {activeStep + 1}/{steps.length}
                </span>
              </div>

              {/* Step Description */}
              <p className="text-gray-600 mb-8">
                {steps[activeStep].description}
              </p>

              {/* Special Content for "Create Account" Step */}
              {activeStep === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gray-50 rounded-lg p-6 mb-6"
                >
                  <h4 className="font-bold text-pop-700 mb-3">Account Required</h4>
                  <p className="text-gray-700 mb-4">
                    You need an account to save favorites and checkout
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to="/login"
                      className="px-4 py-2 bg-pop-700 text-white rounded-lg hover:bg-pop-700 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="px-4 py-2 border border-pop-700 text-pop-700 rounded-lg hover:bg-pop-600 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                </motion.div>
              )}

              {activeStep === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="border border-primary-100 rounded-lg p-6 mb-6"
                >
                  <h4 className="font-bold text-primary-700 mb-3">Secure Payment Options</h4>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <i className="fa-brands fa-cc-visa text-3xl text-blue-800"></i>
                    <i className="fa-brands fa-cc-mastercard text-3xl text-red-800"></i>
                    <i className="fa-brands fa-cc-paypal text-3xl text-blue-500"></i>
                  </div>
                  <p className="text-sm text-gray-500">All transactions are encrypted and secure</p>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setActiveStep(prev => Math.max(prev - 1, 0))}
                  disabled={activeStep === 0}
                  className={`px-4 py-2 rounded-lg ${
                    activeStep === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => setActiveStep(prev => Math.min(prev + 1, steps.length - 1))}
                  disabled={activeStep === steps.length - 1}
                  className={`px-4 py-2 rounded-lg ${
                    activeStep === steps.length - 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-pop-700 text-white hover:bg-pop-700'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    </>
  );
}
