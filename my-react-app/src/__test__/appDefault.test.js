import {
  BUY_NOW_TITLE,
  CART_TITLE,
  CART_MESSAGE,
  PRICE_TITLE,
  QTY_TITLE,
  TOTAL_TITLE,
  CHECKOUT_TITLE,
  CHECKOUT_MESSAGE,
  PAYMENT_STATUS,
  ORDER_BUTTON,
  LEFT_FILTER_BUTTON,
  RIGHT_FILTER_BUTTON,
  CART_BUTTON,
  ITEM_MESSAGE,
  GROCERY,
  FASHION,
  MOBILES,
  FREE_SHIPPING_THRESHOLD,
  FREE_SHIPPING_TEXT,
  PAID_SHIPPING_TEXT,
  IN_STOCK,
} from "../amazon/appDefault";

describe("appDefault Constants", () => {
  describe("UI Text Constants", () => {
    it("should have BUY_NOW_TITLE", () => {
      expect(BUY_NOW_TITLE).toBe("Buy Now");
    });

    it("should have CART_TITLE", () => {
      expect(CART_TITLE).toBe("Shopping Cart");
    });

    it("should have CART_MESSAGE", () => {
      expect(typeof CART_MESSAGE).toBe("string");
      expect(CART_MESSAGE.length).toBeGreaterThan(0);
    });

    it("should have PRICE_TITLE", () => {
      expect(PRICE_TITLE).toBe("Price:");
    });

    it("should have QTY_TITLE", () => {
      expect(QTY_TITLE).toBe("Qty:");
    });

    it("should have TOTAL_TITLE", () => {
      expect(TOTAL_TITLE).toBe("Subtotal");
    });

    it("should have CHECKOUT_TITLE", () => {
      expect(CHECKOUT_TITLE).toBe("Checkout Items");
    });

    it("should have ORDER_BUTTON", () => {
      expect(ORDER_BUTTON).toBe("Place Order");
    });
  });

  describe("Category Constants", () => {
    it("should have GROCERY category", () => {
      expect(GROCERY).toBe("Grocery");
    });

    it("should have MOBILES category", () => {
      expect(MOBILES).toBe("Mobiles");
    });

    it("should have FASHION category", () => {
      expect(FASHION).toBe("Fashion");
    });

    it("should have string category values", () => {
      expect(typeof GROCERY).toBe("string");
      expect(typeof MOBILES).toBe("string");
      expect(typeof FASHION).toBe("string");
    });
  });

  describe("Filter Button Constants", () => {
    it("should have LEFT_FILTER_BUTTON", () => {
      expect(LEFT_FILTER_BUTTON).toBe("Low to High");
    });

    it("should have RIGHT_FILTER_BUTTON", () => {
      expect(RIGHT_FILTER_BUTTON).toBe("High to Low");
    });

    it("should have CART_BUTTON", () => {
      expect(CART_BUTTON).toBe("Add to Cart");
    });
  });

  describe("Shipping Constants", () => {
    it("should have FREE_SHIPPING_THRESHOLD", () => {
      expect(typeof FREE_SHIPPING_THRESHOLD).toBe("number");
      expect(FREE_SHIPPING_THRESHOLD).toBe(500);
    });

    it("should have FREE_SHIPPING_TEXT", () => {
      expect(typeof FREE_SHIPPING_TEXT).toBe("string");
      expect(FREE_SHIPPING_TEXT).toBeTruthy();
    });

    it("should have PAID_SHIPPING_TEXT", () => {
      expect(typeof PAID_SHIPPING_TEXT).toBe("string");
      expect(PAID_SHIPPING_TEXT).toBeTruthy();
    });

    it("should have IN_STOCK constant", () => {
      expect(IN_STOCK).toBe("In stock");
    });
  });

  describe("Status Constants", () => {
    it("should have PAYMENT_STATUS", () => {
      expect(PAYMENT_STATUS).toBe("Processing...");
    });

    it("should have ITEM_MESSAGE", () => {
      expect(typeof ITEM_MESSAGE).toBe("string");
    });
  });
});
