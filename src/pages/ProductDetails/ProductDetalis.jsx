import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/Cart.context";
import { WishlistContext } from "../../context/Wishlist.context";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "../../components/ProudctCard/ProductCard";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet-async";

export default function ProductDetails() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const { addProductToCart } = useContext(CartContext);
  const {
    addProductToWishlist,
    wishlistIds,
    removeProductFromWishlist,
  } = useContext(WishlistContext);
  const [isInWishlist, setIsInWishlist] = useState(false);

  async function getProductDetails() {
    try {
      setDetailsLoading(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProductDetails(data.data);
      if (data.data.images?.length > 0) {
        setSelectedImage(data.data.images[0]);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to load product details");
    } finally {
      setDetailsLoading(false);
    }
  }

  async function getRelatedProducts() {
    if (!productDetails?.category?._id) return;
    try {
      setRelatedLoading(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`
      );
      const filtered = data.data.filter((p) => p._id !== productDetails._id);
      setRelatedProducts(filtered);
    } catch (err) {
      console.error("Error fetching related products:", err);
      setError("Failed to load related products");
    } finally {
      setRelatedLoading(false);
    }
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);

  useEffect(() => {
    if (productDetails) {
      getRelatedProducts();
      setIsInWishlist(wishlistIds.includes(productDetails._id));
    }
  }, [productDetails]);

  const handleWishlistClick = () => {
    if (isInWishlist) {
      removeProductFromWishlist({ productId: productDetails._id });
    } else {
      addProductToWishlist({ productId: productDetails._id });
    }
  };

  if (detailsLoading) return <Loading />;
  if (error && !productDetails)
    return <p className="text-center py-10 text-red-500">{error}</p>;

  const {
    images = [],
    category,
    title,
    price,
    ratingsAverage,
    description,
  } = productDetails;

  return (
    <>
      <Helmet>
        <title>{title} | Product Details</title>
        <meta name="description" content={description?.slice(0, 120)} />
      </Helmet>

      <div className="flex flex-col md:flex-row p-2 mt-24 container">
        <div className="flex flex-col md:flex-row gap-6 items-center max-w-6xl w-full mx-auto">
          {/* Thumbnails */}
          <div
            className={`flex ${
              images.length > 3
                ? "flex-row md:flex-col flex-wrap md:h-[350px]"
                : "flex-row md:flex-col"
            } gap-4 pt-2`}
          >
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${
                  img === selectedImage
                    ? "border-primary-500"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div>
            <img
              src={selectedImage || images[0]}
              alt={title}
              className="w-full h-80 object-contain rounded-md"
            />
          </div>

          {/* Product Info */}
          <div className="content py-4 space-y-2 w-72">
            <h3 className="text-xs text-gray-500 uppercase">{category?.name}</h3>
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            <span className="font-bold text-gray-900">{price} L.E</span>
            <h3 className="flex items-center text-gray-700">
              {ratingsAverage}
              <i className="fa-solid fa-star text-yellow-400 text-sm ml-1"></i>
            </h3>
            <div>
              <h2 className="font-bold text-sm">Description</h2>
              <p className="text-xs text-gray-600 pt-1 line-clamp-5 leading-relaxed">
                {description}
              </p>
            </div>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => addProductToCart({ productId: id })}
                className="flex items-center justify-center gap-2 text-xs bg-gray-900 text-white border border-gray-900 rounded-md px-2 py-1 hover:bg-white hover:text-gray-900 transition-colors duration-300"
              >
                Add to cart
                <i className="fa-solid fa-cart-shopping"></i>
              </button>
              <button
                onClick={handleWishlistClick}
                className={`flex items-center justify-center gap-2 text-xs ${
                  isInWishlist ? "bg-pop-500" : "bg-pop-700"
                } text-white border border-white rounded-md px-2 py-1 hover:bg-white hover:text-pop-600 transition-colors duration-300`}
              >
                <i className="fa-solid fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="container my-20 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-8">Related Products</h2>
        {relatedLoading ? (
          <Loading />
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : relatedProducts.length === 0 ? (
          <p className="text-center">No related products found</p>
        ) : (
          <div className="relative">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              slidesPerView={1}
              spaceBetween={20}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              loop={relatedProducts.length > 4}
            >
              {relatedProducts.map((product) => (
                <SwiperSlide key={product._id}>
                  <ProductCard productInfo={product} />
                </SwiperSlide>
              ))}

              <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 
                w-10 h-10 bg-white text-gray-800 rounded-full flex items-center justify-center 
                shadow-lg hover:bg-gray-100 transition-all duration-200 border border-gray-200">
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10 
                w-10 h-10 bg-white text-gray-800 rounded-full flex items-center justify-center 
                shadow-lg hover:bg-gray-100 transition-all duration-200 border border-gray-200">
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </Swiper>
          </div>
        )}
      </section>
    </>
  );
}
