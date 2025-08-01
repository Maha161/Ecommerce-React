import { useContext } from "react";
import { WishlistContext } from "../../context/Wishlist.context";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function WishlistItem({ productInfo }) {
  const { removeProductFromWishlist } = useContext(WishlistContext);
  const { addProductToCart } = useContext(CartContext);
  const { title, imageCover, category, _id, price } = productInfo;

  return (
    <>
    <motion.div
      className="flex flex-col sm:flex-row items-stretch bg-white rounded-lg overflow-hidden border-b border-gray-100 last:border-0"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Left: Image + Info */}
      <div className="flex flex-col sm:flex-row flex-grow items-center p-4 gap-4">
        <Link to={`/product/${_id}`} className="shrink-0">
          <img
            src={imageCover}
            alt={title}
            className="w-24 h-24 rounded-lg object-cover border border-gray-200"
          />
        </Link>

        <div className="flex-grow text-center sm:text-left">
          <Link to={`/product/${_id}`}>
            <h3 className="font-medium text-gray-800 hover:text-pop-600 transition-colors line-clamp-1">
              {title}
            </h3>
          </Link>
          <p className="text-sm text-gray-500">{category.name}</p>
          <p className="text-lg text-pop-700 font-bold mt-1">{price} L.E</p>
        </div>
      </div>

      {/* Right: Buttons */}
      <div className="flex sm:flex-col justify-center items-center gap-2 px-4 py-2 border-t sm:border-t-0 sm:border-l border-gray-100">
        <button
          onClick={() => addProductToCart({ productId: _id })}
          className="text-gray-600 hover:text-pop-600 transition-colors p-2"
          title="Add to cart"
        >
          <i className="fa-solid fa-cart-plus"></i>
        </button>
        <button
          onClick={() => removeProductFromWishlist({ productId: _id })}
          className="text-gray-600 hover:text-red-600 transition-colors p-2"
          title="Remove"
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </motion.div>
    </>
  );
}
