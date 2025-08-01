import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const WishlistContext = createContext(null);

export default function WishlistProvider({ children }) {
  const { token } = useContext(UserContext);
  const [wishlistInfo, setWishlistInfo] = useState(null);
  const [wishlistIds, setWishlistIds] = useState([]);

  async function getWishlistProducts() {
    try {
      if (!token) {
        return;
      }

      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "GET",
        headers: {
          token,
        },
      };

      const { data } = await axios.request(options);

      if (data.status === "success") {
        setWishlistInfo(data);
        const wishlistids = data.data.map((product) => product.id);
        setWishlistIds(wishlistids);
      } else {
        toast.error("Failed to load wishlist.");
      }
    } catch (error) {
      console.error("Error fetching wishlist: ", error);
      toast.error("An error occurred while fetching the wishlist.");
    }
  }

  async function addProductToWishlist({ productId }) {
    if (!token) {
      toast.error("You must be logged in to add to wishlist.");
      return;
    }

    if (wishlistIds.includes(productId)) {
      toast("This item is already in your wishlist.", { icon: "❤️" });
      return;
    }

    const toastId = toast.loading("Adding product to wishlist...");

    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId,
        },
      };

      const { data } = await axios.request(options);

      if (data.status === "success") {
        toast.success(data.message || "Product added to wishlist", { id: toastId });
        getWishlistProducts();
      } else {
        toast.error("Failed to add product to wishlist", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding product to wishlist", { id: toastId });
    }
  }

  async function removeProductFromWishlist({ productId }) {
    const toastId = toast.loading("Removing product from wishlist...");

    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        method: "DELETE",
        headers: {
          token,
        },
      };

      const { data } = await axios.request(options);

      if (data.status === "success") {
        toast.success("Product removed from wishlist", { id: toastId });
        getWishlistProducts();
      } else {
        toast.error("Failed to remove product", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error removing product from wishlist", { id: toastId });
    }
  }

  return (
    <>
    <WishlistContext.Provider
      value={{
        addProductToWishlist,
        getWishlistProducts,
        wishlistInfo,
        wishlistIds,
        removeProductFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
    </>
  );
}
