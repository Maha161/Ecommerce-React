import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import logoImage from "../../assets/images/image.png";
import styles from "./Navbar.module.css";
import { UserContext } from "../../context/User.context";
import { CartContext } from "../../context/Cart.context";
import { WishlistContext } from "../../context/Wishlist.context";

export default function Navbar() {
  const { token, logOut } = useContext(UserContext);
  const { cartInfo, getCartProduct } = useContext(CartContext);
  const { wishlistInfo, getWishlistProducts } = useContext(WishlistContext);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    if (token) {
      getCartProduct();
      getWishlistProducts();
    }
  }, [token]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const closeAll = () => {
    setIsMobileNavOpen(false);
    setIsDropdownOpen(false);
  };

  const NavItem = ({ to, children, onClick }) => (
    <li className="group">
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
          `relative pb-1 transition-colors ${
            isActive ? "text-primary-600 font-semibold" : "hover:text-primary-600"
          }`
        }
      >
        {({ isActive }) => (
          <>
            {children}
            <span
              className={`absolute bottom-0 left-1/2 h-0.5 bg-primary-600 transition-all duration-300 transform -translate-x-1/2 ${
                isActive ? "w-full" : "w-0 group-hover:w-full"
              }`}
            ></span>
          </>
        )}
      </NavLink>
    </li>
  );

  const publicNavLinks = [
    { to: "/", text: "Home" },
    { to: "/product", text: "Products" },
    { to: "/category", text: "Categories" },
    { to: "/brands", text: "Brands" },
  ];

  const privateNavLinks = [
    { to: "/allorders", text: "Orders" }
  ];

  return (
    <>
      <nav className="bg-gray-200 mb-36 border-b border-gray-200 py-4 fixed top-0 left-0 right-0 z-50 shadow-md">
        <div className="container mx-auto flex items-center justify-between px-3 md:px-4 lg:px-0">
          <div className="flex items-center gap-6">
            <Link to="/">
              <img src={logoImage} alt="FreshCart logo" className="w-40 lg:w-44" />
            </Link>
          </div>

          <ul className="hidden lg:flex gap-8 items-center font-medium text-gray-700">
            {publicNavLinks.map((link) => (
              <NavItem key={link.to} to={link.to}>
                {link.text}
              </NavItem>
            ))}
            {token && privateNavLinks.map((link) => (
              <NavItem key={link.to} to={link.to}>
                {link.text}
              </NavItem>
            ))}
          </ul>

          <div className="flex items-center gap-6 text-gray-600">
            {token && (
              <NavLink to="/cart" className="hover:text-primary-900 relative transition-colors">
                <i className="fas fa-shopping-cart text-xl mt-2"></i>
                <span className="absolute -top-0 -right-2 bg-pop-700 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartInfo === null ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    cartInfo.numOfCartItems
                  )}
                </span>
              </NavLink>
            )}

            {token && (
              <NavLink to="/wishlist" className="hover:text-primary-600 relative transition-colors">
                <i className="far fa-solid fa-heart text-xl mt-2"></i>
                <span className="absolute top-0 -right-2 bg-pop-700 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistInfo === null ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    wishlistInfo.count
                  )}
                </span>
              </NavLink>
            )}

            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="hover:text-primary-600 flex items-end gap-1 transition-colors"
              >
                <i className="far fa-user text-xl"></i>
                {token && <span className="text-sm hidden md:inline outline-none">Account</span>}
                <i
                  className={`fas fa-chevron-down text-xs ml-1 transition-transform ${
                    isDropdownOpen ? "transform rotate-180" : ""
                  }`}
                ></i>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  {token ? (
                    <button
                      onClick={() => {
                        logOut();
                        closeAll();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i> Logout
                    </button>
                  ) : (
                    <>
                      <NavLink
                        to="/login"
                        onClick={closeAll}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <i className="fas fa-sign-in-alt mr-2"></i> Login
                      </NavLink>
                      <NavLink
                        to="/signup"
                        onClick={closeAll}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <i className="fas fa-user-plus mr-2"></i> Sign Up
                      </NavLink>
                    </>
                  )}
                </div>
              )}
            </div>
            <button 
              className={`lg:hidden ${styles.mobileMenuButton}`}
              onClick={toggleMobileNav}
            >
            <i className={`fas ${isMobileNavOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
          </div>

       
        </div>

        <div className={`${styles.mobileNav} ${isMobileNavOpen ? styles.mobileNavOpen : ''}`}>
          <ul className={styles.mobileNavList}>
            {[...publicNavLinks, ...(token ? privateNavLinks : [])].map((link) => (
              <li key={link.to}>
                <NavLink 
                  to={link.to} 
                  className={({ isActive }) => 
                    `block py-2 px-4 ${isActive ? 'text-primary-600 font-semibold' : 'text-gray-700'}`
                  }
                  onClick={closeAll}
                >
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
