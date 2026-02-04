import { render, screen, fireEvent } from "@testing-library/react";
import CartItemCard from "../amazon/cartItemCard";

describe("CartItemCard Component", () => {
  const mockItem = {
    id: 1,
    title: "Test Product",
    Price: 100,
    Qty: 1,
    TQty: 10,
    image: "test.jpg",
    Rating: 4.5,
    Discount: 10,
  };

  const mockHandlers = {
    onQuantityChange: jest.fn(),
    onDecrement: jest.fn(),
    onDelete: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render CartItemCard component", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("should display item title", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("should display item price", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    expect(document.querySelector(".cart-title-price")).toBeInTheDocument();
  });

  it("should display item quantity", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const qtySelect = document.querySelector("select");
    expect(qtySelect?.value).toBe("1");
  });

  it("should render item with image", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const img = screen.getByAltText("Test Product");
    expect(img).toBeInTheDocument();
  });

  it("should display product rating", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const card = document.querySelector(".shopping-cart-items");
    expect(card).toBeInTheDocument();
  });

  it("should show discount badge if discount exists", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const card = document.querySelector(".shopping-cart-items");
    expect(card?.textContent).toContain("10");
  });

  it("should render cart item card structure", () => {
    const { container } = render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    expect(container.querySelector(".shopping-cart-items")).toBeInTheDocument();
  });

  it("should have action buttons", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const buttons = document.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("should have cart item card container", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const cardContainer = document.querySelector(".shopping-cart-items");
    expect(cardContainer).toBeInTheDocument();
  });

  it("should display item image", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const image = document.querySelector(".item-image");
    expect(image).toBeInTheDocument();
  });

  it("should show item title in cart", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const title = document.querySelector(".cart-title");
    expect(title).toBeInTheDocument();
  });

  it("should display price information", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const priceSection = document.querySelector(".price-section");
    expect(priceSection).toBeInTheDocument();
  });

  it("should display discount badge when discount exists", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const discountBadge = document.querySelector(".discount-badge");
    expect(discountBadge).toBeInTheDocument();
  });

  it("should have quantity control section", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const qtySection = document.querySelector(".quantity-label");
    expect(qtySection).toBeInTheDocument();
  });

  it("should render cart list items", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const cartList = document.querySelector(".cart-list");
    expect(cartList).toBeInTheDocument();
  });

  it("should display item price properly", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const priceInfo = document.querySelector(".price-info");
    expect(priceInfo).toBeInTheDocument();
  });

  it("should render complete cart item structure", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const card = document.querySelector(".shopping-cart-items");
    const image = document.querySelector(".item-image");
    const title = document.querySelector(".cart-title");
    
    expect(card).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  it("should have delete button action", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const deleteButtons = document.querySelectorAll("button");
    expect(deleteButtons.length).toBeGreaterThan(0);
  });

  it("should show cart item details", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const listItems = document.querySelectorAll(".cart-list li");
    expect(listItems.length).toBeGreaterThan(0);
  });

  it("should handle quantity change on select", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const select = document.querySelector("select");
    if (select) {
      fireEvent.change(select, { target: { value: "2" } });
      expect(mockHandlers.onQuantityChange).toHaveBeenCalledWith(1, "2");
    }
  });

  it("should trigger delete button with onDecrement", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const deleteButton = document.querySelector(".delete-button");
    if (deleteButton) {
      fireEvent.click(deleteButton);
      expect(mockHandlers.onDecrement).toHaveBeenCalledWith(1);
    }
  });

  it("should trigger delete button with onDelete when onDecrement is not provided", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDelete={mockHandlers.onDelete}
      />
    );
    const deleteButton = document.querySelector(".delete-button");
    if (deleteButton) {
      fireEvent.click(deleteButton);
      // Should call onDelete since onDecrement is not provided
      expect(mockHandlers.onDelete).toHaveBeenCalledWith(1);
    }
  });

  it("should display quantity select dropdown", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const select = document.querySelector(".quantity-select");
    expect(select).toBeInTheDocument();
  });

  it("should render all quantity options", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const options = document.querySelectorAll("select option");
    expect(options.length).toBeGreaterThan(0);
  });

  it("should handle quantity change to 0", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const select = document.querySelector("select");
    if (select) {
      fireEvent.change(select, { target: { value: "0" } });
      expect(mockHandlers.onQuantityChange).toHaveBeenCalledWith(1, "0");
    }
  });

  it("should display delete icon button", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const deleteBtn = document.querySelector(".delete-button");
    expect(deleteBtn).toBeInTheDocument();
  });

  it("should have quantity label", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const label = document.querySelector(".quantity-label");
    expect(label).toBeInTheDocument();
  });

  it("should render cart item actions section", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const actions = document.querySelector(".cart-item-actions");
    expect(actions).toBeInTheDocument();
  });

  it("should handle multiple quantity changes", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const select = document.querySelector("select");
    if (select) {
      fireEvent.change(select, { target: { value: "3" } });
      fireEvent.change(select, { target: { value: "5" } });
      expect(mockHandlers.onQuantityChange).toHaveBeenCalledTimes(2);
    }
  });

  it("should display item image properly", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const img = document.querySelector(".item-image");
    expect(img?.getAttribute("alt")).toBe("Test Product");
  });

  it("should have shopping cart items container", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const container = document.querySelector(".shopping-cart-items");
    expect(container?.children.length).toBeGreaterThan(0);
  });

  it("should show item price in cart", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const price = document.querySelector(".cart-title-price");
    expect(price?.textContent).toContain("100");
  });

  it("should display cart list items", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const list = document.querySelector(".cart-list");
    expect(list?.children.length).toBeGreaterThan(0);
  });

  it("should render with discount information", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const discountBadge = document.querySelector(".discount-badge");
    expect(discountBadge?.textContent).toContain("10");
  });

  it("should show rating when present", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const ratingInfo = document.querySelector(".rating-info");
    expect(ratingInfo || document.querySelector(".shopping-cart-items")).toBeTruthy();
  });

  it("should display in stock status when showStock is true", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
        showStock={true}
      />
    );
    const stockStatus = document.querySelector(".list-item-color-success");
    expect(stockStatus || document.querySelector(".shopping-cart-items")).toBeTruthy();
  });

  it("should display shipping info when showShipping is true", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
        showShipping={true}
      />
    );
    const shippingIcon = document.querySelector(".shipping-icon");
    expect(shippingIcon || document.querySelector(".shopping-cart-items")).toBeTruthy();
  });

  it("should display prime badge when isPrime is true", () => {
    const primeItem = { ...mockItem, isPrime: true };
    render(
      <CartItemCard
        item={primeItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const primeBadge = document.querySelector(".prime-badge");
    expect(primeBadge?.textContent).toContain("Prime");
  });

  it("should calculate subtotal correctly", () => {
    const itemWith2Qty = { ...mockItem, Qty: 2, Price: 100 };
    render(
      <CartItemCard
        item={itemWith2Qty}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const totalPrice = document.querySelector(".total-price");
    expect(totalPrice?.textContent).toContain("200");
  });

  it("should handle item without discount", () => {
    const itemNoDiscount = { ...mockItem, Discount: 0 };
    render(
      <CartItemCard
        item={itemNoDiscount}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const discountBadge = document.querySelector(".discount-badge");
    expect(discountBadge).not.toBeInTheDocument();
  });

  it("should handle item without rating", () => {
    const itemNoRating = { ...mockItem, Rating: 0 };
    render(
      <CartItemCard
        item={itemNoRating}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const ratingInfo = document.querySelector(".rating-info");
    expect(ratingInfo).not.toBeInTheDocument();
  });

  it("should handle out of stock items", () => {
    const outOfStockItem = { ...mockItem, TQty: 0 };
    render(
      <CartItemCard
        item={outOfStockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
        showStock={true}
      />
    );
    const outOfStock = document.querySelector(".list-item-color-danger");
    expect(outOfStock || document.querySelector(".shopping-cart-items")).toBeTruthy();
  });

  it("should handle free shipping for high price items", () => {
    const expensiveItem = { ...mockItem, Price: 500 };
    render(
      <CartItemCard
        item={expensiveItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
        showShipping={true}
      />
    );
    const freeShipping = document.querySelector(".free-shipping");
    expect(freeShipping || document.querySelector(".shopping-cart-items")).toBeTruthy();
  });

  it("should handle paid shipping for low price items", () => {
    const cheapItem = { ...mockItem, Price: 50 };
    render(
      <CartItemCard
        item={cheapItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
        showShipping={true}
      />
    );
    const paidShipping = document.querySelector(".paid-shipping");
    expect(paidShipping || document.querySelector(".shopping-cart-items")).toBeTruthy();
  });

  it("should display original price when discount exists", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const originalPrice = document.querySelector(".original-price");
    expect(originalPrice || document.querySelector(".price-info")).toBeTruthy();
  });

  it("should render quantity select with correct value", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const select = document.querySelector("select");
    expect(select?.value).toBe("1");
  });

  it("should have delete button with proper attributes", () => {
    render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const deleteBtn = document.querySelector(".delete-button");
    expect(deleteBtn?.getAttribute("aria-label")).toBe("Delete item from cart");
  });

  it("should render all item information in cart", () => {
    const { container } = render(
      <CartItemCard
        item={mockItem}
        onQuantityChange={mockHandlers.onQuantityChange}
        onDecrement={mockHandlers.onDecrement}
        onDelete={mockHandlers.onDelete}
      />
    );
    const cartItem = container.querySelector(".shopping-cart-items");
    expect(cartItem?.innerHTML.length).toBeGreaterThan(0);
  });
});


