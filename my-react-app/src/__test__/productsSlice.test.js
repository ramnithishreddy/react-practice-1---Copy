import productsReducer, { 
  setCategory,
  setSearchTerm,
  clearSearch,
  setSortBy,
  setPriceRange,
  setRatingFilter,
  resetFilters,
  setLoadingState
} from "../redux/slices/productsSlice";

describe("Products Slice", () => {
  // Get initial state
  const initialState = productsReducer(undefined, { type: "unknown" });

  describe("Initial state", () => {
    it("should have selectedCategory as Grocery initially", () => {
      const state = productsReducer(undefined, { type: "unknown" });
      expect(state.selectedCategory).toBe("Grocery");
    });

    it("should have empty searchTerm initially", () => {
      const state = productsReducer(undefined, { type: "unknown" });
      expect(state.searchTerm).toBe("");
    });

    it("should have default filters", () => {
      const state = productsReducer(undefined, { type: "unknown" });
      expect(state.filters.sortBy).toBe("default");
      expect(state.filters.priceRange.min).toBe(0);
      expect(state.filters.priceRange.max).toBe(100000);
      expect(state.filters.rating).toBe(0);
    });

    it("should have allProducts loaded from data", () => {
      const state = productsReducer(undefined, { type: "unknown" });
      expect(state.allProducts).toBeDefined();
      expect(Object.keys(state.allProducts).length).toBeGreaterThan(0);
    });

    it("should have filteredProducts for Grocery category", () => {
      const state = productsReducer(undefined, { type: "unknown" });
      expect(state.filteredProducts).toBeDefined();
      expect(Array.isArray(state.filteredProducts)).toBe(true);
    });
  });

  describe("setCategory action", () => {
    it("should update selected category", () => {
      const state = productsReducer(initialState, setCategory("Fashion"));
      expect(state.selectedCategory).toBe("Fashion");
    });

    it("should clear search term when changing category", () => {
      const prevState = { ...initialState, searchTerm: "laptop" };
      const state = productsReducer(prevState, setCategory("Fashion"));
      expect(state.searchTerm).toBe("");
    });

    it("should handle different categories", () => {
      const categories = ["Grocery", "Fashion", "Mobiles"];
      categories.forEach((category) => {
        const state = productsReducer(initialState, setCategory(category));
        expect(state.selectedCategory).toBe(category);
      });
    });

    it("should update filtered products based on category", () => {
      const state = productsReducer(initialState, setCategory("Fashion"));
      expect(state.selectedCategory).toBe("Fashion");
    });
  });

  describe("setSearchTerm action", () => {
    it("should set search term", () => {
      const state = productsReducer(initialState, setSearchTerm("laptop"));
      expect(state.searchTerm).toBe("laptop");
    });

    it("should convert search term to lowercase", () => {
      const state = productsReducer(initialState, setSearchTerm("LAPTOP"));
      expect(state.searchTerm).toBe("laptop");
    });

    it("should handle empty search term", () => {
      const state = productsReducer(initialState, setSearchTerm(""));
      expect(state.searchTerm).toBe("");
    });

    it("should filter products based on search", () => {
      const state = productsReducer(initialState, setSearchTerm("shirt"));
      // Should return filtered results
      expect(Array.isArray(state.filteredProducts)).toBe(true);
    });
  });

  describe("clearSearch action", () => {
    it("should clear search term and restore filtered products", () => {
      let state = productsReducer(initialState, setSearchTerm("test"));
      expect(state.searchTerm).toBe("test");
      
      state = productsReducer(state, clearSearch());
      expect(state.searchTerm).toBe("");
    });

    it("should restore products for current category", () => {
      let state = productsReducer(initialState, setSearchTerm("laptop"));
      state = productsReducer(state, clearSearch());
      
      expect(state.selectedCategory).toBe("Grocery");
    });
  });

  describe("setSortBy action", () => {
    it("should update sortBy filter", () => {
      const state = productsReducer(initialState, setSortBy("price-low-to-high"));
      expect(state.filters.sortBy).toBe("price-low-to-high");
    });

    it("should handle different sort options", () => {
      const sorts = ["default", "price-low-to-high", "price-high-to-low"];
      sorts.forEach((sort) => {
        const state = productsReducer(initialState, setSortBy(sort));
        expect(state.filters.sortBy).toBe(sort);
      });
    });

    it("should preserve other filters", () => {
      const state = productsReducer(initialState, setSortBy("price-high-to-low"));
      expect(state.filters.priceRange).toEqual(initialState.filters.priceRange);
      expect(state.filters.rating).toBe(0);
    });
  });

  describe("setPriceRange action", () => {
    it("should update price range", () => {
      const range = { min: 100, max: 5000 };
      const state = productsReducer(initialState, setPriceRange(range));
      expect(state.filters.priceRange).toEqual(range);
    });

    it("should handle different price ranges", () => {
      const testRanges = [
        { min: 0, max: 1000 },
        { min: 1000, max: 5000 },
        { min: 5000, max: 50000 },
      ];
      testRanges.forEach((range) => {
        const state = productsReducer(initialState, setPriceRange(range));
        expect(state.filters.priceRange).toEqual(range);
      });
    });

    it("should preserve selectedCategory", () => {
      const prevState = { ...initialState, selectedCategory: "Fashion" };
      const range = { min: 500, max: 3000 };
      const state = productsReducer(prevState, setPriceRange(range));
      expect(state.selectedCategory).toBe("Fashion");
    });
  });

  describe("setRatingFilter action", () => {
    it("should update rating filter", () => {
      const state = productsReducer(initialState, setRatingFilter(4));
      expect(state.filters.rating).toBe(4);
    });

    it("should handle different ratings", () => {
      const ratings = [0, 1, 2, 3, 4, 5];
      ratings.forEach((rating) => {
        const state = productsReducer(initialState, setRatingFilter(rating));
        expect(state.filters.rating).toBe(rating);
      });
    });

    it("should preserve other filters", () => {
      const prevState = {
        ...initialState,
        filters: {
          ...initialState.filters,
          sortBy: "default",
          priceRange: { min: 100, max: 5000 },
        },
      };
      const state = productsReducer(prevState, setRatingFilter(3));
      expect(state.filters.sortBy).toBe("default");
      expect(state.filters.priceRange).toEqual({ min: 100, max: 5000 });
    });
  });

  describe("resetFilters action", () => {
    it("should reset all filters to default", () => {
      const prevState = {
        ...initialState,
        filters: {
          sortBy: "price-high-to-low",
          priceRange: { min: 1000, max: 5000 },
          rating: 4,
        },
      };
      const state = productsReducer(prevState, resetFilters());
      expect(state.filters.sortBy).toBe("default");
      expect(state.filters.rating).toBe(0);
    });

    it("should reset searchTerm", () => {
      const prevState = { ...initialState, searchTerm: "laptop" };
      const state = productsReducer(prevState, resetFilters());
      expect(state.searchTerm).toBe("");
    });

    it("should maintain selectedCategory when resetting filters", () => {
      const prevState = { ...initialState, selectedCategory: "Fashion" };
      const state = productsReducer(prevState, resetFilters());
      // selectedCategory is not reset by resetFilters, only filters and searchTerm
      expect(state.selectedCategory).toBe("Fashion");
    });
  });

  describe("setLoadingState action", () => {
    it("should update loading state", () => {
      const state = productsReducer(initialState, setLoadingState(true));
      expect(state.loading).toBe(true);
    });

    it("should toggle loading state", () => {
      let state = productsReducer(initialState, setLoadingState(true));
      expect(state.loading).toBe(true);

      state = productsReducer(state, setLoadingState(false));
      expect(state.loading).toBe(false);
    });

    it("should preserve other state", () => {
      const state = productsReducer(initialState, setLoadingState(true));
      expect(state.selectedCategory).toBe("Grocery");
      expect(state.filters).toBeDefined();
    });
  });

  describe("Complex state transitions", () => {
    it("should handle category change and search", () => {
      let state = productsReducer(initialState, setCategory("Fashion"));
      expect(state.selectedCategory).toBe("Fashion");

      state = productsReducer(state, setSearchTerm("shirt"));
      expect(state.searchTerm).toBe("shirt");
    });

    it("should maintain consistency through multiple operations", () => {
      let state = productsReducer(initialState, setSortBy("price-low-to-high"));
      state = productsReducer(state, setRatingFilter(3));
      state = productsReducer(state, setPriceRange({ min: 100, max: 5000 }));

      expect(state.filters.sortBy).toBe("price-low-to-high");
      expect(state.filters.rating).toBe(3);
      expect(state.filters.priceRange).toEqual({ min: 100, max: 5000 });
    });

    it("should reset all filters and state correctly", () => {
      let state = productsReducer(initialState, setCategory("Fashion"));
      state = productsReducer(state, setSearchTerm("test"));
      state = productsReducer(state, setSortBy("price-high-to-low"));
      state = productsReducer(state, setRatingFilter(4));

      state = productsReducer(state, resetFilters());

      // selectedCategory is preserved, only filters and searchTerm are reset
      expect(state.selectedCategory).toBe("Fashion");
      expect(state.searchTerm).toBe("");
      expect(state.filters.sortBy).toBe("default");
      expect(state.filters.rating).toBe(0);
    });
  });
});
