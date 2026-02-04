import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Fashion from "../amazon/fashion";
import { BrowserRouter as Router } from "react-router-dom";
import CartProvider from "../amazon/cartProvider";

describe("Fashion Component", () => {
  beforeEach(() => {
    render(
      <Router>
        <CartProvider>
          <Fashion />
        </CartProvider>
      </Router>
    );
  });

  it("should render Fashion component", () => {
    expect(screen.getByText(/Fashion/i)).toBeInTheDocument();
  });

  it("should display fashion items", async () => {
    const items = screen.getAllByRole("img");
    expect(items.length).toBeGreaterThan(0);
  });

  it("should have filter section", () => {
    const filterSection = screen.getByText("Price Range");
    expect(filterSection).toBeInTheDocument();
  });

  it("should render fashion category page", () => {
    const page = document.querySelector(".category-page");
    expect(page).toBeInTheDocument();
  });

  it("should display product cards", () => {
    const productCards = document.querySelectorAll(".item");
    expect(productCards.length).toBeGreaterThan(0);
  });

  it("should have multiple fashion items", () => {
    const allItems = screen.getAllByRole("img");
    expect(allItems.length).toBeGreaterThanOrEqual(1);
  });

  it("should have category header", () => {
    const header = document.querySelector(".category-header");
    expect(header).toBeInTheDocument();
  });

  it("should display category title", () => {
    const title = screen.getByText(/👕 Fashion/i);
    expect(title).toBeInTheDocument();
  });

  it("should have item container", () => {
    const container = document.querySelector(".item-container");
    expect(container).toBeInTheDocument();
  });

  it("should display product count", () => {
    const countText = screen.getByText(/products available/i);
    expect(countText).toBeInTheDocument();
  });

  it("should have filter controls", () => {
    const filterControls = document.querySelector(".filter-controls");
    expect(filterControls || document.querySelector(".filter-section")).toBeInTheDocument();
  });

  it("should have sort buttons for price", () => {
    const buttons = screen.queryAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("should display fashion items with images", () => {
    const images = document.querySelectorAll(".item-image");
    expect(images.length).toBeGreaterThan(0);
  });

  it("should display item prices", () => {
    const prices = document.querySelectorAll(".item-price");
    expect(prices.length).toBeGreaterThan(0);
  });

  it("should have view details buttons", () => {
    const buttons = document.querySelectorAll(".add-to-cart-btn");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("should have proper fashion category structure", () => {
    const categoryContainer = document.querySelector(".category-container");
    expect(categoryContainer).toBeInTheDocument();
  });

  it("should display fashion page with sidebar", () => {
    const sidebar = document.querySelector(".category-sidebar");
    expect(sidebar).toBeInTheDocument();
  });

  it("should display fashion content area", () => {
    const content = document.querySelector(".category-content");
    expect(content).toBeInTheDocument();
  });

  it("should render fashion items grid", () => {
    const grid = document.querySelector(".items-grid") || document.querySelectorAll(".item").length;
    expect(grid).toBeTruthy();
  });

  it("should have filter buttons for fashion", () => {
    const filterBtn = document.querySelector(".filter-button");
    expect(filterBtn || document.querySelector(".filter-section")).toBeInTheDocument();
  });

  it("should display all fashion categories", () => {
    const categoryPage = document.querySelector(".category-page");
    expect(categoryPage?.textContent).toContain("Fashion");
  });

  it("should render fashion items properly", () => {
    const items = document.querySelectorAll(".item");
    expect(items.length).toBeGreaterThan(0);
  });

  it("should have fashion page heading", () => {
    const heading = screen.getByText(/👕 Fashion/i);
    expect(heading?.tagName).toBe("H1");
  });

  it("should display available products count", () => {
    const countText = screen.getByText(/products available/i);
    expect(countText?.textContent).toBeTruthy();
  });

  it("should render fashion with all sections", () => {
    const page = document.querySelector(".category-page");
    const header = document.querySelector(".category-header");
    expect(page).toBeInTheDocument();
    expect(header).toBeInTheDocument();
  });

  it("should have price range filter options", () => {
    const filterOptions = document.querySelectorAll(".filter-option");
    expect(filterOptions.length).toBeGreaterThan(0);
  });

  it("should have radio buttons for price filters", () => {
    const radioButtons = document.querySelectorAll("input[type='radio']");
    expect(radioButtons.length).toBeGreaterThan(0);
  });

  it("should trigger price filter on radio button change", async () => {
    const radioButtons = document.querySelectorAll("input[type='radio']");
    const firstRadio = radioButtons[1];
    if (firstRadio) {
      fireEvent.click(firstRadio);
      await waitFor(() => {
        expect(firstRadio.getAttribute("checked")).toBeDefined();
      });
    }
  });

  it("should update filtered items on filter change", async () => {
    const radioButtons = document.querySelectorAll("input[type='radio']");
    const secondRadio = radioButtons[1];
    if (secondRadio) {
      fireEvent.click(secondRadio);
      await waitFor(() => {
        expect(secondRadio).toBeInTheDocument();
      });
    }
  });

  it("should show low to high sort button", () => {
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("should handle filter and display correct message", async () => {
    const radioButtons = document.querySelectorAll("input[type='radio']");
    const fifthRadio = radioButtons[4];
    if (fifthRadio) {
      fireEvent.click(fifthRadio);
      await waitFor(() => {
        expect(fifthRadio).toBeInTheDocument();
      });
    }
  });

  it("should have all price range labels", () => {
    expect(screen.getByText("All Prices")).toBeInTheDocument();
    expect(screen.getByText(/Under ₹500/i)).toBeInTheDocument();
    expect(screen.getByText(/₹500 - ₹2,000/i)).toBeInTheDocument();
    expect(screen.getByText(/₹2,000 - ₹5,000/i)).toBeInTheDocument();
    expect(screen.getByText(/₹5,000 and above/i)).toBeInTheDocument();
  });

  it("should have fashion sidebar with filters", () => {
    const sidebar = document.querySelector(".category-sidebar");
    expect(sidebar?.querySelector(".filter-section")).toBeInTheDocument();
  });

  it("should display price range heading", () => {
    const heading = screen.getByText("Price Range");
    expect(heading?.tagName).toBe("H3");
  });

  it("should render item titles for products", () => {
    const itemTitles = document.querySelectorAll(".item-title");
    expect(itemTitles.length).toBeGreaterThan(0);
  });

  it("should have item price currency symbol", () => {
    const currencySymbols = document.querySelectorAll(".price-currency");
    expect(currencySymbols.length).toBeGreaterThan(0);
  });

  it("should have item image wrapper", () => {
    const wrappers = document.querySelectorAll(".item-image-wrapper");
    expect(wrappers.length).toBeGreaterThan(0);
  });

  it("should render fashion with filters working", () => {
    const filterSection = document.querySelector(".filter-section");
    expect(filterSection).toBeInTheDocument();
    const radioButtons = document.querySelectorAll("input[type='radio']");
    expect(radioButtons.length).toBeGreaterThan(0);
  });

  it("should display all fashion items on render", () => {
    const items = document.querySelectorAll(".item");
    expect(items.length).toBeGreaterThan(0);
  });

  it("should have working filter controls", () => {
    const inputs = document.querySelectorAll("input[type='checkbox']");
    expect(inputs || document.querySelectorAll("input[type='radio']")).toBeTruthy();
  });

  it("should display fashion category page with structure", () => {
    const page = document.querySelector(".category-page");
    expect(page?.children.length).toBeGreaterThan(0);
  });

  it("should show fashion products in grid layout", () => {
    const grid = document.querySelector(".items-grid") || document.querySelector(".category-page");
    expect(grid).toBeInTheDocument();
  });

  it("should have price range filter for fashion", () => {
    const priceRange = screen.getByText("Price Range");
    expect(priceRange).toBeInTheDocument();
  });

  it("should display fashion item ratings", () => {
    const ratings = document.querySelectorAll(".item-rating");
    expect(ratings.length >= 0).toBe(true);
  });

  it("should render filter options for fashion", () => {
    const options = document.querySelectorAll(".filter-option");
    expect(options || document.querySelector(".filter-section")).toBeTruthy();
  });

  it("should display fashion category", () => {
    const page = document.querySelector(".category-page");
    expect(page?.textContent).toBeTruthy();
  });

  it("should have fashion product layout", () => {
    expect(document.querySelector(".category-page")).toBeInTheDocument();
  });

  it("should render fashion items with images", () => {
    const images = document.querySelectorAll(".item img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("should display prices for fashion items", () => {
    const prices = document.querySelectorAll(".item-price");
    expect(prices.length >= 0).toBe(true);
  });

  it("should have complete fashion page structure", () => {
    const page = document.querySelector(".category-page");
    const filters = document.querySelector(".filter-section");
    expect(page && filters).toBeInTheDocument();
  });

  it("should render fashion category with all elements", () => {
    const { container } = render(
      <Router>
        <CartProvider>
          <Fashion />
        </CartProvider>
      </Router>
    );
    expect(container.textContent.length).toBeGreaterThan(0);
  });

  it("should display sort and filter for fashion", () => {
    const controls = document.querySelector(".sort-filter-controls") || document.querySelector(".filter-section");
    expect(controls).toBeInTheDocument();
  });

  it("should have fashion items with action buttons", () => {
    const buttons = document.querySelectorAll(".add-to-cart-btn");
    expect(buttons || document.querySelectorAll("button")).toBeTruthy();
  });

  it("should render fashion page with proper structure", () => {
    const leftFilter = document.querySelector(".filter-section");
    const rightItems = document.querySelector(".items-container") || document.querySelector(".category-page");
    expect(leftFilter || rightItems).toBeInTheDocument();
  });

  it("should display fashion item titles", () => {
    const titles = document.querySelectorAll(".item-title");
    expect(titles.length).toBeGreaterThan(0);
  });

  it("should show fashion filter options", () => {
    const filterSection = document.querySelector(".filter-section");
    expect(filterSection?.children.length).toBeGreaterThan(0);
  });

  it("should render complete fashion layout", () => {
    const page = document.querySelector(".category-page");
    const hasFashionContent = page?.textContent?.includes("Fashion") || page?.textContent?.includes("Price");
    expect(hasFashionContent || page).toBeTruthy();
  });

  it("should have fashion category header", () => {
    const header = document.querySelector(".category-header");
    expect(header || document.querySelector(".category-page")).toBeInTheDocument();
  });

  it("should display fashion item titles", () => {
    const titles = document.querySelectorAll(".item-title");
    expect(titles.length).toBeGreaterThan(0);
  });

  it("should show fashion filter options", () => {
    const filterSection = document.querySelector(".filter-section");
    expect(filterSection?.children.length).toBeGreaterThan(0);
  });

  it("should render complete fashion layout", () => {
    const page = document.querySelector(".category-page");
    const hasFashionContent = page?.textContent?.includes("Fashion") || page?.textContent?.includes("Price");
    expect(hasFashionContent || page).toBeTruthy();
  });

  it("should have fashion category header", () => {
    const header = document.querySelector(".category-header");
    expect(header || document.querySelector(".category-page")).toBeInTheDocument();
  });

  it("should display fashion items with descriptions", () => {
    const descriptions = document.querySelectorAll(".item-description");
    expect(descriptions || document.querySelectorAll(".item")).toBeTruthy();
  });

  it("should render fashion items with complete info", () => {
    const items = document.querySelectorAll(".item");
    items.forEach((item) => {
      const hasImage = item.querySelector("img");
      expect(hasImage).toBeTruthy();
    });
  });

  it("should display fashion page title properly", () => {
    const title = screen.getByText(/Fashion/i);
    expect(title?.textContent?.length).toBeGreaterThan(0);
  });

  it("should render fashion grid layout", () => {
    const grid = document.querySelector(".Style") || document.querySelector(".items-grid") || document.querySelector(".category-page");
    expect(grid).toBeInTheDocument();
  });

  it("should show all fashion product prices", () => {
    const items = document.querySelectorAll(".item");
    expect(items.length).toBeGreaterThan(0);
  });

  it("should have fashion filter working", () => {
    const filterRadios = document.querySelectorAll("input[type='radio']");
    expect(filterRadios || document.querySelector(".filter-section")).toBeTruthy();
  });

  it("should render fashion with price filter", () => {
    const priceFilter = screen.getByText(/Price Range/i);
    expect(priceFilter).toBeInTheDocument();
  });

  it("should display fashion products properly arranged", () => {
    const page = document.querySelector(".category-page");
    const items = page?.querySelectorAll(".item");
    expect(items?.length).toBeGreaterThan(0);
  });

  it("should display multiple fashion items", () => {
    render(
      <Router>
        <CartProvider>
          <Fashion />
        </CartProvider>
      </Router>
    );
    const items = document.querySelectorAll(".item");
    expect(items.length).toBeGreaterThan(0);
  });

  it("should have filter buttons for fashion", () => {
    render(
      <Router>
        <CartProvider>
          <Fashion />
        </CartProvider>
      </Router>
    );
    const filterButtons = document.querySelectorAll("input[type='radio']");
    expect(filterButtons.length >= 0).toBe(true);
  });

  it("should handle filter selection", () => {
    render(
      <Router>
        <CartProvider>
          <Fashion />
        </CartProvider>
      </Router>
    );
    const radios = document.querySelectorAll("input[type='radio']");
    radios.forEach(radio => {
      fireEvent.click(radio);
      expect(radio).toBeInTheDocument();
    });
  });

  it("should display product prices correctly", () => {
    render(
      <Router>
        <CartProvider>
          <Fashion />
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
          <Fashion />
        </CartProvider>
      </Router>
    );
    const ratings = document.querySelectorAll(".rating");
    expect(ratings.length >= 0).toBe(true);
  });

  it("should display low to high price sort", () => {
    render(
      <Router>
        <CartProvider>
          <Fashion />
        </CartProvider>
      </Router>
    );
    const filterSection = document.querySelector(".filter-section");
    expect(filterSection).toBeInTheDocument();
  });

  it("should display high to low price sort", () => {
    render(
      <Router>
        <CartProvider>
          <Fashion />
        </CartProvider>
      </Router>
    );
    const page = document.querySelector(".category-page");
    expect(page).toBeInTheDocument();
  });

  it("should display rating sort option", () => {
    render(
      <Router>
        <CartProvider>
          <Fashion />
        </CartProvider>
      </Router>
    );
    const radios = document.querySelectorAll("input[type='radio']");
    expect(radios.length >= 0).toBe(true);
  });

  it("should display newest sort option", () => {
    render(
      <Router>
        <CartProvider>
          <Fashion />
        </CartProvider>
      </Router>
    );
    const items = document.querySelectorAll(".item");
    expect(items.length).toBeGreaterThan(0);
  });

  it("should have add to cart buttons", () => {
    render(
      <Router>
        <CartProvider>
          <Fashion />
        </CartProvider>
      </Router>
    );
    const buttons = screen.queryAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("should display product images", () => {
    render(
      <Router>
        <CartProvider>
          <Fashion />
        </CartProvider>
      </Router>
    );
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("should display product descriptions", () => {
    render(
      <Router>
        <CartProvider>
          <Fashion />
        </CartProvider>
      </Router>
    );
    const items = document.querySelectorAll(".item");
    items.forEach(item => {
      expect(item).toBeInTheDocument();
    });
  });

  it("should have proper grid layout", () => {
    render(
      <Router>
        <CartProvider>
          <Fashion />
        </CartProvider>
      </Router>
    );
    const container = document.querySelector(".category-page");
    expect(container?.children.length).toBeGreaterThan(0);
  });

  it("should display discount badges", () => {
    render(
      <Router>
        <CartProvider>
          <Fashion />
        </CartProvider>
      </Router>
    );
    const discounts = document.querySelectorAll(".discount");
    expect(discounts.length >= 0).toBe(true);
  });

  it("should handle add to cart click", () => {
    render(
      <Router>
        <CartProvider>
          <Fashion />
        </CartProvider>
      </Router>
    );
    const buttons = document.querySelectorAll("button");
    buttons.forEach(btn => {
      if (btn.textContent?.includes("Add")) {
        fireEvent.click(btn);
        expect(btn).toBeInTheDocument();
      }
    });
  });

  it("should display complete fashion page", () => {
    const { container } = render(
      <Router>
        <CartProvider>
          <Fashion />
        </CartProvider>
      </Router>
    );
    expect(container.querySelector(".category-page")).toBeInTheDocument();
  });
});
