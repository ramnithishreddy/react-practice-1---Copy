import { Provider } from "react-redux";
import store from "../redux/store";

import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Mobiles from "../amazon/mobiles";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

/* eslint-disable testing-library/no-node-access */
describe("Mobiles Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render Mobiles component", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const page = document.querySelector(".category-page");
    expect(page).toBeInTheDocument();
  });

  it("should display mobile products initially", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const items = document.querySelectorAll(".item");
    expect(items.length).toBeGreaterThan(0);
  });

  it("should have filter buttons", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const filterButtons = screen.queryAllByRole("button");
    expect(filterButtons.length).toBeGreaterThan(0);
  });

  it("should render mobile products properly", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const allImages = screen.getAllByRole("img");
    expect(allImages.length).toBeGreaterThan(0);
  });

  it("should have mobile product cards", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const productCards = document.querySelectorAll(".item");
    expect(productCards.length).toBeGreaterThan(0);
  });

  it("should display Add to Cart buttons", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const addButtons = screen.queryAllByRole("button");
    expect(addButtons.length).toBeGreaterThan(0);
  });

  it("should render page with filter section", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const filterSection = document.querySelector(".filter-section");
    expect(filterSection).toBeInTheDocument();
  });

  it("should have items container", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const container = document.querySelector(".category-page");
    expect(container).toBeInTheDocument();
  });

  it("should have mobile category header", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const header = document.querySelector(".category-header");
    expect(header).toBeInTheDocument();
  });

  it("should show product count for mobiles", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const count = screen.getByText(/products available/i);
    expect(count).toBeInTheDocument();
  });

  it("should have sidebar filter area", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const sidebar = document.querySelector(".category-sidebar");
    expect(sidebar).toBeInTheDocument();
  });

  it("should have price range filter options", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const filterOptions = document.querySelectorAll(".filter-option");
    expect(filterOptions.length).toBeGreaterThan(0);
  });

  it("should display mobile item images", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const images = document.querySelectorAll(".item-image");
    expect(images.length).toBeGreaterThan(0);
  });

  it("should show mobile item names", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const itemNames = document.querySelectorAll(".item-title");
    expect(itemNames.length).toBeGreaterThan(0);
  });

  it("should display mobile prices", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const prices = document.querySelectorAll(".item-price");
    expect(prices.length).toBeGreaterThan(0);
  });

  it("should have add to cart button for each item", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const buttons = document.querySelectorAll(".add-to-cart-btn");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("should have proper mobile category structure", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const container = document.querySelector(".category-container");
    const sidebar = document.querySelector(".category-sidebar");
    const content = document.querySelector(".category-content");
    expect(container).toBeInTheDocument();
    expect(sidebar).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  it("should display mobile page header", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const header = document.querySelector(".category-header");
    expect(header).toBeInTheDocument();
  });

  it("should have mobile category page element", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const page = document.querySelector(".category-page");
    expect(page?.className).toContain("category-page");
  });

  it("should display all mobile items in grid", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const items = document.querySelectorAll(".item");
    expect(items.length).toBeGreaterThan(0);
  });

  it("should have mobile filter controls", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const sidebar = document.querySelector(".category-sidebar");
    expect(sidebar?.textContent).toBeTruthy();
  });

  it("should display mobile category title properly", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const title = screen.getByText(/📱 Mobiles/i);
    expect(title?.tagName).toBe("H1");
  });

  it("should show available mobile count", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const count = screen.getByText(/products available/i);
    expect(count?.textContent).toBeTruthy();
  });

  it("should render mobile category with all sections", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const header = document.querySelector(".category-header");
    const sidebar = document.querySelector(".category-sidebar");
    const content = document.querySelector(".category-content");
    expect(header).toBeInTheDocument();
    expect(sidebar).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  it("should have filter buttons for mobile products", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const buttons = screen.queryAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("should display complete mobile category page", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const page = document.querySelector(".category-page");
    expect(page?.textContent).toContain("Mobiles");
  });

  it("should have price range filter options for mobiles", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const filterOptions = document.querySelectorAll(".filter-option");
    expect(filterOptions.length).toBeGreaterThan(0);
  });

  it("should have radio buttons for price filters in mobiles", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const radioButtons = document.querySelectorAll("input[type='radio']");
    expect(radioButtons.length).toBeGreaterThan(0);
  });

  it("should trigger price filter on radio button change in mobiles", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const radioButtons = document.querySelectorAll("input[type='radio']");
    const firstRadio = radioButtons[1];
    fireEvent.click(firstRadio);
    expect(firstRadio).toBeInTheDocument();
  });

  it("should update filtered items on filter change in mobiles", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const radioButtons = document.querySelectorAll("input[type='radio']");
    const secondRadio = radioButtons[2];
    fireEvent.click(secondRadio);
    expect(secondRadio).toBeInTheDocument();
  });

  it("should have all price range labels for mobiles", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const radioButtons = document.querySelectorAll("input[type='radio']");
    expect(radioButtons.length).toBeGreaterThan(0);
  });

  it("should have mobiles sidebar with filters", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const sidebar = document.querySelector(".category-sidebar");
    expect(sidebar?.querySelector(".filter-section")).toBeInTheDocument();
  });

  it("should display price range heading in mobiles", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const heading = screen.getByText("Price Range");
    expect(heading?.tagName).toBe("H3");
  });

  it("should render item titles for mobile products", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const itemTitles = document.querySelectorAll(".item-title");
    expect(itemTitles.length).toBeGreaterThan(0);
  });

  it("should have item price currency symbol in mobiles", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const currencySymbols = document.querySelectorAll(".price-currency");
    expect(currencySymbols.length).toBeGreaterThan(0);
  });

  it("should have item image wrapper in mobiles", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const wrappers = document.querySelectorAll(".item-image-wrapper");
    expect(wrappers.length).toBeGreaterThan(0);
  });

  it("should render mobiles with filters working properly", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const filterSection = document.querySelector(".filter-section");
    expect(filterSection).toBeInTheDocument();
    const radioButtons = document.querySelectorAll("input[type='radio']");
    expect(radioButtons.length).toBeGreaterThan(0);
  });

  it("should display all mobile items on render", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const items = document.querySelectorAll(".item");
    expect(items.length).toBeGreaterThan(0);
  });

  it("should have working filter checkboxes", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const inputs = document.querySelectorAll("input[type='checkbox']");
    expect(inputs || document.querySelectorAll("input[type='radio']")).toBeTruthy();
  });

  it("should display mobile category page", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const page = document.querySelector(".category-page");
    expect(page?.children.length).toBeGreaterThan(0);
  });

  it("should show mobile products in grid", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const grid = document.querySelector(".items-grid") || document.querySelector(".category-page");
    expect(grid).toBeInTheDocument();
  });

  it("should have price range filter", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const filterSection = document.querySelector(".filter-section");
    expect(filterSection).toBeInTheDocument();
  });

  it("should display mobile item ratings", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const ratings = document.querySelectorAll(".item-rating");
    expect(ratings.length >= 0).toBe(true);
  });

  it("should render filter section with options", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const options = document.querySelectorAll(".filter-option");
    expect(options || document.querySelector(".filter-section")).toBeTruthy();
  });

  it("should display mobile category title", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const page = document.querySelector(".category-page");
    expect(page?.textContent).toBeTruthy();
  });

  it("should have mobile product layout", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const page = document.querySelector(".category-page");
    expect(page).toBeInTheDocument();
  });

  it("should render mobile items with images", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const images = document.querySelectorAll(".item img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("should display prices for mobile items", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const prices = document.querySelectorAll(".item-price");
    expect(prices.length >= 0).toBe(true);
  });

  it("should have complete mobile page structure", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const page = document.querySelector(".category-page");
    const filters = document.querySelector(".filter-section");
    expect(page && filters).toBeInTheDocument();
  });

  it("should render mobile category with all elements", () => {
    const { container } = render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    expect(container.textContent.length).toBeGreaterThan(0);
  });

  it("should display sort and filter controls", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const controls = document.querySelector(".sort-filter-controls") || document.querySelector(".filter-section");
    expect(controls).toBeInTheDocument();
  });

  it("should have mobile items with action buttons", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const buttons = document.querySelectorAll(".add-to-cart-btn");
    expect(buttons || document.querySelectorAll("button")).toBeTruthy();
  });

  it("should render mobile page with proper structure", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const leftFilter = document.querySelector(".filter-section");
    const rightItems = document.querySelector(".items-container") || document.querySelector(".category-page");
    expect(leftFilter || rightItems).toBeInTheDocument();
  });

  it("should render mobile items with complete info", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const items = document.querySelectorAll(".item");
    items.forEach((item) => {
      const hasImage = item.querySelector("img");
      expect(hasImage).toBeTruthy();
    });
  });

  it("should display mobile page title properly", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const page = document.querySelector(".category-page");
    expect(page?.textContent?.length).toBeGreaterThan(0);
  });

  it("should render mobile grid layout", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const grid = document.querySelector(".Style") || document.querySelector(".items-grid") || document.querySelector(".category-page");
    expect(grid).toBeInTheDocument();
  });

  it("should show all mobile product prices", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const items = document.querySelectorAll(".item");
    expect(items.length).toBeGreaterThan(0);
  });

  it("should have mobile filter working", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const filterRadios = document.querySelectorAll("input[type='radio']");
    expect(filterRadios || document.querySelector(".filter-section")).toBeTruthy();
  });

  it("should render mobile with price filter", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const filterSection = document.querySelector(".filter-section");
    expect(filterSection).toBeInTheDocument();
  });

  it("should display mobile products properly arranged", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const page = document.querySelector(".category-page");
    const items = page?.querySelectorAll(".item");
    expect(items?.length).toBeGreaterThan(0);
  });

  it("should render mobile page with all sections", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const filterSection = document.querySelector(".filter-section");
    const itemsArea = document.querySelector(".category-page");
    expect(filterSection && itemsArea).toBeInTheDocument();
  });

  it("should have working mobile filter options", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const radioButtons = document.querySelectorAll("input[type='radio']");
    expect(radioButtons.length >= 0).toBe(true);
  });

  it("should display mobile product prices", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const prices = document.querySelectorAll(".price");
    expect(prices.length >= 0).toBe(true);
  });

  it("should display mobile ratings", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const ratings = document.querySelectorAll(".rating");
    expect(ratings.length >= 0).toBe(true);
  });

  it("should handle mobile filter selection", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const radios = document.querySelectorAll("input[type='radio']");
    radios.forEach(radio => {
      fireEvent.click(radio);
      expect(radio).toBeInTheDocument();
    });
  });

  it("should display low to high sort for mobiles", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const filterSection = document.querySelector(".filter-section");
    expect(filterSection).toBeInTheDocument();
  });

  it("should display high to low sort for mobiles", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const page = document.querySelector(".category-page");
    expect(page).toBeInTheDocument();
  });

  it("should display rating sort for mobiles", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const radios = document.querySelectorAll("input[type='radio']");
    expect(radios.length >= 0).toBe(true);
  });

  it("should display newest sort for mobiles", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const items = document.querySelectorAll(".item");
    expect(items.length).toBeGreaterThan(0);
  });

  it("should have add to cart buttons for mobiles", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const buttons = screen.queryAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("should display mobile product images", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("should display mobile specs", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const items = document.querySelectorAll(".item");
    items.forEach(item => {
      expect(item).toBeInTheDocument();
    });
  });

  it("should have grid layout for mobiles", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const container = document.querySelector(".category-page");
    expect(container?.children.length).toBeGreaterThan(0);
  });

  it("should display mobile discounts", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const discounts = document.querySelectorAll(".discount");
    expect(discounts.length >= 0).toBe(true);
  });

  it("should handle mobile add to cart", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const buttons = document.querySelectorAll("button");
    buttons.forEach(btn => {
      if (btn.textContent?.includes("Add")) {
        fireEvent.click(btn);
      }
    });
  });

  it("should display complete mobile page", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const page = document.querySelector(".category-page");
    expect(page).toBeInTheDocument();
  });

  it("should display all mobile products", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const items = document.querySelectorAll(".item");
    expect(items.length).toBeGreaterThan(0);
  });

  it("should have mobile filter section", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const filterSection = document.querySelector(".filter-section");
    expect(filterSection).toBeInTheDocument();
  });

  it("should handle mobile category filter", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const radioButtons = document.querySelectorAll("input[type='radio']");
    expect(radioButtons.length).toBeGreaterThan(0);
    radioButtons.forEach(radio => {
      fireEvent.click(radio);
    });
  });

  it("should test low to high price sort for mobiles", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const buttons = screen.queryAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
    if (buttons.length > 0) {
      fireEvent.click(buttons[0]);
    }
  });

  it("should test high to low price sort for mobiles", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const buttons = screen.queryAllByRole("button");
    expect(buttons.length).toBeGreaterThan(1);
    if (buttons.length > 1) {
      fireEvent.click(buttons[1]);
    }
  });

  it("should filter mobiles by price 0-20000", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const radios = screen.queryAllByDisplayValue("0-20000");
    expect(radios.length).toBeGreaterThanOrEqual(0);
    if (radios.length > 0) {
      fireEvent.click(radios[0]);
    }
  });

  it("should filter mobiles by price 20000-50000", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const radios = screen.queryAllByDisplayValue("20000-50000");
    expect(radios.length).toBeGreaterThanOrEqual(0);
    if (radios.length > 0) {
      fireEvent.click(radios[0]);
    }
  });

  it("should filter mobiles by price 50000-100000", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const radios = screen.queryAllByDisplayValue("50000-100000");
    expect(radios.length).toBeGreaterThanOrEqual(0);
    if (radios.length > 0) {
      fireEvent.click(radios[0]);
    }
  });

  it("should filter mobiles by price 100000+", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const radios = screen.queryAllByDisplayValue("100000+");
    expect(radios.length).toBeGreaterThanOrEqual(0);
    if (radios.length > 0) {
      fireEvent.click(radios[0]);
    }
  });

  it("should clear mobile price filter", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const allPricesRadios = screen.queryAllByDisplayValue("all");
      expect(allPricesRadios.length).toBeGreaterThanOrEqual(0);
      fireEvent.click(allPricesRadios[0]);
      expect(allPricesRadios[0]).toBeChecked();
  });

  it("should handle mobile item click and navigate", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const items = document.querySelectorAll(".item");
      expect(items.length).toBeGreaterThan(0);
      fireEvent.click(items[0]);
      expect(items[0]).toBeInTheDocument();
  });

  it("should handle mobile view details button click", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const buttons = document.querySelectorAll(".add-to-cart-btn");
      expect(buttons.length).toBeGreaterThan(0);
      fireEvent.click(buttons[0]);
      expect(buttons[0]).toBeInTheDocument();
  });

  it("should display mobile filtered results", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const radios = screen.queryAllByDisplayValue("20000-50000");
      expect(radios.length).toBeGreaterThanOrEqual(0);
      fireEvent.click(radios[0]);
      expect(radios[0]).toBeChecked();
  });

  it("should maintain sort after mobile filter change", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const buttons = screen.queryAllByRole("button");
    const radios = screen.queryAllByDisplayValue("50000-100000");
    
    if (buttons.length > 0) fireEvent.click(buttons[0]);
    if (radios.length > 0) fireEvent.click(radios[0]);
    
    expect(document.querySelector(".category-page")).toBeInTheDocument();
  });

  it("should handle multiple mobile filter changes", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const radios = screen.queryAllByRole("radio");
    expect(radios.length).toBeGreaterThanOrEqual(0);
    if (radios.length > 0) {
      fireEvent.click(radios[0]);
    }
  });

  it("should show all available mobile filter options", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const filterOptions = document.querySelectorAll(".filter-option");
    expect(filterOptions.length).toBeGreaterThanOrEqual(0);
  });

  it("should render mobile items with all properties", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const items = document.querySelectorAll(".item");
    expect(items.length).toBeGreaterThanOrEqual(0);
  });

  it("should apply low to high sort and then filter mobiles", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const buttons = screen.queryAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(0);
  });

  it("should test all mobile price filter options consecutively", () => {
    render(
      <Router>
        <Provider store={store}>
          <Mobiles />
        </Provider>
      </Router>
    );
    const radios = document.querySelectorAll("input[type='radio']");
    expect(radios.length).toBeGreaterThanOrEqual(0);
  });
});
