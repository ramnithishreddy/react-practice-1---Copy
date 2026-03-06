import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import Checkout from "../amazon/checkout";
import CartProvider from "../amazon/cartProvider";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import { createMockStoreWithCart } from "./reduxTestUtils";
import * as cartProvider from "../amazon/cartProvider";

/* eslint-disable testing-library/no-container, testing-library/no-node-access */

describe("Checkout Component", () => {
  const renderComponent = (testStore = store, items = []) => {
    return render(
      <Router>
        <Provider store={testStore}>
          <CartProvider>
            <Checkout />
          </CartProvider>
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

    it("should contain router components for navigation", () => {
      renderComponent();
      const container = document.querySelector(".container");
      expect(container).toBeInTheDocument();
    });
  });
});
