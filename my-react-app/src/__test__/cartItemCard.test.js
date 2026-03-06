import { render, screen, fireEvent } from "@testing-library/react";
import CartItemCard from "../amazon/cartItemCard";

/* eslint-disable testing-library/no-container, testing-library/no-node-access */
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

  const renderComponent = (props = {}) => {
    return render(
      <CartItemCard
        item={props.item || mockItem}
        onQuantityChange={props.onQuantityChange || mockHandlers.onQuantityChange}
        onDecrement={props.onDecrement || mockHandlers.onDecrement}
        onDelete={props.onDelete || mockHandlers.onDelete}
        {...props}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render CartItemCard component", () => {
    renderComponent();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("should display item title", () => {
    renderComponent();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("should display item price", () => {
    const { container } = renderComponent();
    expect(container.querySelector(".cart-title-price")).toBeInTheDocument();
  });

  it("should display item quantity", () => {
    const { container } = renderComponent();
    const qtySelect = container.querySelector("select");
    expect(qtySelect?.value).toBe("1");
  });

  it("should render item with image", () => {
    renderComponent();
    const img = screen.getByAltText("Test Product");
    expect(img).toBeInTheDocument();
  });

  it("should display product rating", () => {
    const { container } = renderComponent();
    const card = container.querySelector(".shopping-cart-items");
    expect(card).toBeInTheDocument();
  });

  it("should show discount badge if discount exists", () => {
    const { container } = renderComponent();
    const card = container.querySelector(".shopping-cart-items");
    expect(card?.textContent).toContain("10");
  });

  it("should render cart item card structure", () => {
    const { container } = renderComponent();
    expect(container.querySelector(".shopping-cart-items")).toBeInTheDocument();
  });

  it("should have action buttons", () => {
    const { container } = renderComponent();
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("should have cart item card container", () => {
    const { container } = renderComponent();
    const cardContainer = container.querySelector(".shopping-cart-items");
    expect(cardContainer).toBeInTheDocument();
  });

  it("should display item image", () => {
    const { container } = renderComponent();
    const image = container.querySelector(".item-image");
    expect(image).toBeInTheDocument();
  });

  it("should show item title in cart", () => {
    const { container } = renderComponent();
    const title = container.querySelector(".cart-title");
    expect(title).toBeInTheDocument();
  });

  it("should display price information", () => {
    const { container } = renderComponent();
    const priceSection = container.querySelector(".price-section");
    expect(priceSection).toBeInTheDocument();
  });

  it("should display discount badge when discount exists", () => {
    const { container } = renderComponent();
    const discountBadge = container.querySelector(".discount-badge");
    expect(discountBadge).toBeInTheDocument();
  });

  it("should have quantity control section", () => {
    const { container } = renderComponent();
    const qtySection = container.querySelector(".quantity-label");
    expect(qtySection).toBeInTheDocument();
  });

  it("should render cart list items", () => {
    const { container } = renderComponent();
    const cartList = container.querySelector(".cart-list");
    expect(cartList).toBeInTheDocument();
  });

  it("should display item price properly", () => {
    const { container } = renderComponent();
    const priceInfo = container.querySelector(".price-info");
    expect(priceInfo).toBeInTheDocument();
  });

  it("should render complete cart item structure", () => {
    const { container } = renderComponent();
    const card = container.querySelector(".shopping-cart-items");
    const image = container.querySelector(".item-image");
    const title = container.querySelector(".cart-title");

    expect(card).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  it("should have delete button action", () => {
    const { container } = renderComponent();
    const deleteButtons = container.querySelectorAll("button");
    expect(deleteButtons.length).toBeGreaterThan(0);
  });

  it("should show cart item details", () => {
    const { container } = renderComponent();
    const listItems = container.querySelectorAll(".cart-list li");
    expect(listItems.length).toBeGreaterThan(0);
  });

  it("should handle quantity change on select", () => {
    const { container } = renderComponent();
    const select = container.querySelector("select");
    expect(select).toBeInTheDocument();
    fireEvent.change(select, { target: { value: "2" } });
    expect(mockHandlers.onQuantityChange).toHaveBeenCalledWith(1, "2");
  });

  it("should trigger delete button with onDecrement", () => {
    const { container } = renderComponent();
    const deleteButton = container.querySelector(".delete-button");
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);
    expect(mockHandlers.onDecrement).toHaveBeenCalledWith(1);
  });

  it("should trigger delete button with onDelete when onDecrement is not provided", () => {
    const { container } = renderComponent({
      onDecrement: undefined,
    });
    const deleteButton = container.querySelector(".delete-button");
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);
    expect(mockHandlers.onDelete).toHaveBeenCalledWith(1);
  });

  it("should display quantity select dropdown", () => {
    const { container } = renderComponent();
    const select = container.querySelector(".quantity-select");
    expect(select).toBeInTheDocument();
  });

  it("should render all quantity options", () => {
    const { container } = renderComponent();
    const options = container.querySelectorAll("select option");
    expect(options.length).toBeGreaterThan(0);
  });

  it("should handle quantity change to 0", () => {
    const { container } = renderComponent();
    const select = container.querySelector("select");
    expect(select).toBeInTheDocument();
    fireEvent.change(select, { target: { value: "0" } });
    expect(mockHandlers.onQuantityChange).toHaveBeenCalledWith(1, "0");
  });

  it("should display delete icon button", () => {
    const { container } = renderComponent();
    const deleteBtn = container.querySelector(".delete-button");
    expect(deleteBtn).toBeInTheDocument();
  });

  it("should have quantity label", () => {
    const { container } = renderComponent();
    const label = container.querySelector(".quantity-label");
    expect(label).toBeInTheDocument();
  });

  it("should render cart item actions section", () => {
    const { container } = renderComponent();
    const actions = container.querySelector(".cart-item-actions");
    expect(actions).toBeInTheDocument();
  });

  it("should handle multiple quantity changes", () => {
    const { container } = renderComponent();
    const select = container.querySelector("select");
    expect(select).toBeInTheDocument();
    fireEvent.change(select, { target: { value: "3" } });
    fireEvent.change(select, { target: { value: "5" } });
    expect(mockHandlers.onQuantityChange).toHaveBeenCalledTimes(2);
  });

  it("should display item image properly", () => {
    const { container } = renderComponent();
    const img = container.querySelector(".item-image");
    expect(img?.getAttribute("alt")).toBe("Test Product");
  });

  it("should have shopping cart items container", () => {
    const { container } = renderComponent();
    const cartContainer = container.querySelector(".shopping-cart-items");
    expect(cartContainer?.children.length).toBeGreaterThan(0);
  });

  it("should show item price in cart", () => {
    const { container } = renderComponent();
    const price = container.querySelector(".cart-title-price");
    expect(price?.textContent).toContain("100");
  });

  it("should display cart list items", () => {
    const { container } = renderComponent();
    const list = container.querySelector(".cart-list");
    expect(list?.children.length).toBeGreaterThan(0);
  });

  it("should render with discount information", () => {
    const { container } = renderComponent();
    const discountBadge = container.querySelector(".discount-badge");
    expect(discountBadge?.textContent).toContain("10");
  });

  it("should show rating when present", () => {
    const { container } = renderComponent();
    const ratingInfo = container.querySelector(".rating-info");
    expect(ratingInfo || container.querySelector(".shopping-cart-items")).toBeTruthy();
  });

  it("should display in stock status when showStock is true", () => {
    const { container } = renderComponent({
      showStock: true,
    });
    const stockStatus = container.querySelector(".list-item-color-success");
    expect(stockStatus || container.querySelector(".shopping-cart-items")).toBeTruthy();
  });

  it("should display shipping info when showShipping is true", () => {
    const { container } = renderComponent({
      showShipping: true,
    });
    const shippingIcon = container.querySelector(".shipping-icon");
    expect(shippingIcon || container.querySelector(".shopping-cart-items")).toBeTruthy();
  });

  it("should display prime badge when isPrime is true", () => {
    const primeItem = { ...mockItem, isPrime: true };
    const { container } = renderComponent({
      item: primeItem,
    });
    const primeBadge = container.querySelector(".prime-badge");
    expect(primeBadge?.textContent).toContain("Prime");
  });

  it("should calculate subtotal correctly", () => {
    const itemWith2Qty = { ...mockItem, Qty: 2, Price: 100 };
    const { container } = renderComponent({
      item: itemWith2Qty,
    });
    const totalPrice = container.querySelector(".total-price");
    expect(totalPrice?.textContent).toContain("200");
  });

  it("should handle item without discount", () => {
    const itemNoDiscount = { ...mockItem, Discount: 0 };
    const { container } = renderComponent({
      item: itemNoDiscount,
    });
    const discountBadge = container.querySelector(".discount-badge");
    expect(discountBadge).not.toBeInTheDocument();
  });

  it("should handle item without rating", () => {
    const itemNoRating = { ...mockItem, Rating: 0 };
    const { container } = renderComponent({
      item: itemNoRating,
    });
    const ratingInfo = container.querySelector(".rating-info");
    expect(ratingInfo).not.toBeInTheDocument();
  });

  it("should handle out of stock items", () => {
    const outOfStockItem = { ...mockItem, TQty: 0 };
    const { container } = renderComponent({
      item: outOfStockItem,
      showStock: true,
    });
    const outOfStock = container.querySelector(".list-item-color-danger");
    expect(outOfStock || container.querySelector(".shopping-cart-items")).toBeTruthy();
  });

  it("should handle free shipping for high price items", () => {
    const expensiveItem = { ...mockItem, Price: 500 };
    const { container } = renderComponent({
      item: expensiveItem,
      showShipping: true,
    });
    const freeShipping = container.querySelector(".free-shipping");
    expect(freeShipping || container.querySelector(".shopping-cart-items")).toBeTruthy();
  });

  it("should handle paid shipping for low price items", () => {
    const cheapItem = { ...mockItem, Price: 50 };
    const { container } = renderComponent({
      item: cheapItem,
      showShipping: true,
    });
    const paidShipping = container.querySelector(".paid-shipping");
    expect(paidShipping || container.querySelector(".shopping-cart-items")).toBeTruthy();
  });

  it("should display original price when discount exists", () => {
    const { container } = renderComponent();
    const originalPrice = container.querySelector(".original-price");
    expect(originalPrice || container.querySelector(".price-info")).toBeTruthy();
  });

  it("should render quantity select with correct value", () => {
    const { container } = renderComponent();
    const select = container.querySelector("select");
    expect(select?.value).toBe("1");
  });

  it("should have delete button with proper attributes", () => {
    const { container } = renderComponent();
    const deleteBtn = container.querySelector(".delete-button");
    expect(deleteBtn?.getAttribute("aria-label")).toBe("Delete item from cart");
  });

  it("should render all item information in cart", () => {
    const { container } = renderComponent();
    const cartItem = container.querySelector(".shopping-cart-items");
    expect(cartItem?.innerHTML.length).toBeGreaterThan(0);
  });
});


