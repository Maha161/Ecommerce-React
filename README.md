# 🛒 Shop Cart — Full E-commerce React Application

## Overview

A production-ready e-commerce frontend built with React 18, Tailwind CSS, and modern web technologies. This application provides a complete shopping experience with user authentication, product browsing, cart management, and secure checkout.

---

## 🚀 Live Demo

- You can view the deployed project here:  
  [👉 Live Demo](https://ecommerce-react-app-eta-flax.vercel.app/)

## ✨ Features

- **User Authentication:** Sign up, log in, log out, and secure password reset functionality using tokens
- **Product Catalog:** View a list of products with images, prices, and categories fetched from a live API
- **Product Details Page:** View detailed information about each product, including description and images
- **Add to Cart:** Users can add items to their shopping cart and view cart totals
- **Add to Favorites:** Save favorite products for quick access later
- **Cart Quantity Control:** Increment or decrement product quantity directly from the cart
- **Remove from Cart/Favorites:** Easily delete items from cart or favorites list
- **Checkout Process:** Complete the purchase through a guided checkout process
- **Toast Notifications:** Real-time alerts for actions like adding to cart, success messages, and errors
- **Protected Routes:** Prevent unauthenticated users from accessing certain pages
- **Responsive Design:** Mobile-first layout that looks great on all screen sizes
- **Loading and Error Handling:** Graceful handling of loading states and API errors
- **Modern UI/UX:** Clean, intuitive interface using Bootstrap and custom components
- **Performance Optimized:** Fast loading pages using React 19 and Vite

---

## Technologies & Libraries

| Tool                            | Purpose                           |
| ------------------------------- | --------------------------------- |
| **React + Vite**                | Frontend framework and dev server |
| **Tailwind CSS**                | Utility-first CSS framework       |
| **React Router DOM**            | Routing and nested routes         |
| **Axios**                       | API requests                      |
| **Formik + Yup**                | Form handling and validation      |
| **Framer Motion**               | Animations                        |
| **Font Awesome**                | Icons                             |
| **Toaster (react-hot-toast)**   | Toast notifications               |
| **Helmet (react-helmet-async)** | Dynamic page titles & meta        |
| **jwt-decode**                  | Decode JWT tokens                 |
| **Swiper**                      | Carousels                         |
| **dotlottie-react**             | Lottie loading animations         |
| **DM Sans**                     | Modern typography                 |

---

## 🧩 Project Structure

```text
project-root/
├── public/            # Static files (favicon, robots.txt, etc.)
├── src/
│   ├── assets/        # Images, SVGs, animations
│   ├── components/    # Reusable components (Header, Footer, ProductCard)
│   ├── context/       # React contexts (auth, cart, wishlist)
│   ├── hooks/         # Custom hooks
│   ├── pages/         # Route components (Home, Cart, Login)
│   ├── services/      # API services (axios config)
│   ├── App.jsx        # Main app component
│   ├── App.css        # App styles
│   ├── index.css      # Global styles
│   └── main.jsx       # App entry point
├── .gitignore
├── eslint.config.js   # ESLint configuration
├── package.json
├── README.md
├── Website Screenshots/  # App screenshots
└── vite.config.js       # Vite configuration
```

---

## 🧠 State & Token Management

- **JWT Token** stored in localStorage
- Used for protected routes (Cart, Wishlist, Checkout, Orders)
- Global state managed using **React Context**

---

## 🔐 Route Access Control

### ✅ Public Routes (accessible without login)

- `/` → Home page
- /product → All products
- `/category` → All categories
- `/category/:id` → Subcategory page
- `/product/:id` → Product details
- `/login` → Login page
- `/register` → Register page
- `/reset-password` → Reset password

### 🔒 Protected Routes (require login)

- `/cart` → Shopping cart
- `/wishlist` → Favorite products
- `/checkout` → Checkout process
- `/allorders` → My orders

---

## 📦 Install & Run (Vite Setup)

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/shop-cart.git

# 2. Navigate into the folder
cd shop-cart

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev

# 5. Open your browser and go to:
http://localhost:5173


```

---

- **Live API Integration**: Connected to [Route E-Commerce API](https://documenter.getpostman.com/view/5709532/2s93JqTRWN#intro)

--

## 🤝 Contributing

- Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📞 Contact

📧 [mahaebrahiim4@gmail.com](mailto:mahaebrahiim4@gmail.com)

---

## 🙋‍♀️ Author

**👩‍💻 Maha Ebrahim**  
_Frontend Developer_

---

"# Ecommerce-React-App"
