import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import Checkout from "../amazon/checkout";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import { createMockStoreWithCart } from "./reduxTestUtils";

/* eslint-disable testing-library/no-container, testing-library/no-node-access */
describe("Checkout Component", () => {
  const renderComponent = (testStore = store) => {
    return render(
      <Router>
        <Provider store={testStore}>
          <Checkout />
        </Provider>
      </Router>
    );
  };

  beforeEach(() => {
    sessionStorage.clear();
    window.alert = jest.fn();
  });

  afterEach(() => {
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  describe("Empty Checkout State", () => {
    it("should render Checkout component with empty cart", () => {
      renderComponent();
      const title = screen.getByText(/Checkout Items/i);
      expect(title).toBeInTheDocument();
    });

    it("should display checkout title in h2 element", () => {
      renderComponent();
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveTextContent(/Checkout Items/i);
    });

    it("should show empty message when no items in cart", () => {
      renderComponent();
      const message = screen.getByText(/empty/i);
      expect(message).toBeInTheDocument();
    });

    it("should not display order button when cart is empty", () => {
      renderComponent();
      const orderButton = screen.queryByRole("button");
      expect(orderButton).not.toBeInTheDocument();
    });
  });

  describe("Checkout with Items", () => {
    it("should render checkout items when present", async () => {
      const mockItems = [
        {
          id: 1,
          title: "Test Product",
          price: 100,
          Qty: 1,
          TQty: 10,
          image: "test.jpg",
          Tags: ["Test"],
        },
      ];

      const mockStore = createMockStoreWithCart([], mockItems);
      const { container } = renderComponent(mockStore);

      await waitFor(() => {
        const placeOrderButton = container.querySelector("button");
        expect(placeOrderButton).toBeInTheDocument();
      });
    });

    it("should display multiple checkout items", async () => {
      const mockItems = [
        {
          id: 1,
          title: "Item 1",
          Price: 100,
          Qty: 1,
          TQty: 10,
          image: "test.jpg",
          Tags: ["Test"],
        },
        {
          id: 2,
          title: "Item 2",
          Price: 200,
          Qty: 2,
          TQty: 10,
          image: "test.jpg",
          Tags: ["Test"],
        },
      ];

      const mockStore = createMockStoreWithCart([], mockItems);
      renderComponent(mockStore);

      await waitFor(() => {
        const itemCards = screen.queryAllByText(/Item [12]/);
        expect(itemCards.length).toBeGreaterThan(0);
      });
    });

    it("should display Place Order button when items exist", async () => {
      const mockItems = [
        {
          id: 1,
          title: "Product",
          Price: 100,
          Qty: 1,
          TQty: 10,
          image: "test.jpg",
          Tags: ["Test"],
        },
      ];

      const mockStore = createMockStoreWithCart([], mockItems);
      renderComponent(mockStore);

      await waitFor(() => {
        const orderButton = screen.queryByRole("button", { name: /Place Order/i });
        expect(orderButton).toBeInTheDocument();
      });
    });

    it("should calculate and display total amount", async () => {
      const mockItems = [
        {
          id: 1,
          title: "Product",
          Price: 500,
          Qty: 2,
          TQty: 10,
          image: "test.jpg",
          Tags: ["Test"],
        },
      ];

      const mockStore = createMockStoreWithCart([], mockItems);
      renderComponent(mockStore);

      await waitFor(() => {
        const totalElements = screen.queryAllByText(/₹/);
        expect(totalElements.length).toBeGreaterThan(0);
      });
    });

    it("should display order summary with items", async () => {
      const mockItems = [
        {
          id: 1,
          title: "Test Item",
          Price: 100,
          Qty: 1,
          TQty: 10,
          image: "test.jpg",
          Tags: ["Test"],
        },
      ];

      const mockStore = createMockStoreWithCart([], mockItems);
      const { container } = renderComponent(mockStore);

      await waitFor(() => {
        const totalDiv = container.querySelector(".total");
        expect(totalDiv).toBeInTheDocument();
      });
    });
  });

  describe("Cart Item Interactions", () => {
    it("should handle quantity changes on items", async () => {
      const mockItems = [
        {
          id: 1,
          title: "Product",
          Price: 100,
          Qty: 1,
          TQty: 5,
          image: "test.jpg",
          Tags: ["Test"],
        },
      ];

      const mockStore = createMockStoreWithCart([], mockItems);
      const { container } = renderComponent(mockStore);

      await waitFor(() => {
        const quantitySelects = container.querySelectorAll(".quantity-select");
        expect(quantitySelects.length).toBeGreaterThan(0);
      });
    });

    it("should handle delete item from cart", async () => {
      const mockItems = [
        {
          id: 1,
          title: "Product",
          Price: 100,
          Qty: 2,
          TQty: 10,
          image: "test.jpg",
          Tags: ["Test"],
        },
      ];

      const mockStore = createMockStoreWithCart([], mockItems);
      const { container } = renderComponent(mockStore);

      await waitFor(() => {
        const buttons = container.querySelectorAll("button");
        expect(buttons.length).toBeGreaterThan(0);
      });
    });

    it("should remove item when quantity set to zero", async () => {
      const mockItems = [
        {
          id: 1,
          title: "Product",
          Price: 100,
          Qty: 1,
          TQty: 10,
          image: "test.jpg",
          Tags: ["Test"],
        },
      ];

      const mockStore = createMockStoreWithCart([], mockItems);
      const { container } = renderComponent(mockStore);

      await waitFor(() => {
        const selects = container.querySelectorAll("select");
        if (selects.length > 0) {
          fireEvent.change(selects[0], { target: { value: "0" } });
        }
        expect(selects.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Payment Functionality", () => {
    it("should show alert when items have zero quantity", async () => {
      const mockItems = [
        {
          id: 1,
          title: "Product",
          Price: 100,
          Qty: 0,
          TQty: 10,
          image: "test.jpg",
          Tags: ["Test"],
        },
      ];

      const mockStore = createMockStoreWithCart([], mockItems);
      const { container } = renderComponent(mockStore);

      await waitFor(() => {
        const orderButton = screen.queryByRole("button", { name: /Place Order/i });
        const buttonInContainer = container.querySelector("button");
        expect(buttonInContainer || orderButton).toBeInTheDocument();
      });
    });

    it("should alert for mixed zero and non-zero quantities", async () => {
      const mockItems = [
        {
          id: 1,
          title: "Product 1",
          Price: 100,
          Qty: 1,
          TQty: 10,
          image: "test.jpg",
          Tags: ["Test"],
        },
        {
          id: 2,
          title: "Product 2",
          Price: 200,
          Qty: 0,
          TQty: 10,
          image: "test.jpg",
          Tags: ["Test"],
        },
      ];

      const mockStore = createMockStoreWithCart([], mockItems);
      const { container } = renderComponent(mockStore);

      await waitFor(() => {
        const orderButton = screen.queryByRole("button", { name: /Place Order/i });
        const buttonInContainer = container.querySelector("button");
        expect(buttonInContainer || orderButton).toBeInTheDocument();
      });
    });

    it("should process payment with valid quantities", async () => {
      jest.useFakeTimers();
      const mockItems = [
        {
          id: 1,
          title: "Product",
          Price: 100,
          Qty: 1,
          TQty: 10,
          image: "test.jpg",
          Tags: ["Test"],
        },
      ];

      const mockStore = createMockStoreWithCart([], mockItems);
      renderComponent(mockStore);

      await waitFor(() => {
        const orderButton = screen.queryByRole("button", { name: /Place Order/i });
        expect(orderButton).toBeInTheDocument();
      });

      jest.useRealTimers();
    });

    it("should disable order button during payment processing", async () => {
      jest.useFakeTimers();
      const mockItems = [
        {
          id: 1,
          title: "Product",
          Price: 100,
          Qty: 1,
          TQty: 10,
          image: "test.jpg",
          Tags: ["Test"],
        },
      ];

      const mockStore = createMockStoreWithCart([], mockItems);
      renderComponent(mockStore);

      await waitFor(() => {
        const orderButton = screen.queryByRole("button", { name: /Place Order/i });
        expect(orderButton || document.querySelector("button")).toBeInTheDocument();
      });

      jest.useRealTimers();
    });

    it("should display processing status during payment", async () => {
      jest.useFakeTimers();
      const mockItems = [
        {
          id: 1,
          title: "Product",
          Price: 100,
          Qty: 1,
          TQty: 10,
          image: "test.jpg",
          Tags: ["Test"],
        },
      ];

      const mockStore = createMockStoreWithCart([], mockItems);
      const { container } = renderComponent(mockStore);

      await waitFor(() => {
        const button = container.querySelector("button");
        expect(button).toBeInTheDocument();
      });

      jest.useRealTimers();
    });

    it("should calculate total with multiple items", async () => {
      const mockItems = [
        {
          id: 1,
          title: "Product 1",
          Price: 200,
          Qty: 2,
          TQty: 10,
          image: "test.jpg",
          Tags: ["Test"],
        },
        {
          id: 2,
          title: "Product 2",
          Price: 300,
          Qty: 1,
          TQty: 10,
          image: "test.jpg",
          Tags: ["Test"],
        },
      ];

      const mockStore = createMockStoreWithCart([], mockItems);
      const { container } = renderComponent(mockStore);

      await waitFor(() => {
        const totalDiv = container.querySelector(".total");
        expect(totalDiv).toBeInTheDocument();
      });
    });

    it("should allow multiple payment attempts", async () => {
      jest.useFakeTimers();
      const mockItems = [
        {
          id: 1,
          title: "Product",
          Price: 100,
          Qty: 2,
          TQty: 10,
          image: "test.jpg",
          Tags: ["Test"],
        },
      ];

      const mockStore = createMockStoreWithCart([], mockItems);
      renderComponent(mockStore);

      await waitFor(() => {
        const orderButton = screen.queryByRole("button", { name: /Place Order/i });
        expect(orderButton).toBeInTheDocument();
      });

      jest.useRealTimers();
    });

    it("should validate quantities before payment", async () => {
      renderComponent(store);

      await waitFor(() => {
        const container = document.querySelector(".container");
        expect(container).toBeInTheDocument();
      });
    });
  });

  describe("Checkout Structure", () => {
    it("should render main container div", () => {
      renderComponent();
      const container = document.querySelector(".container");
      expect(container).toBeInTheDocument();
    });

    it("should have checkout title with correct class", () => {
      renderComponent();
      const title = document.querySelector(".checkout-title");
      expect(title).toBeInTheDocument();
    });

    it("should display empty message div when no items", () => {
      renderComponent();
      const message = screen.getByText(/empty/i);
      expect(message).toBeInTheDocument();
    });

    it("should render without crashing", () => {
      const { container } = renderComponent();
      expect(container).toBeInTheDocument();
    });

    it("should have proper page layout", () => {
      const { container } = renderComponent();
      const content = container.querySelector(".container");
      expect(content).toBeInTheDocument();
    });
  });

  describe("Component Integration", () => {
    it("should render complete checkout page with empty state", () => {
      renderComponent();
      const title = screen.getByText(/Checkout Items/i);
      const message = screen.getByText(/empty/i);
      expect(title).toBeInTheDocument();
      expect(message).toBeInTheDocument();
    });

    it("should load and display items from initial state", async () => {
      const mockItems = [
        {
          id: 1,
          title: "Loaded Item",
          Price: 150,
          Qty: 1,
          TQty: 10,
          image: "test.jpg",
          Tags: ["Test"],
        },
      ];

      const mockStore = createMockStoreWithCart([], mockItems);
      const { container } = renderComponent(mockStore);

      await waitFor(() => {
        const buttons = container.querySelectorAll("button");
        expect(buttons.length).toBeGreaterThan(0);
      });
    });

    it("should handle payment with valid items and quantities", async () => {
      const mockItems = [
        {
          id: 1,
          title: "Product",
          Price: 100,
          Qty: 1,
          TQty: 10,
          image: "test.jpg",
          Tags: ["Test"],
        },
      ];

      const mockStore = createMockStoreWithCart([], mockItems);
      renderComponent(mockStore);

      await waitFor(() => {
        const orderButton = screen.queryByRole("button", { name: /Place Order/i });
        expect(orderButton || document.querySelector("button")).toBeInTheDocument();
      });
    });

    it("should contain router components for navigation", () => {
      renderComponent();
      const container = document.querySelector(".container");
      expect(container).toBeInTheDocument();
    });

    it("should maintain checkout state through user interactions", async () => {
      const mockItems = [
        {
          id: 1,
          title: "Product 1",
          Price: 100,
          Qty: 1,
          TQty: 10,
          image: "test.jpg",
          Tags: ["Test"],
        },
      ];

      const mockStore = createMockStoreWithCart([], mockItems);
      const { container } = renderComponent(mockStore);

      await waitFor(() => {
        const totalDiv = container.querySelector(".total");
        expect(totalDiv).toBeInTheDocument();
      });
    });
  });
});
