import { createSlice } from "@reduxjs/toolkit";
import data from "../../amazon/data.json";

const initialState = {
  allProducts: data,
  filteredProducts: data.Grocery || [],
  selectedCategory: "Grocery",
  searchTerm: "",
  filters: {
    sortBy: "default",
    priceRange: { min: 0, max: 100000 },
    rating: 0,
  },
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      const category = action.payload;
      state.selectedCategory = category;
      state.filteredProducts = state.allProducts[category] || [];
      state.searchTerm = "";
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload.toLowerCase();
      const searchResults = Object.keys(state.allProducts)
        .flatMap((category) => state.allProducts[category])
        .filter((item) =>
          item.title?.toLowerCase().includes(state.searchTerm)
        );
      state.filteredProducts = searchResults;
    },

    clearSearch: (state) => {
      state.searchTerm = "";
      state.filteredProducts = state.allProducts[state.selectedCategory] || [];
    },

    setSortBy: (state, action) => {
      const sortBy = action.payload;
      state.filters.sortBy = sortBy;

      const items = [...state.filteredProducts];
      switch (sortBy) {
        case "price-low-to-high":
          items.sort((a, b) => a.price - b.price);
          break;
        case "price-high-to-low":
          items.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          items.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case "newest":
          items.sort((a, b) => (b.id || 0) - (a.id || 0));
          break;
        default:
          break;
      }
      state.filteredProducts = items;
    },

    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload;
      const { min, max } = action.payload;
      const items = Object.keys(state.allProducts)
        .flatMap((category) => state.allProducts[category])
        .filter(
          (item) => item.price >= min && item.price <= max
        );
      state.filteredProducts = items;
    },

    setRatingFilter: (state, action) => {
      state.filters.rating = action.payload;
      const rating = action.payload;
      const items = Object.keys(state.allProducts)
        .flatMap((category) => state.allProducts[category])
        .filter((item) => (item.rating || 0) >= rating);
      state.filteredProducts = items;
    },

    resetFilters: (state) => {
      state.filters = {
        sortBy: "default",
        priceRange: { min: 0, max: 100000 },
        rating: 0,
      };
      state.searchTerm = "";
      state.filteredProducts = state.allProducts[state.selectedCategory] || [];
    },

    setLoadingState: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCategory,
  setSearchTerm,
  clearSearch,
  setSortBy,
  setPriceRange,
  setRatingFilter,
  resetFilters,
  setLoadingState,
  setError,
} = productsSlice.actions;

export default productsSlice.reducer;
