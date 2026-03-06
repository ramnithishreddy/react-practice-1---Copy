import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/slices/cartSlice";
import authReducer from "../redux/slices/authSlice";
import productsReducer from "../redux/slices/productsSlice";

/**
 * Create a Redux store for testing with optional preloaded state
 * @param {object} preloadedState - Initial state for the store
 * @returns {object} Configured Redux store for testing
 */
export const createMockStore = (preloadedState = {}) => {
  const defaultState = {
    cart: {
      cartItems: [],
      checkoutItems: [],
      totalAmount: 0,
      totalQuantity: 0,
    },
    auth: {
      isLoggedIn: false,
      user: null,
      error: null,
      loading: false,
      rememberMe: false,
    },
    products: {
      allProducts: {},
      filteredProducts: [],
      selectedCategory: "Grocery",
      searchTerm: "",
      filters: {
        sortBy: "default",
        priceRange: { min: 0, max: 100000 },
        rating: 0,
      },
      loading: false,
      error: null,
    },
  };

  return configureStore({
    reducer: {
      cart: cartReducer,
      auth: authReducer,
      products: productsReducer,
    },
    preloadedState: {
      ...defaultState,
      ...preloadedState,
    },
  });
};

/**
 * Create a mock store with pre-populated cart items
 * @param {array} cartItems - Cart items to populate
 * @param {array} checkoutItems - Checkout items to populate
 * @returns {object} Configured Redux store with cart data
 */
export const createMockStoreWithCart = (cartItems = [], checkoutItems = []) => {
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.Qty, 0);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.Qty, 0);

  return createMockStore({
    cart: {
      cartItems,
      checkoutItems,
      totalAmount,
      totalQuantity,
    },
  });
};

/**
 * Create a mock store with authenticated user
 * @param {object} userData - User data to populate
 * @returns {object} Configured Redux store with user logged in
 */
export const createMockStoreWithUser = (userData = {}) => {
  const defaultUser = {
    fullName: "Test User",
    email: "test@example.com",
    userId: "TEST_USER_123",
  };

  return createMockStore({
    auth: {
      isLoggedIn: true,
      user: { ...defaultUser, ...userData },
      error: null,
      loading: false,
      rememberMe: false,
    },
  });
};

/**
 * Create a mock item for testing
 */
export const createMockItem = (overrides = {}) => {
  return {
    id: 1,
    title: "Test Item",
    price: 100,
    Price: 100,
    Qty: 1,
    TQty: 10,
    image: "https://via.placeholder.com/200",
    ...overrides,
  };
};

/**
 * Create multiple mock items
 */
export const createMockItems = (count = 3) => {
  return Array.from({ length: count }, (_, i) => createMockItem({ id: i + 1, price: 100 * (i + 1) }));
};
