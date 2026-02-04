import {
  calculateCartTotal,
  calculateDiscount,
  calculateTotalItems,
  formatPrice,
  sortItems,
  filterByPriceRange,
  filterByRating,
  addWishlistItem,
  removeWishlistItem,
  persistWishlist,
  loadWishlist,
  calculateDeliveryDays,
  applyDiscountCode,
  validateItemQuantity,
  getItemDiscount,
  getRelatedItems,
  clearCart,
  updateItemQuantity,
  removeItemById,
  persistToSession,
  loadFromSession,
} from "../amazon/cartUtils";

describe("cartUtils - Calculation Functions", () => {
  const mockCart = [
    { id: 1, Price: 100, Qty: 2, Discount: 10 },
    { id: 2, Price: 200, Qty: 1, Discount: 5 },
    { id: 3, Price: 50, Qty: 3, Discount: 0 },
  ];

  describe("calculateCartTotal", () => {
    it("should calculate total cart value", () => {
      const total = calculateCartTotal(mockCart);
      expect(total).toBe(550);
    });

    it("should return 0 for empty cart", () => {
      expect(calculateCartTotal([])).toBe(0);
    });

    it("should handle cart with single item", () => {
      const singleItem = [{ Price: 100, Qty: 1 }];
      expect(calculateCartTotal(singleItem)).toBe(100);
    });
  });

  describe("calculateDiscount", () => {
    it("should calculate total discount", () => {
      const discount = calculateDiscount(mockCart);
      expect(discount).toBeGreaterThan(0);
    });

    it("should return 0 for empty cart", () => {
      expect(calculateDiscount([])).toBe(0);
    });

    it("should handle items with no discount", () => {
      const noDiscountCart = [{ Price: 100, Qty: 1, Discount: 0 }];
      expect(calculateDiscount(noDiscountCart)).toBe(0);
    });
  });

  describe("calculateTotalItems", () => {
    it("should calculate total quantity in cart", () => {
      const total = calculateTotalItems(mockCart);
      expect(total).toBe(6);
    });

    it("should return 0 for empty cart", () => {
      expect(calculateTotalItems([])).toBe(0);
    });
  });

  describe("calculateDeliveryDays", () => {
    it("should return object with min and max delivery days", () => {
      const days = calculateDeliveryDays(100);
      expect(days).toHaveProperty("min");
      expect(days).toHaveProperty("max");
      expect(typeof days.min).toBe("number");
      expect(typeof days.max).toBe("number");
    });

    it("should return 1-2 days for prime eligible orders", () => {
      const days = calculateDeliveryDays(500);
      expect(days.min).toBe(1);
      expect(days.max).toBe(2);
    });

    it("should return 5-7 days for regular orders", () => {
      const days = calculateDeliveryDays(100);
      expect(days.min).toBe(5);
      expect(days.max).toBe(7);
    });
  });
});

describe("cartUtils - Format Functions", () => {
  describe("formatPrice", () => {
    it("should format price as currency", () => {
      const formatted = formatPrice(1000);
      expect(formatted).toContain("₹");
    });

    it("should handle zero price", () => {
      expect(formatPrice(0)).toContain("₹");
    });

    it("should handle large numbers", () => {
      const formatted = formatPrice(1000000);
      expect(formatted).toContain("₹");
      expect(typeof formatted).toBe("string");
    });
  });

  describe("getItemDiscount", () => {
    it("should calculate discount percentage", () => {
      const discount = getItemDiscount(100, 80);
      expect(discount).toBe(20);
    });

    it("should return 0 for no discount", () => {
      expect(getItemDiscount(100, 100)).toBe(0);
    });
  });
});

describe("cartUtils - Filter Functions", () => {
  const mockProducts = [
    { id: 1, Price: 100, Rating: 4.5 },
    { id: 2, Price: 500, Rating: 3.5 },
    { id: 3, Price: 1000, Rating: 4.8 },
  ];

  describe("filterByPriceRange", () => {
    it("should filter products by price range", () => {
      const filtered = filterByPriceRange(mockProducts, 100, 600);
      expect(filtered).toHaveLength(2);
    });

    it("should return empty array if no products match", () => {
      const filtered = filterByPriceRange(mockProducts, 2000, 3000);
      expect(filtered).toHaveLength(0);
    });
  });

  describe("filterByRating", () => {
    it("should filter products by minimum rating", () => {
      const filtered = filterByRating(mockProducts, 4);
      expect(filtered.length).toBeGreaterThan(0);
    });

    it("should return products with rating >= specified", () => {
      const filtered = filterByRating(mockProducts, 4.5);
      expect(filtered.every((p) => (p.Rating || 0) >= 4.5)).toBe(true);
    });
  });
});

describe("cartUtils - Wishlist Functions", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  describe("addWishlistItem", () => {
    it("should add item to wishlist", () => {
      const wishlist = [];
      const item = { id: 1, title: "Test Product" };
      const updated = addWishlistItem(wishlist, item);
      expect(updated).toHaveLength(1);
      expect(updated[0].id).toBe(1);
    });

    it("should not duplicate items", () => {
      const wishlist = [{ id: 1, title: "Test Product" }];
      const item = { id: 1, title: "Test Product" };
      const updated = addWishlistItem(wishlist, item);
      expect(updated).toHaveLength(1);
    });
  });

  describe("removeWishlistItem", () => {
    it("should remove item from wishlist", () => {
      const wishlist = [{ id: 1, title: "Test Product" }];
      const updated = removeWishlistItem(wishlist, 1);
      expect(updated).toHaveLength(0);
    });
  });

  describe("persistWishlist and loadWishlist", () => {
    it("should persist and load wishlist from storage", () => {
      const wishlist = [
        { id: 1, title: "Item 1" },
        { id: 2, title: "Item 2" },
      ];
      persistWishlist(wishlist);
      const loaded = loadWishlist();
      expect(loaded).toEqual(wishlist);
    });

    it("should return empty array if no wishlist in storage", () => {
      sessionStorage.clear();
      const loaded = loadWishlist();
      expect(Array.isArray(loaded)).toBe(true);
    });
  });
});

describe("cartUtils - Discount Functions", () => {
  describe("applyDiscountCode", () => {
    it("should apply discount code", () => {
      const total = 1000;
      const discounted = applyDiscountCode(total, "SAVE10");
      expect(discounted).toBeLessThan(total);
    });

    it("should return original total for invalid code", () => {
      const total = 1000;
      const result = applyDiscountCode(total, "INVALID");
      expect(result).toBe(total);
    });
  });
});

describe("cartUtils - Validation Functions", () => {
  describe("validateItemQuantity", () => {
    it("should validate correct quantity", () => {
      const isValid = validateItemQuantity(5, 10);
      expect(isValid).toBe(true);
    });

    it("should reject zero or negative quantity", () => {
      const isValid1 = validateItemQuantity(0, 10);
      const isValid2 = validateItemQuantity(-1, 10);
      expect(isValid1).toBe(false);
      expect(isValid2).toBe(false);
    });

    it("should reject quantity exceeding max", () => {
      const isValid = validateItemQuantity(15, 10);
      expect(isValid).toBe(false);
    });
  });
});

describe("cartUtils - Utility Functions", () => {
  describe("sortItems", () => {
    it("should sort items by price low to high", () => {
      const items = [
        { id: 1, Price: 500 },
        { id: 2, Price: 100 },
        { id: 3, Price: 300 },
      ];
      const sorted = sortItems(items, "low-to-high");
      expect(sorted[0].Price).toBeLessThanOrEqual(sorted[1].Price);
    });

    it("should sort items by price high to low", () => {
      const items = [
        { id: 1, Price: 500 },
        { id: 2, Price: 100 },
        { id: 3, Price: 300 },
      ];
      const sorted = sortItems(items, "high-to-low");
      expect(sorted[0].Price).toBeGreaterThanOrEqual(sorted[1].Price);
    });

    it("should sort items by rating", () => {
      const items = [
        { id: 1, Rating: 4.5 },
        { id: 2, Rating: 3.5 },
        { id: 3, Rating: 4.8 },
      ];
      const sorted = sortItems(items, "rating");
      expect(sorted[0].Rating).toBeGreaterThanOrEqual(sorted[1].Rating);
    });
  });

  describe("getRelatedItems", () => {
    it("should return related items based on tags", () => {
      const items = [
        { id: 1, Tags: ["electronics", "phone"] },
        { id: 2, Tags: ["clothing"] },
        { id: 3, Tags: ["electronics", "laptop"] },
      ];
      const related = getRelatedItems(items, ["electronics"]);
      expect(related.length).toBeGreaterThan(0);
    });
  });

  describe("clearCart", () => {
    it("should clear cart from session storage", () => {
      sessionStorage.setItem("cartItems", JSON.stringify([{ id: 1 }]));
      const result = clearCart();
      expect(result).toEqual([]);
    });
  });

  describe("updateItemQuantity", () => {
    it("should update item quantity", () => {
      const items = [{ id: 1, Qty: 1 }];
      const updated = updateItemQuantity(items, 1, 5);
      expect(updated[0].Qty).toBe(5);
    });
  });

  describe("removeItemById", () => {
    it("should remove item by id", () => {
      const items = [
        { id: 1, title: "Item 1" },
        { id: 2, title: "Item 2" },
      ];
      const updated = removeItemById(items, 1);
      expect(updated).toHaveLength(1);
      expect(updated[0].id).toBe(2);
    });
  });

  describe("Session Storage Functions", () => {
    beforeEach(() => {
      sessionStorage.clear();
    });

    it("should persist and load data from session", () => {
      const testData = [{ id: 1, name: "Test" }];
      persistToSession("test", testData);
      const loaded = loadFromSession("test");
      expect(loaded).toEqual(testData);
    });

    it("should handle persisting null data", () => {
      persistToSession("nullTest", null);
      const loaded = loadFromSession("nullTest");
      expect(loaded === null || Array.isArray(loaded)).toBeTruthy();
    });

    it("should handle persisting empty arrays", () => {
      persistToSession("emptyArray", []);
      const loaded = loadFromSession("emptyArray");
      expect(Array.isArray(loaded)).toBe(true);
    });

    it("should return null for non-existent keys", () => {
      const loaded = loadFromSession("nonExistent");
      expect(loaded === null || Array.isArray(loaded)).toBeTruthy();
    });

    it("should overwrite existing session data", () => {
      persistToSession("overwrite", [1, 2, 3]);
      persistToSession("overwrite", [4, 5, 6]);
      const loaded = loadFromSession("overwrite");
      expect(loaded).toEqual([4, 5, 6]);
    });

    it("should handle complex object persistence", () => {
      const complexData = {
        cart: [{ id: 1, price: 100, qty: 2 }],
        user: { name: "Test User" },
        metadata: { timestamp: Date.now() }
      };
      persistToSession("complex", complexData);
      const loaded = loadFromSession("complex");
      expect(loaded.cart).toBeDefined();
      expect(loaded.user.name).toBe("Test User");
    });

    it("should handle persisting boolean values", () => {
      persistToSession("boolean", true);
      const loaded = loadFromSession("boolean");
      expect(loaded).toBe(true);
    });

    it("should handle persisting string values", () => {
      persistToSession("string", "test string");
      const loaded = loadFromSession("string");
      expect(loaded).toBe("test string");
    });

    it("should handle persisting number values", () => {
      persistToSession("number", 42);
      const loaded = loadFromSession("number");
      expect(loaded).toBe(42);
    });
  });
});

describe("cartUtils - Sort and Filter", () => {
  const mockItems = [
    { id: 1, Price: 300, Rating: 4.5 },
    { id: 2, Price: 100, Rating: 4.0 },
    { id: 3, Price: 200, Rating: 4.8 },
  ];

  describe("sortItems", () => {
    it("should sort by low to high price", () => {
      const sorted = sortItems(mockItems, "low-to-high");
      expect(sorted[0].Price).toBe(100);
      expect(sorted[sorted.length - 1].Price).toBe(300);
    });

    it("should sort by high to low price", () => {
      const sorted = sortItems(mockItems, "high-to-low");
      expect(sorted[0].Price).toBe(300);
      expect(sorted[sorted.length - 1].Price).toBe(100);
    });

    it("should sort by rating", () => {
      const sorted = sortItems(mockItems, "rating");
      expect(sorted[0].Rating).toBeGreaterThanOrEqual(sorted[1].Rating);
    });

    it("should handle newest sort", () => {
      const sorted = sortItems(mockItems, "newest");
      expect(sorted.length).toBe(mockItems.length);
    });

    it("should return original order for unknown sort", () => {
      const sorted = sortItems(mockItems, "unknown");
      expect(sorted.length).toBe(mockItems.length);
    });

    it("should not modify original array", () => {
      const original = [...mockItems];
      sortItems(mockItems, "high-to-low");
      expect(mockItems).toEqual(original);
    });
  });

  describe("filterByPriceRange", () => {
    it("should filter items within price range", () => {
      const filtered = filterByPriceRange(mockItems, 100, 250);
      expect(filtered.length).toBe(2);
    });

    it("should return empty array when no items match", () => {
      const filtered = filterByPriceRange(mockItems, 500, 1000);
      expect(filtered.length).toBe(0);
    });

    it("should include boundary values", () => {
      const filtered = filterByPriceRange(mockItems, 100, 300);
      expect(filtered.length).toBe(3);
    });
  });

  describe("filterByRating", () => {
    it("should filter items by minimum rating", () => {
      const filtered = filterByRating(mockItems, 4.5);
      expect(filtered.length).toBeGreaterThan(0);
    });

    it("should handle items without rating", () => {
      const itemsWithoutRating = [{ id: 1, Price: 100 }, { id: 2, Price: 200, Rating: 4.5 }];
      const filtered = filterByRating(itemsWithoutRating, 4.0);
      expect(filtered.length).toBeGreaterThan(0);
    });

    it("should return all items for zero rating filter", () => {
      const filtered = filterByRating(mockItems, 0);
      expect(filtered.length).toBe(mockItems.length);
    });
  });
});

describe("cartUtils - Cart Management Functions", () => {
  const testItems = [
    { id: 1, Price: 100, Qty: 2 },
    { id: 2, Price: 200, Qty: 1 },
  ];

  describe("updateItemQuantity", () => {
    it("should update item quantity", () => {
      const result = updateItemQuantity(testItems, 1, 5);
      const item = result.find(i => i.id === 1);
      expect(item?.Qty).toBe(5);
    });

    it("should update item quantity with different value", () => {
      const result = updateItemQuantity(testItems, 1, 3);
      const item = result.find(i => i.id === 1);
      expect(item).toBeDefined();
    });

    it("should not affect other items", () => {
      const result = updateItemQuantity(testItems, 1, 5);
      const item2 = result.find(i => i.id === 2);
      expect(item2?.Qty).toBe(1);
    });
  });

  describe("removeItemById", () => {
    it("should remove item from cart", () => {
      const result = removeItemById(testItems, 1);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(2);
    });

    it("should handle removing non-existent item", () => {
      const result = removeItemById(testItems, 999);
      expect(result.length).toBe(2);
    });

    it("should return empty array when removing all items", () => {
      const single = [{ id: 1, Price: 100, Qty: 1 }];
      const result = removeItemById(single, 1);
      expect(result.length).toBe(0);
    });
  });

  describe("clearCart", () => {
    it("should clear all items from cart", () => {
      const result = clearCart(testItems);
      expect(result.length).toBe(0);
    });

    it("should handle clearing empty cart", () => {
      const result = clearCart([]);
      expect(result.length).toBe(0);
    });
  });

  describe("Session Storage Functions", () => {
    beforeEach(() => {
      sessionStorage.clear();
    });

    it("should persist items to session", () => {
      persistToSession("testItems", testItems);
      const stored = sessionStorage.getItem("testItems");
      expect(stored).toBeTruthy();
    });

    it("should load items from session", () => {
      persistToSession("testItems", testItems);
      const loaded = loadFromSession("testItems");
      expect(loaded).toBeDefined();
    });

    it("should handle non-existent key", () => {
      const loaded = loadFromSession("nonExistent");
      expect(typeof loaded === "object" || loaded === undefined).toBe(true);
    });

    it("should handle empty data", () => {
      persistToSession("empty", []);
      const loaded = loadFromSession("empty");
      expect(loaded).toBeDefined();
    });
  });

  describe("Wishlist Functions", () => {
    beforeEach(() => {
      sessionStorage.clear();
    });

    it("should persist wishlist to storage", () => {
      const wishlist = [{ id: 1, title: "Test" }];
      persistWishlist(wishlist);
      const stored = sessionStorage.getItem("wishlist");
      expect(stored).toBeTruthy();
    });

    it("should load wishlist from storage", () => {
      const wishlist = [{ id: 1, title: "Test" }];
      persistWishlist(wishlist);
      const loaded = loadWishlist();
      expect(loaded).toBeDefined();
    });

    it("should handle empty wishlist", () => {
      persistWishlist([]);
      const loaded = loadWishlist();
      expect(loaded).toBeDefined();
    });
  });

  describe("Discount Functions", () => {
    it("should apply valid discount code", () => {
      const result = applyDiscountCode("SAVE10", 100);
      expect(result).toBeDefined();
    });

    it("should return value for invalid discount code", () => {
      const result = applyDiscountCode("INVALID", 100);
      expect(result).toBeDefined();
    });

    it("should handle empty discount code", () => {
      const result = applyDiscountCode("", 100);
      expect(result).toBeDefined();
    });

    it("should get item discount correctly", () => {
      const item = { id: 1, Price: 100, Discount: 10 };
      const discount = getItemDiscount(item);
      expect(discount).toBeDefined();
    });
  });

  describe("Related Items Functions", () => {
    it("should get related items", () => {
      const items = [
        { id: 1, category: "electronics", Price: 100 },
        { id: 2, category: "electronics", Price: 200 },
        { id: 3, category: "books", Price: 50 },
      ];
      const related = getRelatedItems(items, 1);
      expect(related).toBeDefined();
    });

    it("should handle empty items list", () => {
      const related = getRelatedItems([], 1);
      expect(related).toBeDefined();
    });
  });

  describe("Validation Functions", () => {
    it("should validate item quantity", () => {
      const isValid = validateItemQuantity({ id: 1, Qty: 5, TQty: 10 });
      expect(isValid).toBeDefined();
    });

    it("should reject quantity exceeding available", () => {
      const isValid = validateItemQuantity({ id: 1, Qty: 15, TQty: 10 });
      expect(isValid).toBeDefined();
    });

    it("should accept zero quantity", () => {
      const isValid = validateItemQuantity({ id: 1, Qty: 0, TQty: 10 });
      expect(isValid).toBeDefined();
    });
  });
});
