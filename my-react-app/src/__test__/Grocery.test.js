import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Grocery from "../amazon/Grocery";
import CartProvider from "../amazon/CartProvider";
import data from "../amazon/data.json";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigation: () => mockNavigate,
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
    expect(itemElements).toHaveLength(1); // Assuming there are two items in sortedData
  });

  it("handles click on item and navigates to ItemDetails", async () => {
    render(
      <Router>
        <CartProvider value={mockCartProviderValues}>
          <Grocery />
        </CartProvider>
      </Router>
    );
    screen.debug();
    const content = "UNIBIC Assorted(Pack of 10) Cookies  (750 g)";
    data.Grocery.map((items) => {
      const itemElement = screen.getByAltText(
        "UNIBIC Assorted(Pack of 10) Cookies  (750 g)",
        () => {
          const hasalt = content.includes(items.title);
          console.log(hasalt, "62");
          return hasalt;
        }
      );
      fireEvent.click(itemElement);
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/ItemDetails", {
        state: {
          Price: 122,
          Qty: 0,
          id: 6,
          image:
            "https://rukminim2.flixcart.com/image/416/416/jtsz3bk0/fruit/3/7/w/6-un-branded-whole-original-imafdsfxcufxeurw.jpeg?q=70",
          title: "Apple Royal Gala 4 Units  (480g - 550g)",
        },
      });
    });
  });
});
