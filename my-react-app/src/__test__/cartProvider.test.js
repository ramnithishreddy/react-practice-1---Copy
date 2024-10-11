import { render } from "@testing-library/react";
import CartProvider from "../amazon/cartProvider";
import { BrowserRouter as Router } from "react-router-dom";

describe("CartProvider", () => {
  it("should render", () => {
    render(
      <Router>
        <CartProvider />
      </Router>
    );
  });
});
