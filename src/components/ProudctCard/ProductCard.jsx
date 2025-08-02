import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/Cart.context";
import { WishlistContext } from "../../context/Wishlist.context"; 
import { Link, useNavigate } from "react-router-dom";

export default function ProductCard({ productInfo }) {
  const { images, category, title, price, ratingsAverage, _id } = productInfo;
  const { addProductToCart } = useContext(CartContext);
  const { addProductToWishlist, wishlistIds, removeProductFromWishlist } = useContext(WishlistContext); 
  const navigate = useNavigate();
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    setIsInWishlist(wishlistIds.includes(_id));
  }, [wishlistIds, _id]);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (isInWishlist) {
      removeProductFromWishlist({ productId: _id });
    } else {
      addProductToWishlist({ productId: _id });
    }
  };

  const handleProductClick = () => {
    navigate(`/product/${_id}`, { state: { product: productInfo } });
  };

  return (
    <div
      className="shadow-md my-3 rounded-md overflow-hidden transition-all duration-300 hover:shadow-lg w-full cursor-pointer"
      onClick={handleProductClick}
    >
      <div className="relative">
        <img 
          className="w-full h-80 object-cover" 
          src={images[0]} 
          alt={title} 
        />
        <div 
          className="layer px-1 py-2 mt-2 flex flex-col items-end justify-start gap-3 absolute w-fit h-fit right-0 top-0"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            onClick={handleWishlistClick}
            className={`icon w-7 h-7 text-center cursor-pointer rounded-full text-lg text-white flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:rotate-6 ${
              isInWishlist ? 'bg-pop-700' : 'bg-primary-400'}`}
          >
            <i className="fa-solid fa-heart text-white text-xs"></i>
          </div>

          <div
            onClick={(e) => {
              e.stopPropagation();
              addProductToCart({ productId: _id });
            }}
            className="icon w-7 h-7 text-center bg-primary-400 cursor-pointer rounded-full text-lg text-white flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:rotate-6"
          >
            <i className="fa-solid fa-cart-shopping text-white text-xs"></i>
          </div>
          <Link
            to={`/product/${_id}`}
            state={{ product: productInfo }}
            onClick={(e) => e.stopPropagation()}
            className="icon w-7 h-7 text-center bg-primary-400 cursor-pointer rounded-full text-lg text-white flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:rotate-6"
          >
            <i className="fa-solid fa-eye text-white text-xs"></i>
          </Link>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-primary-600 text-sm font-medium">{category?.name}</h3>
        <h2 className="text-gray-800 font-semibold text-sm line-clamp-1 mt-1">{title}</h2>
        <div className="flex items-center justify-between mt-3">
          <span className="text-primary-700 font-medium">{price} L.E</span>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <i className="fa-solid fa-star text-yellow-400"></i>
            <span>{ratingsAverage}</span>
          </div>
        </div>
      </div>
    </div>
  );
}