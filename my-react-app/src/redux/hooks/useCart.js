import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  setCheckoutItems,
  addToCheckout,
  loadCartFromStorage,
} from "../slices/cartSlice";

export const useCart = () => {
  const dispatch = useDispatch();
  const { cartItems, checkoutItems, totalAmount, totalQuantity } = useSelector(
    (state) => state.cart
  );

  return {
    cartItems,
    checkoutItems,
    totalAmount,
    totalQuantity,
    addToCart: (item) => dispatch(addToCart(item)),
    removeFromCart: (itemId) => dispatch(removeFromCart(itemId)),
    updateQuantity: (itemId, quantity) =>
      dispatch(updateCartItemQuantity({ itemId, quantity })),
    clearCart: () => dispatch(clearCart()),
    setCheckoutItems: (items) => dispatch(setCheckoutItems(items)),
    addToCheckout: (item) => dispatch(addToCheckout(item)),
    loadCartFromStorage: () => dispatch(loadCartFromStorage()),
  };
};
