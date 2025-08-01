import { motion } from "framer-motion";
import img1 from "../../assets/images/amazon-pay.png";
import img2 from "../../assets/images/American-Express-Color.png";
import img3 from "../../assets/images/paypal.png";
import img4 from "../../assets/images/mastercard.webp";
import img5 from "../../assets/images/get-apple-store.png";
import img6 from "../../assets/images/get-google-play.png";
import logoImg from "../../assets/images/image.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>    
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 pt-12 px:3 md:px-4 lg:px-0 pb-6 border-t border-gray-200">
      <div className="container mx-auto px-3">

        {/* Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 ">

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Link to="/" className="flex items-center gap-4">
              <img src={logoImg} alt="FreshCart logo" className="w-44" />
            </Link>
            <p className="text-gray-600">
              Your one-stop shop for fresh groceries and daily essentials delivered to your doorstep.
            </p>

            <div className="flex space-x-4">
              {['facebook-f', 'twitter', 'instagram', 'linkedin-in', 'youtube'].map((icon, idx) => (
                <a key={idx} href="#" className="text-gray-500 hover:text-pop-600 transition-colors">
                  <i className={`fa-brands fa-${icon} text-lg`}></i>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              {["About Us", "Contact", "Blog", "Stores", "Careers"].map((text, idx) => (
                <li key={idx}>
                  <a href="#" className="text-gray-600 hover:text-pop-600 transition-colors flex items-center">
                    <i className="fa-solid fa-chevron-right text-xs mr-2 text-pop-500"></i> {text}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-800">Customer Service</h3>
            <ul className="space-y-2">
              {[
                { icon: "circle-info", text: "Help Center" },
                { icon: "shield-halved", text: "Returns & Refunds" },
                { icon: "truck-fast", text: "Delivery Info" },
                { icon: "file-lines", text: "Terms & Conditions" },
                { icon: "lock", text: "Privacy Policy" },
              ].map(({ icon, text }, idx) => (
                <li className="flex items-start" key={idx}>
                  <i className={`fa-solid fa-${icon} text-pop-500 mt-1 mr-2 text-xs`}></i>
                  <a href="#" className="text-gray-600 hover:text-pop-600 transition-colors">{text}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-800">Contact Us</h3>
            <div className="space-y-3">

              <div className="flex items-start">
                <i className="fa-solid fa-envelope text-pop-500 mt-1 mr-3"></i>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Email</h4>
                  <a href="mailto:help@freshcart.com" className="text-sm text-gray-600 hover:text-pop-600 transition-colors">help@freshcart.com</a>
                </div>
              </div>

              <div className="flex items-start">
                <i className="fa-solid fa-phone text-pop-500 mt-1 mr-3"></i>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Phone</h4>
                  <a href="tel:+1234567890" className="text-sm text-gray-600 hover:text-pop-600 transition-colors">+1 (234) 567-890</a>
                </div>
              </div>

              <div className="flex items-start">
                <i className="fa-solid fa-location-dot text-pop-500 mt-1 mr-3"></i>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Address</h4>
                  <p className="text-sm text-gray-600">123 Grocery St, Freshville, FC 12345</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-10 bg-white p-6 rounded-xl shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Get the FreshCart App</h3>
          <p className="text-sm text-gray-600 mb-4">We'll send you a link, open it on your phone to download the app</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="email"
              placeholder="Email Address"
              className="col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pop-500"
            />
            <button className="col-span-1 w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 outline-none bg-gradient-to-r from-pop-500 to-pop-600 hover:from-pop-600 hover:to-pop-700 text-white rounded-full font-medium transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base">
              Share App Link
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center border-t border-gray-300 pt-6 gap-6"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-sm font-medium">Payment Partners</p>
            <div className="flex items-center space-x-4">
              {[img1, img2, img3, img4].map((img, idx) => (
                <img key={idx} src={img} alt="payment" className="h-6" />
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-sm font-medium">Get deliveries with FreshCart</p>
            <div className="flex items-center space-x-4">
              <img src={img5} alt="App Store" className="h-8" />
              <img src={img6} alt="Google Play" className="h-8" />
            </div>
          </div>
        </motion.div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} FreshCart. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </>
  );
}
