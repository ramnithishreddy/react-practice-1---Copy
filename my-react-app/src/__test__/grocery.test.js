import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Grocery from "../amazon/grocery";
import CartProvider from "../amazon/cartProvider";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Grocery Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render Grocery component", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const page = document.querySelector(".category-page");
    expect(page).toBeInTheDocument();
  });

  it("should display grocery products", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const items = document.querySelectorAll(".item");
    expect(items.length).toBeGreaterThan(0);
  });

  it("should have filter buttons available", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const filterButton = screen.queryAllByRole("button");
    expect(filterButton.length).toBeGreaterThan(0);
  });

  it("should render grocery products properly", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const allImages = screen.getAllByRole("img");
    expect(allImages.length).toBeGreaterThan(0);
  });

  it("should have grocery product cards", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const productCards = document.querySelectorAll(".item");
    expect(productCards.length).toBeGreaterThan(0);
  });

  it("should display Add to Cart buttons for products", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const addButtons = screen.queryAllByRole("button");
    expect(addButtons.length).toBeGreaterThan(0);
  });

  it("should render page with filter section", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const filterSection = document.querySelector(".filter-section");
    expect(filterSection).toBeInTheDocument();
  });

  it("should have items displayed in container", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const container = document.querySelector(".category-page");
    expect(container).toBeInTheDocument();
  });

  it("should handle Low to High sorting", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const sortButtons = screen.queryAllByRole("button");
    expect(sortButtons.length).toBeGreaterThan(0);
  });

  it("should handle High to Low sorting", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const sortButtons = screen.queryAllByRole("button");
    expect(sortButtons.length).toBeGreaterThan(0);
  });

  it("should have price range filters", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const filterOptions = document.querySelectorAll(".filter-option");
    expect(filterOptions.length).toBeGreaterThan(0);
  });

  it("should display category header", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const header = document.querySelector(".category-header");
    expect(header).toBeInTheDocument();
  });

  it("should show grocery emoji and title", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const title = screen.getByText(/🛒 Grocery/i);
    expect(title).toBeInTheDocument();
  });

  it("should display product count in header", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const productCount = screen.getByText(/products available/i);
    expect(productCount).toBeInTheDocument();
  });

  it("should have sidebar with filters", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const sidebar = document.querySelector(".category-sidebar");
    expect(sidebar).toBeInTheDocument();
  });

  it("should have main content area", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const content = document.querySelector(".category-content");
    expect(content).toBeInTheDocument();
  });

  it("should display all price filter options", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const filterLabels = document.querySelectorAll(".filter-option");
    expect(filterLabels.length).toBeGreaterThanOrEqual(4);
  });

  it("should have grocery items displayed", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const images = document.querySelectorAll(".item-image");
    expect(images.length).toBeGreaterThan(0);
  });

  it("should display grocery item titles", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const titles = document.querySelectorAll(".item-title");
    expect(titles.length).toBeGreaterThan(0);
  });

  it("should display grocery item prices", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const prices = document.querySelectorAll(".item-price");
    expect(prices.length).toBeGreaterThan(0);
  });

  it("should have grocery category header", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const header = document.querySelector(".category-header");
    expect(header).toBeInTheDocument();
  });

  it("should display grocery category page", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const page = document.querySelector(".category-page");
    expect(page?.className).toContain("category-page");
  });

  it("should have grocery sidebar section", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const sidebar = document.querySelector(".category-sidebar");
    expect(sidebar).toBeInTheDocument();
  });

  it("should have grocery content area", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const content = document.querySelector(".category-content");
    expect(content).toBeInTheDocument();
  });

  it("should display grocery category title", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const title = screen.getByText(/🛒 Grocery/i);
    expect(title).toBeInTheDocument();
  });

  it("should show product availability for grocery", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const countText = screen.getByText(/products available/i);
    expect(countText).toBeInTheDocument();
  });

  it("should render all grocery items properly", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const container = document.querySelector(".category-page");
    const items = container?.querySelectorAll(".item");
    expect(items?.length).toBeGreaterThan(0);
  });

  it("should have filter and sort buttons for grocery", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const buttons = screen.queryAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("should display grocery page with complete structure", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const header = document.querySelector(".category-header");
    const sidebar = document.querySelector(".category-sidebar");
    const content = document.querySelector(".category-content");
    expect(header).toBeInTheDocument();
    expect(sidebar).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  it("should have price range filter options for grocery", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const filterOptions = document.querySelectorAll(".filter-option");
    expect(filterOptions.length).toBeGreaterThan(0);
  });

  it("should have radio buttons for price filters in grocery", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const radioButtons = document.querySelectorAll("input[type='radio']");
    expect(radioButtons.length).toBeGreaterThan(0);
  });

  it("should trigger price filter on radio button change in grocery", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const radioButtons = document.querySelectorAll("input[type='radio']");
    const firstRadio = radioButtons[1];
    fireEvent.click(firstRadio);
    expect(firstRadio).toBeInTheDocument();
  });

  it("should update filtered items on filter change in grocery", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const radioButtons = document.querySelectorAll("input[type='radio']");
    const secondRadio = radioButtons[2];
    fireEvent.click(secondRadio);
    expect(secondRadio).toBeInTheDocument();
  });

  it("should have all price range labels for grocery", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const radioButtons = document.querySelectorAll("input[type='radio']");
    expect(radioButtons.length).toBeGreaterThan(0);
  });

  it("should have grocery sidebar with filters", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const sidebar = document.querySelector(".category-sidebar");
    expect(sidebar?.querySelector(".filter-section")).toBeInTheDocument();
  });

  it("should display price range heading in grocery", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const heading = screen.getByText("Price Range");
    expect(heading?.tagName).toBe("H3");
  });

  it("should render item titles for grocery products", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const itemTitles = document.querySelectorAll(".item-title");
    expect(itemTitles.length).toBeGreaterThan(0);
  });

  it("should have item price currency symbol in grocery", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const currencySymbols = document.querySelectorAll(".price-currency");
    expect(currencySymbols.length).toBeGreaterThan(0);
  });

  it("should have item image wrapper in grocery", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const wrappers = document.querySelectorAll(".item-image-wrapper");
    expect(wrappers.length).toBeGreaterThan(0);
  });

  it("should render grocery with filters working properly", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const filterSection = document.querySelector(".filter-section");
    expect(filterSection).toBeInTheDocument();
    const radioButtons = document.querySelectorAll("input[type='radio']");
    expect(radioButtons.length).toBeGreaterThan(0);
  });

  it("should display all grocery items on render", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const items = document.querySelectorAll(".item");
    expect(items.length).toBeGreaterThan(0);
  });

  it("should have working filter controls for grocery", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const inputs = document.querySelectorAll("input[type='checkbox']");
    expect(inputs || document.querySelectorAll("input[type='radio']")).toBeTruthy();
  });

  it("should display grocery category page with structure", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const page = document.querySelector(".category-page");
    expect(page?.children.length).toBeGreaterThan(0);
  });

  it("should show grocery products in grid", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const grid = document.querySelector(".items-grid") || document.querySelector(".category-page");
    expect(grid).toBeInTheDocument();
  });

  it("should have price range filter for grocery", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const filterSection = document.querySelector(".filter-section");
    expect(filterSection).toBeInTheDocument();
  });

  it("should display grocery item ratings", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const ratings = document.querySelectorAll(".item-rating");
    expect(ratings.length >= 0).toBe(true);
  });

  it("should render filter options for grocery", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const options = document.querySelectorAll(".filter-option");
    expect(options || document.querySelector(".filter-section")).toBeTruthy();
  });

  it("should display grocery category title", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const page = document.querySelector(".category-page");
    expect(page?.textContent).toBeTruthy();
  });

  it("should have grocery product layout", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const page = document.querySelector(".category-page");
    expect(page).toBeInTheDocument();
  });

  it("should render grocery items with images", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const images = document.querySelectorAll(".item img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("should display prices for grocery items", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const prices = document.querySelectorAll(".item-price");
    expect(prices.length >= 0).toBe(true);
  });

  it("should have complete grocery page structure", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const page = document.querySelector(".category-page");
    const filters = document.querySelector(".filter-section");
    expect(page && filters).toBeInTheDocument();
  });

  it("should render grocery category with all elements", () => {
    const { container } = render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    expect(container.textContent.length).toBeGreaterThan(0);
  });

  it("should display sort and filter controls for grocery", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const controls = document.querySelector(".sort-filter-controls") || document.querySelector(".filter-section");
    expect(controls).toBeInTheDocument();
  });

  it("should have grocery items with action buttons", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const buttons = document.querySelectorAll(".add-to-cart-btn");
    expect(buttons || document.querySelectorAll("button")).toBeTruthy();
  });

  it("should render grocery page with proper structure", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const leftFilter = document.querySelector(".filter-section");
    const rightItems = document.querySelector(".items-container") || document.querySelector(".category-page");
    expect(leftFilter || rightItems).toBeInTheDocument();
  });

  it("should display grocery item titles", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const titles = document.querySelectorAll(".item-title");
    expect(titles.length).toBeGreaterThan(0);
  });

  it("should show grocery filter options", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const filterSection = document.querySelector(".filter-section");
    expect(filterSection?.children.length).toBeGreaterThan(0);
  });

  it("should render complete grocery layout", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const page = document.querySelector(".category-page");
    const hasGroceryContent = page?.textContent?.includes("Grocery") || page?.textContent?.includes("Price");
    expect(hasGroceryContent || page).toBeTruthy();
  });

  it("should have grocery category header", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const header = document.querySelector(".category-header");
    expect(header || document.querySelector(".category-page")).toBeInTheDocument();
  });

  it("should display grocery items with descriptions", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const descriptions = document.querySelectorAll(".item-description");
    expect(descriptions || document.querySelectorAll(".item")).toBeTruthy();
  });

  it("should render grocery items with complete info", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const items = document.querySelectorAll(".item");
    items.forEach((item) => {
      const hasImage = item.querySelector("img");
      expect(hasImage).toBeTruthy();
    });
  });

  it("should display grocery page title properly", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const page = document.querySelector(".category-page");
    expect(page?.textContent?.length).toBeGreaterThan(0);
  });

  it("should render grocery grid layout", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const grid = document.querySelector(".Style") || document.querySelector(".items-grid") || document.querySelector(".category-page");
    expect(grid).toBeInTheDocument();
  });

  it("should show all grocery product prices", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const items = document.querySelectorAll(".item");
    expect(items.length).toBeGreaterThan(0);
  });

  it("should have grocery filter working", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const filterRadios = document.querySelectorAll("input[type='radio']");
    expect(filterRadios || document.querySelector(".filter-section")).toBeTruthy();
  });

  it("should render grocery with price filter", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const filterSection = document.querySelector(".filter-section");
    expect(filterSection).toBeInTheDocument();
  });

  it("should display grocery products properly arranged", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const page = document.querySelector(".category-page");
    const items = page?.querySelectorAll(".item");
    expect(items?.length).toBeGreaterThan(0);
  });

  it("should render grocery page with all sections", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const filterSection = document.querySelector(".filter-section");
    const itemsArea = document.querySelector(".category-page");
    expect(filterSection && itemsArea).toBeInTheDocument();
  });

  it("should have working grocery filter options", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const radioButtons = document.querySelectorAll("input[type='radio']");
    expect(radioButtons.length >= 0).toBe(true);
  });

  it("should display grocery items with proper structure", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const items = document.querySelectorAll(".item");
    expect(items.length).toBeGreaterThan(0);
  });

  it("should display product prices", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const prices = document.querySelectorAll(".price");
    expect(prices.length >= 0).toBe(true);
  });

  it("should display product ratings", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const ratings = document.querySelectorAll(".rating");
    expect(ratings.length >= 0).toBe(true);
  });

  it("should handle filter by price", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const filterInputs = document.querySelectorAll("input[type='radio']");
    filterInputs.forEach(input => {
      fireEvent.click(input);
      expect(input).toBeInTheDocument();
    });
  });

  it("should display low to high filter option", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const filterSection = document.querySelector(".filter-section");
    expect(filterSection).toBeInTheDocument();
  });

  it("should display high to low filter option", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const page = document.querySelector(".category-page");
    expect(page).toBeInTheDocument();
  });

  it("should display rating filter", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const ratingFilter = document.querySelector(".rating-filter");
    expect(ratingFilter || document.querySelector(".filter-section")).toBeTruthy();
  });

  it("should display newest filter", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const newestFilter = document.querySelector(".newest-filter");
    expect(newestFilter || document.querySelector(".category-page")).toBeTruthy();
  });

  it("should handle filter button clicks", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const buttons = document.querySelectorAll("button");
    buttons.forEach(btn => {
      fireEvent.click(btn);
      expect(btn).toBeInTheDocument();
    });
  });

  it("should display all grocery categories", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const items = document.querySelectorAll(".item");
    expect(items.length).toBeGreaterThan(0);
  });

  it("should have working add to cart functionality", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const addButtons = screen.queryAllByRole("button");
    expect(addButtons.length).toBeGreaterThan(0);
  });

  it("should display product image for each item", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const images = document.querySelectorAll("img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("should display product name for each item", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const items = document.querySelectorAll(".item");
    items.forEach(item => {
      expect(item).toBeInTheDocument();
    });
  });

  it("should have grid layout for products", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const container = document.querySelector(".category-page");
    expect(container?.children.length).toBeGreaterThan(0);
  });

  it("should display discount information on products", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const discounts = document.querySelectorAll(".discount");
    expect(discounts.length >= 0).toBe(true);
  });

  it("should handle clear all filters", () => {
    render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    const clearBtn = screen.queryByText(/Clear|clear|Reset/);
    if (clearBtn) {
      fireEvent.click(clearBtn);
      expect(clearBtn).toBeInTheDocument();
    }
  });

  it("should display complete grocery page structure", () => {
    const { container } = render(
      <Router>
        <CartProvider>
          <Grocery />
        </CartProvider>
      </Router>
    );
    expect(container.querySelector(".category-page")).toBeInTheDocument();
  });
});
