import { fireEvent, render, screen } from "@testing-library/react";
import Checkout from "../amazon/checkout";
import { BrowserRouter as Router } from "react-router-dom";
import CartProvider from "../amazon/cartProvider";

describe("CartProvider", () => {

  const itemMock = {
    title: 'Sample Item',
    Price: 100,
    Qty: 1,
    TQty: 10,
    image: 'sample-image-url',
    description: 'This is a sample item description.',
};

beforeEach(() => {
    render(
        <Router>
            <CartProvider initialEntries={[{ pathname: '/checkout', state: itemMock }]}>
                <Checkout />
            </CartProvider>
        </Router>
    );
});

  it.skip("should handle payment function", () => {
    screen.debug()
    // const heading = screen.getAllByRole("heading", { name: /Checkout Items/i });
    // expect(heading).toBeInTheDocument();
    const payment = screen.getAllByRole("button", { name: /Place Order/i }); 
    fireEvent.click(payment)
  })
});
