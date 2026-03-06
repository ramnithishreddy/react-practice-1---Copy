import { useDispatch, useSelector } from "react-redux";
import {
  setCategory,
  setSearchTerm,
  clearSearch,
  setSortBy,
  setPriceRange,
  setRatingFilter,
  resetFilters,
  setLoadingState,
  setError,
} from "../slices/productsSlice";

export const useProducts = () => {
  const dispatch = useDispatch();
  const {
    allProducts,
    filteredProducts,
    selectedCategory,
    searchTerm,
    filters,
    loading,
    error,
  } = useSelector((state) => state.products);

  return {
    allProducts,
    filteredProducts,
    selectedCategory,
    searchTerm,
    filters,
    loading,
    error,
    setCategory: (category) => dispatch(setCategory(category)),
    setSearchTerm: (term) => dispatch(setSearchTerm(term)),
    clearSearch: () => dispatch(clearSearch()),
    setSortBy: (sortBy) => dispatch(setSortBy(sortBy)),
    setPriceRange: (priceRange) => dispatch(setPriceRange(priceRange)),
    setRatingFilter: (rating) => dispatch(setRatingFilter(rating)),
    resetFilters: () => dispatch(resetFilters()),
    setLoadingState: (isLoading) => dispatch(setLoadingState(isLoading)),
    setError: (error) => dispatch(setError(error)),
  };
};
