import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Fashion Blogger',
    content: 'The quality of products here is exceptional! I especially love their sustainable clothing line that combines style with eco-consciousness.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Tech Enthusiast',
    content: 'Fast shipping and excellent customer service. My new laptop arrived perfectly packaged and works like a dream.',
    rating: 4,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Home Decor Lover',
    content: 'Beautiful home goods at reasonable prices. The ceramic collection is my favorite - each piece feels unique and special.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
  }
];

export default function Testimonials () {
  return (
    <>
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-3 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pop-700 mb-3">
            What Our Customers Say
          </h2>
          <p className="text-primary-600 max-w-2xl mx-auto">
            Trusted by thousands of happy shoppers worldwide
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-primary-600">{testimonial.role}</p>
                  </div>
                </div>
                <FaQuoteLeft className="text-pop-100 text-2xl" />
              </div>

              <p className="text-gray-600 mb-4">{testimonial.content}</p>
              
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i}
                    className={`text-sm ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};
