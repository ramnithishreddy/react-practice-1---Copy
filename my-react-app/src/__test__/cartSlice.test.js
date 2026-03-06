import cartReducer, {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  setCheckoutItems,
  addToCheckout,
  loadCartFromStorage,
} from "../redux/slices/cartSlice";

describe("cartSlice", () => {
  const mockItem = {
    id: 1,
    name: "Product 1",
    price: 100,
    Qty: 1,
    TQty: 10,
    image: "image1.jpg",
  };

  const mockItem2 = {
    id: 2,
    name: "Product 2",
    price: 50,
    Qty: 2,
    TQty: 5,
    image: "image2.jpg",
  };

  beforeEach(() => {
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  describe("Initial State", () => {
    it("should have the correct initial state", () => {
      const state = cartReducer(undefined, { type: "unknown" });
      expect(state).toEqual({
        cartItems: [],
        checkoutItems: [],
        totalAmount: 0,
        totalQuantity: 0,
      });
    });
  });

  describe("addToCart", () => {
    it("should add a new item to empty cart", () => {
      const state = cartReducer(
        { cartItems: [], checkoutItems: [], totalAmount: 0, totalQuantity: 0 },
        addToCart(mockItem)
      );

      expect(state.cartItems).toHaveLength(1);
      expect(state.cartItems[0]).toEqual({ ...mockItem, Qty: 1 });
      expect(state.totalQuantity).toBe(1);
      expect(state.totalAmount).toBe(100);
    });

    it("should add item with default Qty of 1 when Qty is not provided", () => {
      const itemWithoutQty = { ...mockItem, Qty: undefined };
      const state = cartReducer(
        { cartItems: [], checkoutItems: [], totalAmount: 0, totalQuantity: 0 },
        addToCart(itemWithoutQty)
      );

      expect(state.cartItems[0].Qty).toBe(1);
    });

    it("should increment quantity when adding existing item", () => {
      let state = {
        cartItems: [{ ...mockItem, Qty: 2 }],
        checkoutItems: [],
        totalAmount: 200,
        totalQuantity: 2,
      };

      const addMoreItem = { ...mockItem, Qty: 3 };
      state = cartReducer(state, addToCart(addMoreItem));

      expect(state.cartItems[0].Qty).toBe(5);
      expect(state.totalQuantity).toBe(5);
      expect(state.totalAmount).toBe(500);
    });

    it("should not increment quantity when it exceeds TQty", () => {
      const consoleSpy = jest.spyOn(console, "warn").mockImplementation();
      let state = {
        cartItems: [{ ...mockItem, Qty: 8 }],
        checkoutItems: [],
        totalAmount: 800,
        totalQuantity: 8,
      };

      const addMoreItem = { ...mockItem, Qty: 5 };
      state = cartReducer(state, addToCart(addMoreItem));

      expect(state.cartItems[0].Qty).toBe(8); // Quantity should not change
      expect(state.totalQuantity).toBe(8);
      expect(consoleSpy).toHaveBeenCalledWith("Item is out of stock");

      consoleSpy.mockRestore();
    });

    it("should add multiple different items", () => {
      let state = {
        cartItems: [],
        checkoutItems: [],
        totalAmount: 0,
        totalQuantity: 0,
      };

      state = cartReducer(state, addToCart(mockItem));
      state = cartReducer(state, addToCart(mockItem2));

      expect(state.cartItems).toHaveLength(2);
      expect(state.totalQuantity).toBe(3); // 1 + 2
      expect(state.totalAmount).toBe(200); // (100 * 1) + (50 * 2)
    });

    it("should save cartItems to sessionStorage", () => {
      const state = cartReducer(
        { cartItems: [], checkoutItems: [], totalAmount: 0, totalQuantity: 0 },
        addToCart(mockItem)
      );

      const savedCart = JSON.parse(sessionStorage.getItem("cartItems"));
      expect(savedCart).toEqual(state.cartItems);
    });

    it("should handle item with Qty of 0 and TQty boundary", () => {
      const itemBoundary = { ...mockItem, Qty: 10, TQty: 10 };
      const state = cartReducer(
        { cartItems: [], checkoutItems: [], totalAmount: 0, totalQuantity: 0 },
        addToCart(itemBoundary)
      );

      expect(state.cartItems[0].Qty).toBe(10);
      expect(state.totalQuantity).toBe(10);
    });

    it("should prevent exceeding TQty when adding to existing item at boundary", () => {
      const consoleSpy = jest.spyOn(console, "warn").mockImplementation();
      let state = {
        cartItems: [{ ...mockItem, Qty: 10, TQty: 10 }],
        checkoutItems: [],
        totalAmount: 1000,
        totalQuantity: 10,
      };

      state = cartReducer(state, addToCart({ ...mockItem, Qty: 1 }));

      expect(state.cartItems[0].Qty).toBe(10);
      expect(consoleSpy).toHaveBeenCalledWith("Item is out of stock");

      consoleSpy.mockRestore();
    });
  });

  describe("removeFromCart", () => {
    it("should remove an item from cart", () => {
      let state = {
        cartItems: [{ ...mockItem, Qty: 2 }],
        checkoutItems: [],
        totalAmount: 200,
        totalQuantity: 2,
      };

      state = cartReducer(state, removeFromCart(1));

      expect(state.cartItems).toHaveLength(0);
      expect(state.totalQuantity).toBe(0);
      expect(state.totalAmount).toBe(0);
    });

    it("should remove specific item when multiple items exist", () => {
      let state = {
        cartItems: [
          { ...mockItem, Qty: 2 },
          { ...mockItem2, Qty: 1 },
        ],
        checkoutItems: [],
        totalAmount: 250,
        totalQuantity: 3,
      };

      state = cartReducer(state, removeFromCart(1));

      expect(state.cartItems).toHaveLength(1);
      expect(state.cartItems[0].id).toBe(2);
      expect(state.totalQuantity).toBe(1);
      expect(state.totalAmount).toBe(50);
    });

    it("should save updated cartItems to sessionStorage after removal", () => {
      const savedCart = JSON.parse(sessionStorage.getItem("cartItems"));
      expect(savedCart).toEqual([]);
    });

    it("should handle removing non-existent item gracefully", () => {
      let state = {
        cartItems: [{ ...mockItem, Qty: 1 }],
        checkoutItems: [],
        totalAmount: 100,
        totalQuantity: 1,
      };

      state = cartReducer(state, removeFromCart(999));

      expect(state.cartItems).toHaveLength(1);
      expect(state.totalQuantity).toBe(1);
    });

    it("should recalculate totals correctly after removal", () => {
      let state = {
        cartItems: [
          { ...mockItem, Qty: 3 },
          { ...mockItem2, Qty: 2 },
        ],
        checkoutItems: [],
        totalAmount: 400,
        totalQuantity: 5,
      };

      state = cartReducer(state, removeFromCart(2));

      expect(state.totalAmount).toBe(300);
      expect(state.totalQuantity).toBe(3);
    });
  });

  describe("updateCartItemQuantity", () => {
    it("should update quantity of existing item", () => {
      let state = {
        cartItems: [{ ...mockItem, Qty: 2 }],
        checkoutItems: [],
        totalAmount: 200,
        totalQuantity: 2,
      };

      state = cartReducer(
        state,
        updateCartItemQuantity({ itemId: 1, quantity: 5 })
      );

      expect(state.cartItems[0].Qty).toBe(5);
      expect(state.totalQuantity).toBe(5);
      expect(state.totalAmount).toBe(500);
    });

    it("should not update quantity if it exceeds TQty", () => {
      let state = {
        cartItems: [{ ...mockItem, Qty: 2, TQty: 5 }],
        checkoutItems: [],
        totalAmount: 200,
        totalQuantity: 2,
      };

      state = cartReducer(
        state,
        updateCartItemQuantity({ itemId: 1, quantity: 10 })
      );

      expect(state.cartItems[0].Qty).toBe(2); // Should not change
      expect(state.totalQuantity).toBe(2);
    });

    it("should not update quantity if it is 0 or negative", () => {
      let state = {
        cartItems: [{ ...mockItem, Qty: 2 }],
        checkoutItems: [],
        totalAmount: 200,
        totalQuantity: 2,
      };

      state = cartReducer(
        state,
        updateCartItemQuantity({ itemId: 1, quantity: 0 })
      );

      expect(state.cartItems[0].Qty).toBe(2); // Should not change
    });

    it("should not update if item does not exist", () => {
      let state = {
        cartItems: [{ ...mockItem, Qty: 2 }],
        checkoutItems: [],
        totalAmount: 200,
        totalQuantity: 2,
      };

      state = cartReducer(
        state,
        updateCartItemQuantity({ itemId: 999, quantity: 5 })
      );

      expect(state.cartItems[0].Qty).toBe(2); // Should not change
      expect(state.totalQuantity).toBe(2);
    });

    it("should save updated cartItems to sessionStorage", () => {
      const savedCart = JSON.parse(sessionStorage.getItem("cartItems"));
      expect(savedCart[0].Qty).toBe(5);
    });

    it("should update quantity to TQty boundary", () => {
      let state = {
        cartItems: [{ ...mockItem, Qty: 1, TQty: 10 }],
        checkoutItems: [],
        totalAmount: 100,
        totalQuantity: 1,
      };

      state = cartReducer(
        state,
        updateCartItemQuantity({ itemId: 1, quantity: 10 })
      );

      expect(state.cartItems[0].Qty).toBe(10);
      expect(state.totalAmount).toBe(1000);
    });

    it("should handle negative quantities gracefully", () => {
      let state = {
        cartItems: [{ ...mockItem, Qty: 5 }],
        checkoutItems: [],
        totalAmount: 500,
        totalQuantity: 5,
      };

      state = cartReducer(
        state,
        updateCartItemQuantity({ itemId: 1, quantity: -5 })
      );

      expect(state.cartItems[0].Qty).toBe(5); // Should not change
    });

    it("should recalculate totals when updating multiple items", () => {
      let state = {
        cartItems: [
          { ...mockItem, Qty: 2 },
          { ...mockItem2, Qty: 1 },
        ],
        checkoutItems: [],
        totalAmount: 250,
        totalQuantity: 3,
      };

      state = cartReducer(
        state,
        updateCartItemQuantity({ itemId: 2, quantity: 3 })
      );

      expect(state.cartItems[1].Qty).toBe(3);
      expect(state.totalQuantity).toBe(5);
      expect(state.totalAmount).toBe(350);
    });
  });

  describe("clearCart", () => {
    it("should clear all items from cart", () => {
      let state = {
        cartItems: [{ ...mockItem, Qty: 2 }],
        checkoutItems: [],
        totalAmount: 200,
        totalQuantity: 2,
      };

      state = cartReducer(state, clearCart());

      expect(state.cartItems).toHaveLength(0);
      expect(state.totalQuantity).toBe(0);
      expect(state.totalAmount).toBe(0);
    });

    it("should remove cartItems from sessionStorage", () => {
      let state = {
        cartItems: [{ ...mockItem, Qty: 1 }],
        checkoutItems: [],
        totalAmount: 100,
        totalQuantity: 1,
      };

      sessionStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      state = cartReducer(state, clearCart());

      expect(sessionStorage.getItem("cartItems")).toBeNull();
    });

    it("should handle clearing already empty cart", () => {
      const state = cartReducer(
        { cartItems: [], checkoutItems: [], totalAmount: 0, totalQuantity: 0 },
        clearCart()
      );

      expect(state.cartItems).toHaveLength(0);
      expect(state.totalQuantity).toBe(0);
    });
  });

  describe("setCheckoutItems", () => {
    it("should set checkout items", () => {
      const checkoutItems = [{ ...mockItem, Qty: 2 }];
      const state = cartReducer(
        { cartItems: [], checkoutItems: [], totalAmount: 0, totalQuantity: 0 },
        setCheckoutItems(checkoutItems)
      );

      expect(state.checkoutItems).toEqual(checkoutItems);
    });

    it("should replace existing checkout items", () => {
      let state = {
        cartItems: [],
        checkoutItems: [{ ...mockItem, Qty: 1 }],
        totalAmount: 0,
        totalQuantity: 0,
      };

      const newCheckoutItems = [
        { ...mockItem, Qty: 2 },
        { ...mockItem2, Qty: 1 },
      ];
      state = cartReducer(state, setCheckoutItems(newCheckoutItems));

      expect(state.checkoutItems).toEqual(newCheckoutItems);
      expect(state.checkoutItems).toHaveLength(2);
    });

    it("should set checkout items to empty array", () => {
      let state = {
        cartItems: [],
        checkoutItems: [{ ...mockItem, Qty: 1 }],
        totalAmount: 0,
        totalQuantity: 0,
      };

      state = cartReducer(state, setCheckoutItems([]));

      expect(state.checkoutItems).toEqual([]);
    });
  });

  describe("addToCheckout", () => {
    it("should add new item to checkout", () => {
      let state = {
        cartItems: [],
        checkoutItems: [],
        totalAmount: 0,
        totalQuantity: 0,
      };

      state = cartReducer(state, addToCheckout(mockItem));

      expect(state.checkoutItems).toHaveLength(1);
      expect(state.checkoutItems[0]).toEqual(mockItem);
    });

    it("should increment quantity when adding existing checkout item", () => {
      let state = {
        cartItems: [],
        checkoutItems: [{ ...mockItem, Qty: 2 }],
        totalAmount: 0,
        totalQuantity: 0,
      };

      const addMoreItem = { ...mockItem, Qty: 3 };
      state = cartReducer(state, addToCheckout(addMoreItem));

      expect(state.checkoutItems[0].Qty).toBe(5);
      expect(state.checkoutItems).toHaveLength(1);
    });

    it("should add multiple different items to checkout", () => {
      let state = {
        cartItems: [],
        checkoutItems: [],
        totalAmount: 0,
        totalQuantity: 0,
      };

      state = cartReducer(state, addToCheckout(mockItem));
      state = cartReducer(state, addToCheckout(mockItem2));

      expect(state.checkoutItems).toHaveLength(2);
      expect(state.checkoutItems[0].id).toBe(1);
      expect(state.checkoutItems[1].id).toBe(2);
    });

    it("should add item with default Qty of 1 when Qty is not provided", () => {
      let state = {
        cartItems: [],
        checkoutItems: [],
        totalAmount: 0,
        totalQuantity: 0,
      };

      const itemWithoutQty = { ...mockItem, Qty: undefined };
      state = cartReducer(state, addToCheckout(itemWithoutQty));

      expect(state.checkoutItems[0].Qty).toBe(1);
    });
  });

  describe("loadCartFromStorage", () => {
    it("should load cart items from sessionStorage", () => {
      const savedItems = [
        { ...mockItem, Qty: 2 },
        { ...mockItem2, Qty: 1 },
      ];
      sessionStorage.setItem("cartItems", JSON.stringify(savedItems));

      const state = cartReducer(
        { cartItems: [], checkoutItems: [], totalAmount: 0, totalQuantity: 0 },
        loadCartFromStorage()
      );

      expect(state.cartItems).toEqual(savedItems);
      expect(state.totalQuantity).toBe(3);
      expect(state.totalAmount).toBe(250);
    });

    it("should handle empty sessionStorage gracefully", () => {
      sessionStorage.removeItem("cartItems");
      const state = cartReducer(
        { cartItems: [], checkoutItems: [], totalAmount: 0, totalQuantity: 0 },
        loadCartFromStorage()
      );

      expect(state.cartItems).toEqual([]);
      expect(state.totalQuantity).toBe(0);
      expect(state.totalAmount).toBe(0);
    });

    it("should calculate totals correctly when loading from storage", () => {
      const savedItems = [
        { ...mockItem, Qty: 3, price: 100 },
        { ...mockItem2, Qty: 2, price: 50 },
      ];
      sessionStorage.setItem("cartItems", JSON.stringify(savedItems));

      const state = cartReducer(
        { cartItems: [], checkoutItems: [], totalAmount: 0, totalQuantity: 0 },
        loadCartFromStorage()
      );

      expect(state.totalQuantity).toBe(5);
      expect(state.totalAmount).toBe(400);
    });

    it("should overwrite existing cart when loading from storage", () => {
      const existingCart = [
        { ...mockItem, Qty: 1 },
      ];
      const savedItems = [
        { ...mockItem2, Qty: 3 },
      ];
      sessionStorage.setItem("cartItems", JSON.stringify(savedItems));

      let state = {
        cartItems: existingCart,
        checkoutItems: [],
        totalAmount: 100,
        totalQuantity: 1,
      };

      state = cartReducer(state, loadCartFromStorage());

      expect(state.cartItems).toEqual(savedItems);
      expect(state.totalQuantity).toBe(3);
      expect(state.totalAmount).toBe(150);
    });

    it("should not update if no items in sessionStorage", () => {
      sessionStorage.removeItem("cartItems");
      const state = cartReducer(
        { 
          cartItems: [{ ...mockItem, Qty: 1 }],
          checkoutItems: [],
          totalAmount: 100,
          totalQuantity: 1,
        },
        loadCartFromStorage()
      );

      // If no saved cart, state should remain unchanged
      expect(state.cartItems).toEqual([{ ...mockItem, Qty: 1 }]);
    });
  });

  describe("Complex Scenarios", () => {
    it("should handle complete shopping flow", () => {
      let state = {
        cartItems: [],
        checkoutItems: [],
        totalAmount: 0,
        totalQuantity: 0,
      };

      // Add items
      state = cartReducer(state, addToCart(mockItem));
      state = cartReducer(state, addToCart(mockItem2));
      expect(state.totalQuantity).toBe(3);
      expect(state.totalAmount).toBe(200);

      // Update quantity
      state = cartReducer(
        state,
        updateCartItemQuantity({ itemId: 1, quantity: 5 })
      );
      expect(state.totalAmount).toBe(600);

      // Move to checkout
      state = cartReducer(state, setCheckoutItems(state.cartItems));
      expect(state.checkoutItems).toHaveLength(2);

      // Clear cart
      state = cartReducer(state, clearCart());
      expect(state.cartItems).toHaveLength(0);
      expect(state.totalQuantity).toBe(0);
    });

    it("should handle persistence across actions", () => {
      let state = {
        cartItems: [],
        checkoutItems: [],
        totalAmount: 0,
        totalQuantity: 0,
      };

      state = cartReducer(state, addToCart(mockItem));
      state = cartReducer(state, addToCart(mockItem2));
      state = cartReducer(state, loadCartFromStorage());

      expect(state.cartItems).toBeDefined();
      expect(state.totalQuantity).toBe(3);
    });

    it("should maintain data integrity with mixed operations", () => {
      let state = {
        cartItems: [],
        checkoutItems: [],
        totalAmount: 0,
        totalQuantity: 0,
      };

      state = cartReducer(state, addToCart({ ...mockItem, Qty: 2 }));
      state = cartReducer(state, addToCart({ ...mockItem2, Qty: 1 }));
      state = cartReducer(
        state,
        updateCartItemQuantity({ itemId: 1, quantity: 3 })
      );
      state = cartReducer(state, removeFromCart(2));

      expect(state.cartItems).toHaveLength(1);
      expect(state.cartItems[0].id).toBe(1);
      expect(state.cartItems[0].Qty).toBe(3);
      expect(state.totalAmount).toBe(300);
    });
  });
});
