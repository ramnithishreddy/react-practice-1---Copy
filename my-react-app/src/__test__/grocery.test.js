import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Grocery from "../amazon/grocery";
import CartProvider from "../amazon/cartProvider";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Grocery", () => {
  const mockCartProviderValues = {
    handleLowToHigh: jest.fn(),
    handleHighToLow: jest.fn(),
    sortedData: [
      {
        id: 1,
        title: "Apple Royal Gala 4 Units  (480g - 550g)",
        image:
          "https://rukminim2.flixcart.com/image/416/416/jtsz3bk0/fruit/3/7/w/6-un-branded-whole-original-imafdsfxcufxeurw.jpeg?q=70",
        Price: 122,
      },
      {
        id: 2,
        title: "UNIBIC Assorted(Pack of 10) Cookies  (750 g)",
        image:
          "https://rukminim2.flixcart.com/image/416/416/xif0q/cookie-biscuit/q/4/q/750-assorted-cookies-75g-pack-of-10-1-unibic-original-imaghw7zehvmepkd.jpeg?q=70",
        Price: 165,
      },
    ],
    currentQuantity: 0,
    setCurrentQuantity: jest.fn(),
  };

  it("renders Grocery component with sorted items", () => {
    render(
      <Router>
        <CartProvider value={mockCartProviderValues}>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const itemElements = screen.getAllByRole("img", { name: /UNIBIC/i });
    expect(itemElements).toHaveLength(1);
  });

  it("handles click on item and navigates to ItemDetails", async () => {
    render(
      <Router>
        <CartProvider value={mockCartProviderValues}>
          <Grocery />
        </CartProvider>
      </Router>
    );

    const itemElements = await screen.findAllByRole("img", { name: /UNIBIC/i });
    fireEvent.click(itemElements[0]);
    expect(mockNavigate).toHaveBeenCalled();
  });

  it("sorts items from low to high", () => {
    render(
      <Router>
        <CartProvider value={mockCartProviderValues}>
          <Grocery />
        </CartProvider>
      </Router>
    );

    fireEvent.click(screen.getByText(/Low to High/i));
    const itemElements = screen.getAllByRole("img", { name: /UNIBIC/i });
    expect(itemElements).toHaveLength(1);
  });

  it("sorts items from high to low", () => {
    render(
      <Router>
        <CartProvider value={mockCartProviderValues}>
          <Grocery />
        </CartProvider>
      </Router>
    );

    fireEvent.click(screen.getByText(/High to Low/i));
    const itemElements = screen.getAllByRole("img", { name: /UNIBIC/i });
    expect(itemElements).toHaveLength(1);
  });
});
