import { useContext } from "react";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CartItem({ productInfo }) {
  const { removeProductFromCart, updateProductCount } = useContext(CartContext);
  const { count, price, product } = productInfo;
  const { title, imageCover, category, id } = product;

  return (
    <>
    <motion.div
      className="bg-white rounded-lg overflow-hidden border-b border-gray-100 last:border-0"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row px-3 py-4 items-center gap-4">
        <Link to={`/product/${id}`} className="shrink-0">
          <img
            src={imageCover}
            alt={title}
            className="w-24 h-24 rounded-lg object-cover border border-gray-200"
          />
        </Link>

        <div className="flex flex-col flex-grow justify-between text-center lg:text-start">
          <div>
            <Link to={`/product/${id}`}>
              <h3 className="font-medium text-gray-800 hover:text-pop-600 transition-colors line-clamp-1">
                {title}
              </h3>
            </Link>
            <p className="text-sm text-gray-500">{category.name}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => updateProductCount({ productId: id, count: count - 1 })}
                disabled={count <= 1}
                className={`px-3 py-1 ${
                  count <= 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <i className="fa-solid fa-minus text-xs"></i>
              </button>
              <span className="px-3 py-1 text-gray-800 font-medium">{count}</span>
              <button
                onClick={() => updateProductCount({ productId: id, count: count + 1 })}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              >
                <i className="fa-solid fa-plus text-xs"></i>
              </button>
            </div>

            <span className="text-lg text-pop-700 font-bold">{price * count} L.E</span>
          </div>
        </div>

        <div className="w-full md:w-auto flex justify-center items-center md:items-start md:pt-0 pt-2">
          <button
            onClick={() => removeProductFromCart({ productId: id })}
            className="text-gray-600 hover:text-red-600 transition-colors"
            title="Remove"
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </motion.div>
    </>
  );
}
