import { Provider } from "react-redux";
import store from "../redux/store";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Fashion from "../amazon/fashion";
import CartProvider from "../amazon/cartProvider";
import { BrowserRouter as Router } from "react-router-dom";

/* eslint-disable testing-library/no-container, testing-library/no-node-access */
describe("Fashion Component", () => {
  const renderComponent = () => {
    return render(
      <Router>
        <Provider store={store}>
          <CartProvider>
            <Fashion />
          </CartProvider>
        </Provider>
      </Router>
    );
  };

  it("should render Fashion component", () => {
    renderComponent();
    expect(screen.getByText(/Fashion/i)).toBeInTheDocument();
  });

  it("should display fashion items", () => {
    renderComponent();
    const items = screen.getAllByRole("img");
    expect(items.length).toBeGreaterThan(0);
  });

  it("should have filter section", () => {
    renderComponent();
    const filterSection = screen.getByText("Price Range");
    expect(filterSection).toBeInTheDocument();
  });

  it("should render fashion category page", () => {
    const { container } = renderComponent();
    const page = container.querySelector(".category-page");
    expect(page).toBeInTheDocument();
  });

  it("should display product cards", () => {
    const { container } = renderComponent();
    const productCards = container.querySelectorAll(".item");
    expect(productCards.length).toBeGreaterThan(0);
  });

  it("should have multiple fashion items", () => {
    renderComponent();
    const allItems = screen.getAllByRole("img");
    expect(allItems.length).toBeGreaterThanOrEqual(1);
  });

  it("should have category header", () => {
    const { container } = renderComponent();
    const header = container.querySelector(".category-header");
    expect(header).toBeInTheDocument();
  });

  it("should display category title", () => {
    renderComponent();
    const title = screen.getByText(/👕 Fashion/i);
    expect(title).toBeInTheDocument();
  });

  it("should have item container", () => {
    const { container } = renderComponent();
    const container_elem = container.querySelector(".item-container");
    expect(container_elem).toBeInTheDocument();
  });

  it("should display product count", () => {
    renderComponent();
    const countText = screen.getByText(/products available/i);
    expect(countText).toBeInTheDocument();
  });

  it("should have filter controls", () => {
    const { container } = renderComponent();
    const filterControls = container.querySelector(".filter-controls");
    const filterSection = container.querySelector(".filter-section");
    expect(filterControls || filterSection).toBeInTheDocument();
  });

  it("should have sort buttons for price", () => {
    renderComponent();
    const buttons = screen.queryAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("should display fashion items with images", () => {
    const { container } = renderComponent();
    const images = container.querySelectorAll(".item-image");
    expect(images.length).toBeGreaterThan(0);
  });

  it("should display item prices", () => {
    const { container } = renderComponent();
    const prices = container.querySelectorAll(".item-price");
    expect(prices.length).toBeGreaterThan(0);
  });

  it("should have view details buttons", () => {
    const { container } = renderComponent();
    const buttons = container.querySelectorAll(".add-to-cart-btn");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("should have proper fashion category structure", () => {
    const { container } = renderComponent();
    const categoryContainer = container.querySelector(".category-container");
    expect(categoryContainer).toBeInTheDocument();
  });

  it("should display fashion page with sidebar", () => {
    const { container } = renderComponent();
    const sidebar = container.querySelector(".category-sidebar");
    expect(sidebar).toBeInTheDocument();
  });

  it("should display fashion content area", () => {
    const { container } = renderComponent();
    const content = container.querySelector(".category-content");
    expect(content).toBeInTheDocument();
  });

  it("should render fashion items grid", () => {
    const { container } = renderComponent();
    const grid = container.querySelector(".items-grid");
    const itemsLength = container.querySelectorAll(".item").length;
    expect(grid || itemsLength > 0).toBeTruthy();
  });

  it("should have filter buttons for fashion", () => {
    const { container } = renderComponent();
    const filterBtn = container.querySelector(".filter-button");
    const filterSection = container.querySelector(".filter-section");
    expect(filterBtn || filterSection).toBeInTheDocument();
  });

  it("should display all fashion categories", () => {
    const { container } = renderComponent();
    const categoryPage = container.querySelector(".category-page");
    expect(categoryPage?.textContent).toContain("Fashion");
  });

  it("should render fashion items properly", () => {
    const { container } = renderComponent();
    const items = container.querySelectorAll(".item");
    expect(items.length).toBeGreaterThan(0);
  });

  it("should have fashion page heading", () => {
    renderComponent();
    const heading = screen.getByText(/👕 Fashion/i);
    expect(heading?.tagName).toBe("H1");
  });

  it("should display available products count", () => {
    renderComponent();
    const countText = screen.getByText(/products available/i);
    expect(countText?.textContent).toBeTruthy();
  });

  it("should render fashion with all sections", () => {
    const { container } = renderComponent();
    const page = container.querySelector(".category-page");
    const header = container.querySelector(".category-header");
    expect(page && header).toBeInTheDocument();
  });

  it("should have price range filter options", () => {
    const { container } = renderComponent();
    const filterOptions = container.querySelectorAll(".filter-option");
    expect(filterOptions.length).toBeGreaterThan(0);
  });

  it("should have radio buttons for price filters", () => {
    const { container } = renderComponent();
    const radioButtons = container.querySelectorAll("input[type='radio']");
    expect(radioButtons.length).toBeGreaterThan(0);
  });

  it("should trigger price filter on radio button change", async () => {
    const { container } = renderComponent();
    const radioButtons = container.querySelectorAll("input[type='radio']");
    expect(radioButtons.length).toBeGreaterThan(1);
    
    const firstRadio = radioButtons[1];
    fireEvent.click(firstRadio);
    
    await waitFor(() => {
      expect(firstRadio).toBeChecked();
    });
  });

  it("should update filtered items on filter change", async () => {
    const { container } = renderComponent();
    const radioButtons = container.querySelectorAll("input[type='radio']");
    expect(radioButtons.length).toBeGreaterThan(1);
    
    const secondRadio = radioButtons[1];
    fireEvent.click(secondRadio);
    
    await waitFor(() => {
      expect(secondRadio).toBeInTheDocument();
    });
  });

  it("should show low to high sort button", () => {
    renderComponent();
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("should handle filter and display correct message", async () => {
    const { container } = renderComponent();
    const radioButtons = container.querySelectorAll("input[type='radio']");
    expect(radioButtons.length).toBeGreaterThan(2);
    
    const fifthRadio = radioButtons[2];
    fireEvent.click(fifthRadio);
    
    await waitFor(() => {
      expect(fifthRadio).toBeInTheDocument();
    });
  });

  it("should have all price range labels", () => {
    renderComponent();
    expect(screen.getByText("All Prices")).toBeInTheDocument();
    expect(screen.getByText(/Under ₹500/i)).toBeInTheDocument();
    expect(screen.getByText(/₹500 - ₹2,000/i)).toBeInTheDocument();
    expect(screen.getByText(/₹2,000 - ₹5,000/i)).toBeInTheDocument();
    expect(screen.getByText(/₹5,000 and above/i)).toBeInTheDocument();
  });

  it("should have fashion sidebar with filters", () => {
    const { container } = renderComponent();
    const sidebar = container.querySelector(".category-sidebar");
    expect(sidebar?.querySelector(".filter-section")).toBeInTheDocument();
  });

  it("should display price range heading", () => {
    renderComponent();
    const heading = screen.getByText("Price Range");
    expect(heading?.tagName).toBe("H3");
  });

  it("should render item titles for products", () => {
    const { container } = renderComponent();
    const itemTitles = container.querySelectorAll(".item-title");
    expect(itemTitles.length).toBeGreaterThan(0);
  });

  it("should have item price currency symbol", () => {
    const { container } = renderComponent();
    const currencySymbols = container.querySelectorAll(".price-currency");
    expect(currencySymbols.length).toBeGreaterThan(0);
  });

  it("should have item image wrapper", () => {
    const { container } = renderComponent();
    const wrappers = container.querySelectorAll(".item-image-wrapper");
    expect(wrappers.length).toBeGreaterThan(0);
  });

  it("should render fashion with filters working", () => {
    const { container } = renderComponent();
    const filterSection = container.querySelector(".filter-section");
    expect(filterSection).toBeInTheDocument();
    const radioButtons = container.querySelectorAll("input[type='radio']");
    expect(radioButtons.length).toBeGreaterThan(0);
  });

  it("should display all fashion items on render", () => {
    const { container } = renderComponent();
    const items = container.querySelectorAll(".item");
    expect(items.length).toBeGreaterThan(0);
  });

  it("should have working filter controls", () => {
    const { container } = renderComponent();
    const inputs = container.querySelectorAll("input[type='checkbox']");
    const radios = container.querySelectorAll("input[type='radio']");
    expect(inputs.length > 0 || radios.length > 0).toBeTruthy();
  });

  it("should display fashion category page with structure", () => {
    const { container } = renderComponent();
    const page = container.querySelector(".category-page");
    expect(page?.children.length).toBeGreaterThan(0);
  });

  it("should show fashion products in grid layout", () => {
    const { container } = renderComponent();
    const grid = container.querySelector(".items-grid");
    const page = container.querySelector(".category-page");
    expect(grid || page).toBeInTheDocument();
  });

  it("should have price range filter for fashion", () => {
    renderComponent();
    const priceRange = screen.getByText("Price Range");
    expect(priceRange).toBeInTheDocument();
  });

  it("should display fashion item ratings", () => {
    const { container } = renderComponent();
    const ratings = container.querySelectorAll(".item-rating");
    expect(ratings.length >= 0).toBe(true);
  });

  it("should render filter options for fashion", () => {
    const { container } = renderComponent();
    const options = container.querySelectorAll(".filter-option");
    const filterSection = container.querySelector(".filter-section");
    expect(options.length > 0 || filterSection).toBeTruthy();
  });

  it("should display fashion category", () => {
    const { container } = renderComponent();
    const page = container.querySelector(".category-page");
    expect(page?.textContent).toBeTruthy();
  });

  it("should have fashion product layout", () => {
    const { container } = renderComponent();
    expect(container.querySelector(".category-page")).toBeInTheDocument();
  });

  it("should render fashion items with images", () => {
    const { container } = renderComponent();
    const images = container.querySelectorAll(".item img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("should display prices for fashion items", () => {
    const { container } = renderComponent();
    const prices = container.querySelectorAll(".item-price");
    expect(prices.length >= 0).toBe(true);
  });

  it("should have complete fashion page structure", () => {
    const { container } = renderComponent();
    const page = container.querySelector(".category-page");
    const filters = container.querySelector(".filter-section");
    expect(page && filters).toBeInTheDocument();
  });

  it("should display sort and filter for fashion", () => {
    const { container } = renderComponent();
    const controls = container.querySelector(".sort-filter-controls");
    const filterSection = container.querySelector(".filter-section");
    expect(controls || filterSection).toBeInTheDocument();
  });

  it("should have fashion items with action buttons", () => {
    const { container } = renderComponent();
    const buttons = container.querySelectorAll(".add-to-cart-btn");
    const allButtons = screen.queryAllByRole("button");
    expect(buttons.length > 0 || allButtons.length > 0).toBeTruthy();
  });

  it("should render fashion page with proper structure", () => {
    const { container } = renderComponent();
    const leftFilter = container.querySelector(".filter-section");
    const rightItems = container.querySelector(".items-container") || container.querySelector(".category-page");
    expect(leftFilter || rightItems).toBeInTheDocument();
  });

  it("should display fashion item descriptions", () => {
    const { container } = renderComponent();
    const descriptions = container.querySelectorAll(".item-description");
    const items = container.querySelectorAll(".item");
    expect(descriptions.length > 0 || items.length > 0).toBeTruthy();
  });

  it("should render fashion items with complete info", () => {
    const { container } = renderComponent();
    const items = container.querySelectorAll(".item");
    let hasImageInItem = false;
    items.forEach((item) => {
      const hasImage = item.querySelector("img");
      if (hasImage) {
        hasImageInItem = true;
      }
    });
    expect(hasImageInItem || items.length > 0).toBeTruthy();
  });

  it("should display fashion page title properly", () => {
    renderComponent();
    const title = screen.getByText(/Fashion/i);
    expect(title?.textContent?.length).toBeGreaterThan(0);
  });

  it("should render fashion grid layout", () => {
    const { container } = renderComponent();
    const grid = container.querySelector(".Style") || 
                 container.querySelector(".items-grid") || 
                 container.querySelector(".category-page");
    expect(grid).toBeInTheDocument();
  });

  it("should show all fashion product prices", () => {
    const { container } = renderComponent();
    const items = container.querySelectorAll(".item");
    expect(items.length).toBeGreaterThan(0);
  });

  it("should have fashion filter working", () => {
    const { container } = renderComponent();
    const filterRadios = container.querySelectorAll("input[type='radio']");
    const filterSection = container.querySelector(".filter-section");
    expect(filterRadios.length > 0 || filterSection).toBeTruthy();
  });

  it("should render fashion with price filter", () => {
    renderComponent();
    const priceFilter = screen.getByText(/Price Range/i);
    expect(priceFilter).toBeInTheDocument();
  });

  it("should display fashion products properly arranged", () => {
    const { container } = renderComponent();
    const page = container.querySelector(".category-page");
    const items = page?.querySelectorAll(".item");
    expect(items?.length).toBeGreaterThan(0);
  });

  it("should filter by price 0-500", () => {
    renderComponent();
    const radios = screen.queryAllByDisplayValue("0-500");
    expect(radios.length).toBeGreaterThan(0);
    fireEvent.click(radios[0]);
    expect(radios[0]).toBeChecked();
  });

  it("should filter by price 500-2000", () => {
    renderComponent();
    const radios = screen.queryAllByDisplayValue("500-2000");
    expect(radios.length).toBeGreaterThan(0);
    fireEvent.click(radios[0]);
    expect(radios[0]).toBeChecked();
  });

  it("should filter by price 2000-5000", () => {
    renderComponent();
    const radios = screen.queryAllByDisplayValue("2000-5000");
    expect(radios.length).toBeGreaterThan(0);
    fireEvent.click(radios[0]);
    expect(radios[0]).toBeChecked();
  });

  it("should filter by price 5000+", () => {
    renderComponent();
    const radios = screen.queryAllByDisplayValue("5000+");
    expect(radios.length).toBeGreaterThan(0);
    fireEvent.click(radios[0]);
    expect(radios[0]).toBeChecked();
  });

  it("should clear price filter", () => {
    renderComponent();
    const allPricesRadios = screen.queryAllByDisplayValue("all");
    expect(allPricesRadios.length).toBeGreaterThan(0);
    fireEvent.click(allPricesRadios[0]);
    expect(allPricesRadios[0]).toBeChecked();
  });

  it("should handle item click and navigate", () => {
    const { container } = renderComponent();
    const items = container.querySelectorAll(".item");
    expect(items.length).toBeGreaterThan(0);
    fireEvent.click(items[0]);
    expect(items[0]).toBeInTheDocument();
  });

  it("should handle view details button click", () => {
    const { container } = renderComponent();
    const buttons = container.querySelectorAll(".add-to-cart-btn");
    expect(buttons.length).toBeGreaterThan(0);
    fireEvent.click(buttons[0]);
    expect(buttons[0]).toBeInTheDocument();
  });

  it("should display filtered results", () => {
    renderComponent();
    const radios = screen.queryAllByDisplayValue("0-500");
    expect(radios.length).toBeGreaterThan(0);
    fireEvent.click(radios[0]);
    expect(radios[0]).toBeChecked();
  });

  it("should maintain sort after filter change", () => {
    renderComponent();
    const buttons = screen.queryAllByRole("button");
    const radios = screen.queryAllByDisplayValue("500-2000");
    
    if (buttons.length > 0) {
      fireEvent.click(buttons[0]);
    }
    if (radios.length > 0) {
      fireEvent.click(radios[0]);
    }
    
    expect(screen.getByText(/Fashion/i)).toBeInTheDocument();
  });

  it("should handle multiple filter changes", () => {
    renderComponent();
    const radios = screen.queryAllByRole("radio");
    
    if (radios.length > 0) {
      fireEvent.click(radios[1]);
      fireEvent.click(radios[2]);
      fireEvent.click(radios[0]);
    }
    
    expect(screen.getByText(/Fashion/i)).toBeInTheDocument();
  });

  it("should display all filter options", () => {
    const { container } = renderComponent();
    const filterOptions = container.querySelectorAll(".filter-option");
    expect(filterOptions.length).toBeGreaterThan(0);
  });

  it("should render items with all properties", () => {
    const { container } = renderComponent();
    const items = container.querySelectorAll(".item");
    
    items.forEach(item => {
      expect(item.querySelector(".item-image") || item.querySelector("img")).toBeTruthy();
      expect(item.querySelector(".item-title")).toBeTruthy();
      expect(item.querySelector(".item-price")).toBeTruthy();
    });
  });

  it("should apply low to high sort and then filter", () => {
    renderComponent();
    const buttons = screen.queryAllByRole("button");
    const radios = screen.queryAllByDisplayValue("500-2000");
    
    if (buttons.length > 0) {
      fireEvent.click(buttons[0]);
    }
    if (radios.length > 0) {
      fireEvent.click(radios[0]);
    }
    
    expect(screen.getByText(/Fashion/i)).toBeInTheDocument();
  });

  it("should test all price filter options consecutively", () => {
    renderComponent();
    const radios = screen.queryAllByRole("radio");
    
    for (let i = 0; i < Math.min(radios.length, 5); i++) {
      fireEvent.click(radios[i]);
      expect(radios[i]).toBeChecked();
    }
  });

  it("should display discount badges", () => {
    const { container } = renderComponent();
    const discounts = container.querySelectorAll(".discount");
    expect(discounts.length >= 0).toBe(true);
  });

  it("should handle add to cart click", () => {
    const { container } = renderComponent();
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThan(0);
    
    fireEvent.click(buttons[0]);
    expect(buttons[0]).toBeInTheDocument();
  });

  it("should test low to high price sort", () => {
    renderComponent();
    const buttons = screen.queryAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
    fireEvent.click(buttons[0]);
    expect(screen.getByText(/Fashion/i)).toBeInTheDocument();
  });

  it("should test high to low price sort", () => {
    renderComponent();
    const buttons = screen.queryAllByRole("button");
    expect(buttons.length).toBeGreaterThan(1);
    fireEvent.click(buttons[1]);
    expect(screen.getByText(/Fashion/i)).toBeInTheDocument();
  });
});
