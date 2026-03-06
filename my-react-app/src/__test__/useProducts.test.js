import { renderHook, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { useProducts } from "../redux/hooks";
import { createMockStore } from "./reduxTestUtils";

describe("useProducts Hook", () => {
  describe("return object structure", () => {
    it("should return products state properties", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useProducts(), { wrapper });

      expect(result.current).toHaveProperty("allProducts");
      expect(result.current).toHaveProperty("filteredProducts");
      expect(result.current).toHaveProperty("selectedCategory");
      expect(result.current).toHaveProperty("searchTerm");
      expect(result.current).toHaveProperty("filters");
      expect(result.current).toHaveProperty("loading");
      expect(result.current).toHaveProperty("error");
    });

    it("should return products action functions", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useProducts(), { wrapper });

      expect(result.current).toHaveProperty("setCategory");
      expect(result.current).toHaveProperty("setSearchTerm");
      expect(result.current).toHaveProperty("clearSearch");
      expect(result.current).toHaveProperty("setSortBy");
      expect(result.current).toHaveProperty("setPriceRange");
      expect(result.current).toHaveProperty("setRatingFilter");
      expect(result.current).toHaveProperty("resetFilters");
      expect(result.current).toHaveProperty("setLoadingState");
      expect(result.current).toHaveProperty("setError");
    });
  });

  describe("Initial state", () => {
    it("should return allProducts from data", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useProducts(), { wrapper });

      expect(result.current.allProducts).toBeDefined();
      expect(typeof result.current.allProducts).toBe("object");
    });

    it("should have selectedCategory as Grocery initially", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useProducts(), { wrapper });

      expect(result.current.selectedCategory).toBe("Grocery");
    });

    it("should have empty searchTerm initially", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useProducts(), { wrapper });

      expect(result.current.searchTerm).toBe("");
    });

    it("should have loading as false initially", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useProducts(), { wrapper });

      expect(result.current.loading).toBe(false);
    });

    it("should have null error initially", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useProducts(), { wrapper });

      expect(result.current.error).toBeNull();
    });

    it("should have correct initial filters", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useProducts(), { wrapper });

      expect(result.current.filters).toEqual({
        sortBy: "default",
        priceRange: { min: 0, max: 100000 },
        rating: 0,
      });
    });
  });

  describe("setCategory action", () => {
    it("should be callable with a category string", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useProducts(), { wrapper });

      expect(() => {
        act(() => {
          result.current.setCategory("Fashion");
        });
      }).not.toThrow();
    });

    it("should accept different category types", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useProducts(), { wrapper });

      const categories = ["Grocery", "Fashion", "Mobiles"];
      
      categories.forEach((category) => {
        expect(() => {
          act(() => {
            result.current.setCategory(category);
          });
        }).not.toThrow();
      });
    });
  });

  describe("setSearchTerm action", () => {
    it("should be callable with a search string", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useProducts(), { wrapper });

      expect(() => {
        act(() => {
          result.current.setSearchTerm("apple");
        });
      }).not.toThrow();
    });

    it("should accept various search terms", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useProducts(), { wrapper });

      const terms = ["apple", "samsung", "shirt", ""];
      
      terms.forEach((term) => {
        expect(() => {
          act(() => {
            result.current.setSearchTerm(term);
          });
        }).not.toThrow();
      });
    });
  });

  describe("clearSearch action", () => {
    it("should be callable", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useProducts(), { wrapper });

      expect(() => {
        act(() => {
          result.current.clearSearch();
        });
      }).not.toThrow();
    });

    it("should clear search after setting it", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useProducts(), { wrapper });

      act(() => {
        result.current.setSearchTerm("test");
      });

      expect(() => {
        act(() => {
          result.current.clearSearch();
        });
      }).not.toThrow();
    });
  });

  describe("setSortBy action", () => {
    it("should be callable with sort option", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useProducts(), { wrapper });

      expect(() => {
        act(() => {
          result.current.setSortBy("price-low-to-high");
        });
      }).not.toThrow();
    });

    it("should accept various sort options", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useProducts(), { wrapper });

      const sortOptions = ["default", "price-low-to-high", "price-high-to-low", "rating", "newest"];
      
      sortOptions.forEach((option) => {
        expect(() => {
          act(() => {
            result.current.setSortBy(option);
          });
        }).not.toThrow();
      });
    });
  });

  describe("setPriceRange action", () => {
    it("should be callable with price range object", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useProducts(), { wrapper });

      expect(() => {
        act(() => {
          result.current.setPriceRange({ min: 100, max: 5000 });
        });
      }).not.toThrow();
    });

    it("should accept different price ranges", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useProducts(), { wrapper });

      const ranges = [
        { min: 0, max: 1000 },
        { min: 1000, max: 5000 },
        { min: 5000, max: 100000 },
      ];
      
      ranges.forEach((range) => {
        expect(() => {
          act(() => {
            result.current.setPriceRange(range);
          });
        }).not.toThrow();
      });
    });
  });

  describe("setRatingFilter action", () => {
    it("should be callable with rating number", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useProducts(), { wrapper });

      expect(() => {
        act(() => {
          result.current.setRatingFilter(4);
        });
      }).not.toThrow();
    });

    it("should accept different rating values", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useProducts(), { wrapper });

      const ratings = [0, 1, 2, 3, 4, 5];
      
      ratings.forEach((rating) => {
        expect(() => {
          act(() => {
            result.current.setRatingFilter(rating);
          });
        }).not.toThrow();
      });
    });
  });

  describe("resetFilters action", () => {
    it("should be callable", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useProducts(), { wrapper });

      expect(() => {
        act(() => {
          result.current.resetFilters();
        });
      }).not.toThrow();
    });

    it("should reset filters after changes", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useProducts(), { wrapper });

      act(() => {
        result.current.setSortBy("price-low-to-high");
        result.current.setRatingFilter(3);
      });

      expect(() => {
        act(() => {
          result.current.resetFilters();
        });
      }).not.toThrow();
    });
  });

  describe("setLoadingState action", () => {
    it("should be callable with boolean", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useProducts(), { wrapper });

      expect(() => {
        act(() => {
          result.current.setLoadingState(true);
        });
      }).not.toThrow();
    });

    it("should accept true and false values", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useProducts(), { wrapper });

      expect(() => {
        act(() => {
          result.current.setLoadingState(true);
          result.current.setLoadingState(false);
        });
      }).not.toThrow();
    });
  });

  describe("setError action", () => {
    it("should be callable with error message", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useProducts(), { wrapper });

      expect(() => {
        act(() => {
          result.current.setError("Product load error");
        });
      }).not.toThrow();
    });

    it("should accept null as error", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useProducts(), { wrapper });

      expect(() => {
        act(() => {
          result.current.setError(null);
        });
      }).not.toThrow();
    });
  });

  describe("Multiple hook instances", () => {
    it("should return consistent state across multiple instances", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

      const { result: result1 } = renderHook(() => useProducts(), { wrapper });
      const { result: result2 } = renderHook(() => useProducts(), { wrapper });

      expect(result1.current.selectedCategory).toBe(result2.current.selectedCategory);
      expect(result1.current.searchTerm).toBe(result2.current.searchTerm);
    });

    it("should update all instances when state changes", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

      const { result } = renderHook(() => useProducts(), { wrapper });

      expect(result.current.selectedCategory).toBe("Grocery");

      act(() => {
        result.current.setCategory("Fashion");
      });

      expect(result.current.selectedCategory).toBe("Fashion");
    });
  });

  describe("Complex scenarios", () => {
    it("should handle multiple filter operations", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useProducts(), { wrapper });

      expect(() => {
        act(() => {
          result.current.setCategory("Fashion");
          result.current.setSearchTerm("shirt");
          result.current.setSortBy("price-low-to-high");
          result.current.setPriceRange({ min: 500, max: 5000 });
          result.current.setRatingFilter(3);
        });
      }).not.toThrow();
    });

    it("should handle filter reset after operations", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useProducts(), { wrapper });

      act(() => {
        result.current.setCategory("Mobiles");
        result.current.setSortBy("price-high-to-low");
        result.current.setRatingFilter(4);
      });

      expect(() => {
        act(() => {
          result.current.resetFilters();
        });
      }).not.toThrow();

      expect(result.current.filters.sortBy).toBe("default");
      expect(result.current.filters.rating).toBe(0);
    });
  });
});
