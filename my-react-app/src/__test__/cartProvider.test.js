import { render } from "@testing-library/react";
import CartProvider from "../amazon/cartProvider";

describe("CartProvider", () => {
  it("should render", () => {
    render(<CartProvider />);
  });
});
