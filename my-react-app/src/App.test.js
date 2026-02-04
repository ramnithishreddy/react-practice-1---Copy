import { render, screen } from "@testing-library/react";
import App from "./App";
import CartProvider from "./amazon/cartProvider";

describe("App", () => {
  it("should render Application", () => {
    render(
      <CartProvider>
        <App />
      </CartProvider>
    );
    expect(screen.getByTestId("App")).toBeInTheDocument();
  });
});
