import { motion } from "framer-motion";
import about from "../../assets/images/about.jpg";

export default function AboutUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const stats = [
    { value: "10K+", label: "Happy Customers" },
    { value: "5+", label: "Years Experience" },
    { value: "100%", label: "Satisfaction Guarantee" },
  ];

    const teamMembers = [
    { name: "Sara Mohamed", role: "Founder & CEO" },
    { name: "Mohamed Ali", role: "Product Manager" },
    { name: "Lina Ahmed", role: "Customer Support" }
  ];

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-0 xl:px-0">
      <div className="mx-auto max-w-6xl" id="about">
        <motion.div
          className="flex flex-col lg:flex-row container items-center gap-8 lg:gap-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            className="w-full lg:w-1/2"
            variants={itemVariants}
          >
            <img
              src={about}
              alt="About our store"
              className="w-full h-auto rounded-xl object-cover max-h-[500px]"
            />
          </motion.div>

          <motion.div 
            className="w-full lg:w-1/2"
            variants={containerVariants}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4"
              variants={itemVariants}
            >
              About Our Store
            </motion.h2>

            <motion.p
              className="text-gray-600 mb-4 leading-relaxed text-base sm:text-lg"
              variants={itemVariants}
            >
              Welcome to our store! We are dedicated to offering you the best
              products with a focus on quality, uniqueness, and customer
              service.
            </motion.p>

            <motion.p
              className="text-gray-600 mb-6 leading-relaxed text-base"
              variants={itemVariants}
            >
              Our team works hard to bring you an exceptional online shopping
              experience with a carefully curated selection of items you'll
              love.
            </motion.p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
              variants={itemVariants}
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-gray-50 rounded-lg"
                >
                  <h3 className="text-2xl font-bold text-pop-700">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              ))}
            </motion.div>

           <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-2 bg-pop-100 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                      <i className="fa-solid fa-user text-pop-700 text-lg" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-medium text-gray-800">
                        {member.name}
                      </p>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}