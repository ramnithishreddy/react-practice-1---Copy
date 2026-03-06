import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  checkoutItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        const newQty = existingItem.Qty + newItem.Qty;
        if (newQty <= newItem.TQty) {
          existingItem.Qty = newQty;
        } else {
          console.warn("Item is out of stock");
        }
      } else {
        state.cartItems.push({
          ...newItem,
          Qty: newItem.Qty || 1,
        });
      }

      // Update total quantity
      state.totalQuantity = state.cartItems.reduce(
        (total, item) => total + item.Qty,
        0
      );

      // Update total amount
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.price * item.Qty,
        0
      );

      // Save to session storage
      sessionStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);

      state.totalQuantity = state.cartItems.reduce(
        (total, item) => total + item.Qty,
        0
      );

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.price * item.Qty,
        0
      );

      sessionStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    updateCartItemQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);

      if (item) {
        if (quantity > 0 && quantity <= item.TQty) {
          item.Qty = quantity;
        }
      }

      state.totalQuantity = state.cartItems.reduce(
        (total, item) => total + item.Qty,
        0
      );

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.price * item.Qty,
        0
      );

      sessionStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      sessionStorage.removeItem("cartItems");
    },

    setCheckoutItems: (state, action) => {
      state.checkoutItems = action.payload;
    },

    addToCheckout: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.checkoutItems.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.Qty += newItem.Qty;
      } else {
        state.checkoutItems.push({
          ...newItem,
          Qty: newItem.Qty || 1,
        });
      }
    },

    loadCartFromStorage: (state) => {
      const savedCart = sessionStorage.getItem("cartItems");
      if (savedCart) {
        state.cartItems = JSON.parse(savedCart);
        state.totalQuantity = state.cartItems.reduce(
          (total, item) => total + item.Qty,
          0
        );
        state.totalAmount = state.cartItems.reduce(
          (total, item) => total + item.price * item.Qty,
          0
        );
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  setCheckoutItems,
  addToCheckout,
  loadCartFromStorage,
} = cartSlice.actions;

export default cartSlice.reducer;
