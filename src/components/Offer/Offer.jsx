import React from 'react'
import { motion } from "framer-motion";
export default function Offer() {
    

    return (
      <>
        <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-pop-700 text-white py-8"
        >
          <div className="mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold mb-2">Limited Time Offer!</h3>
            <p className="mb-4">Get 20% off your first order with code WELCOME20</p>
            <button 
              onClick={() => navigate('/product')}
              className="px-6 py-2 bg-white text-pop-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </button>
          </div>
        </motion.section>    
      </>
    )
}
