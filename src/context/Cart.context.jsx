import { createContext, useContext, useState, useEffect } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const { token } = useContext(UserContext);
  const [cartInfo, setCartInfo] = useState(null);

  useEffect(() => {
    if (token) getCartProduct();
  }, [token]);

  async function getCartProduct() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: { token },
      };

      const { data } = await axios.request(options);

      if (data.status === "success") {
        setCartInfo(data);
      }
    } catch (error) {
      console.error(error);
      // toast.error("Error getting cart products");
    }
  }

  async function addProductToCart({ productId }) {
    const loadingID = toast.loading("Checking cart...");
    try {
      // Check if the product is already in the cart
      if (cartInfo?.data?.products?.some(product => product.product._id === productId)) {
        toast.dismiss(loadingID);
        toast("Item is already in the cart", { icon: "🛒" });
        return;
      }

      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        headers: { token },
        data: { productId },
      };

      const { data } = await axios.request(options);

      if (data.status === "success") {
        toast.success(data.message);
        getCartProduct(); // refresh cart
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to add product to cart."
      );
    } finally {
      toast.dismiss(loadingID);
    }
  }

  async function removeProductFromCart({ productId }) {
    const toastId = toast.loading("Removing product...");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "DELETE",
        headers: { token },
      };

      const { data } = await axios.request(options);

      if (data.status === "success") {
        toast.success("Product removed from cart");
        setCartInfo(data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove product");
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function clearCart() {
    const toastId = toast.loading("Clearing cart...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "DELETE",
        headers: { token },
      };

      const { data } = await axios.request(options);

      if (data.message === "success") {
        toast.success("Cart cleared successfully");
        setCartInfo({ numOfCartItems: 0 });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to clear cart");
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function updateProductCount({ productId, count }) {
    const toastId = toast.loading("Updating product quantity...");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "PUT",
        headers: { token },
        data: { count },
      };

      const { data } = await axios.request(options);

      if (data.status === "success") {
        toast.success("Quantity updated");
        setCartInfo(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update quantity");
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <>
    <CartContext.Provider
      value={{
        addProductToCart,
        getCartProduct,
        cartInfo,
        removeProductFromCart,
        clearCart,
        updateProductCount,
      }}
    >
      {children}
    </CartContext.Provider>
    </>
  );
}
