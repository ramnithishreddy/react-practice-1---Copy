import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Mobiles from "../amazon/mobiles";
import CartProvider from "../amazon/cartProvider";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Mobiles", () => {
  const mockCartProviderValues = {
    handleLowToHigh: jest.fn(),
    handleHighToLow: jest.fn(),
    sortedData: [
      {
        id: 1,
        title: "realme C53 (Champion Gold, 64 GB)  (6 GB RAM)",
        image:
          "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/e/z/n/-original-imagrggwzadhhuz7.jpeg?q=70",
        Price: 10999,
      },
      {
        id: 2,
        title: "realme C53 (Champion Black, 64 GB)  (6 GB RAM)",
        image:
          "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/8/f/8/c53-rmx3762-realme-original-imagrffga9srfh7v.jpeg?q=70",
        Price: 10999,
      },
    ],
    currentQuantity: 0,
    setCurrentQuantity: jest.fn(),
  };

  it("renders Grocery component with sorted items", () => {
    render(
      <Router>
        <CartProvider value={mockCartProviderValues}>
          <Mobiles />
        </CartProvider>
      </Router>
    );
    const itemElements = screen.getAllByRole("img", { name: /realme/i });
    expect(itemElements).toHaveLength(2);
  });

  it("handles click on item and navigates to ItemDetails", async () => {
    render(
      <Router>
        <CartProvider value={mockCartProviderValues}>
          <Mobiles />
        </CartProvider>
      </Router>
    );

    const itemElements = await screen.findAllByRole("img", { name: /realme/i });
    fireEvent.click(itemElements[0]);
    expect(mockNavigate).toHaveBeenCalled();
  });

  it("sorts items from low to high", () => {
    render(
      <Router>
        <CartProvider value={mockCartProviderValues}>
          <Mobiles />
        </CartProvider>
      </Router>
    );

    fireEvent.click(screen.getByText(/Low to High/i));
    const itemElements = screen.getAllByRole("img", { name: /realme/i });
    expect(itemElements).toHaveLength(2);
  });

  it("sorts items from high to low", () => {
    render(
      <Router>
        <CartProvider value={mockCartProviderValues}>
          <Mobiles />
        </CartProvider>
      </Router>
    );

    fireEvent.click(screen.getByText(/High to Low/i));
    const itemElements = screen.getAllByRole("img", { name: /realme/i });
    expect(itemElements).toHaveLength(2);
  });
});
