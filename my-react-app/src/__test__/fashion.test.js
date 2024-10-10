import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Fashion from "../amazon/fashion";
import CartProvider from "../amazon/cartProvider";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Fashion", () => {
  const mockCartProviderValues = {
    handleLowToHigh: jest.fn(),
    handleHighToLow: jest.fn(),
    sortedData: [
      {
        id: 1,
        title: "Men Striped Round Neck Cotton Blend Blue, Black T-Shirt",
        image: "https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/r/v/k/m-ausk0165-ausk-original-imaghu9fbhcgf2za.jpeg?q=70",
        Price: 199,
        Qty: 0,
      },
      {
        id: 2,
        title: "Men Solid Polo Neck Pure Cotton Black T-Shirt",
        image: "https://rukminim2.flixcart.com/image/832/832/kvzkosw0/t-shirt/s/v/9/xl-askpqrgfa85753-allen-solly-original-imag8rphhg5nxsdh.jpeg?q=70",
        Price: 734,
        Qty: 0,
      },
    ],
    currentQuantity: 0,
    setCurrentQuantity: jest.fn(),
  };

  it("renders Fashion component with sorted items", () => {
    render(
      <Router>
        <CartProvider value={mockCartProviderValues}>
          <Fashion />
        </CartProvider>
      </Router>
    );
    const itemElements = screen.getAllByRole("img", { name: /Men/i });
    expect(itemElements).toHaveLength(6);
  });

  it("handles click on item and navigates to ItemDetails", async () => {
    render(
      <Router>
        <CartProvider value={mockCartProviderValues}>
          <Fashion />
        </CartProvider>
      </Router>
    );

    const itemElements = await screen.findAllByRole("img", { name: /Men/i });
    fireEvent.click(itemElements[0]);
    expect(mockNavigate).toHaveBeenCalled();
  });

  it("sorts items from low to high", () => {
    render(
      <Router>
        <CartProvider value={mockCartProviderValues}>
          <Fashion />
        </CartProvider>
      </Router>
    );

    fireEvent.click(screen.getByText(/Low to High/i));
    const itemElements = screen.getAllByRole("img", { name: /Men/i });
    expect(itemElements).toHaveLength(6);
  });

  it("sorts items from high to low", () => {
    render(
      <Router>
        <CartProvider value={mockCartProviderValues}>
          <Fashion />
        </CartProvider>
      </Router>
    );

    fireEvent.click(screen.getByText(/High to Low/i));
    const itemElements = screen.getAllByRole("img", { name: /Men/i });
    expect(itemElements).toHaveLength(6);
  });
});
