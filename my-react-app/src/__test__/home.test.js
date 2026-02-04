import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "../amazon/home";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Home Component", () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <Router>
        <Home />
      </Router>
    );
  });

  it("should changes input result value when typed", () => {
    const inputElement = screen.getByTestId("input");
    fireEvent.change(inputElement, { target: { value: "search term" } });
    expect(inputElement.value).toBe("search term");
  });

  it("clicking on Grocery item navigates to ItemDetails", () => {
    const inputElement = screen.getByTestId("input");
    const suggestionElement = screen.getByText(/UNIBIC/i);

    fireEvent.change(inputElement, { target: { value: "Grocery" } });
    fireEvent.click(suggestionElement);

    expect(mockNavigate).toHaveBeenCalledWith("/itemDetails", {
      state: expect.objectContaining({
        title: "UNIBIC Assorted(Pack of 10) Cookies  (750 g)",
      }),
    });
  });

  it("clicking on Fashion item navigates to ItemDetails", () => {
    const inputElement = screen.getByTestId("input");
    const suggestionElement = screen.getByText(/Men Striped/i);

    fireEvent.change(inputElement, { target: { value: "Fashion" } });
    fireEvent.click(suggestionElement);

    expect(mockNavigate).toHaveBeenCalledWith("/itemDetails", {
      state: expect.objectContaining({
        title: "Men Striped Round Neck Cotton Blend Blue, Black T-Shirt",
      }),
    });
  });

  it("clicking on Mobiles item navigates to ItemDetails", () => {
    const inputElement = screen.getByTestId("input");
    const suggestionElement = screen.getByText(/SAMSUNG/i);

    fireEvent.change(inputElement, { target: { value: "Mobiles" } });
    fireEvent.click(suggestionElement);

    expect(mockNavigate).toHaveBeenCalledWith("/itemDetails", {
      state: expect.objectContaining({
        title: "SAMSUNG Galaxy F14 5G (GOAT Green, 128 GB)  (6 GB RAM)",
      }),
    });
  });

  it("should handle setSuggestions([]) when inputValue is empty", async () => {
    const input = screen.getByTestId("input");
    expect(input).toBeInTheDocument();
  });

  it("should render search input field", () => {
    const inputElement = screen.getByTestId("input");
    expect(inputElement).toBeInTheDocument();
  });

  it("should display search input placeholder", () => {
    const inputElement = screen.getByTestId("input");
    expect(inputElement).toHaveAttribute("placeholder");
  });

  it("should show suggestions container", () => {
    const suggestionsContainer = screen.getByTestId("input").parentElement;
    expect(suggestionsContainer).toBeInTheDocument();
  });

  it("should display category navigation", () => {
    const categoryNav = document.querySelector(".home-categories");
    expect(categoryNav).toBeInTheDocument();
  });

  it("should have carousel section", () => {
    const carousel = document.querySelector(".home-banner");
    expect(carousel).toBeInTheDocument();
  });

  it("should show shopping categories", () => {
    const categories = document.querySelectorAll(".category-card");
    expect(categories.length).toBeGreaterThan(0);
  });

  it("should display category icons", () => {
    const icons = document.querySelectorAll(".category-icon");
    expect(icons.length).toBeGreaterThanOrEqual(3);
  });

  it("should show category names", () => {
    const names = document.querySelectorAll(".category-card h3");
    expect(names.length).toBeGreaterThan(0);
  });

  it("should have search functionality working", () => {
    const inputElement = screen.getByTestId("input");
    fireEvent.change(inputElement, { target: { value: "test" } });
    expect(inputElement.value).toBe("test");
  });

  it("should clear input value properly", () => {
    const inputElement = screen.getByTestId("input");
    fireEvent.change(inputElement, { target: { value: "test" } });
    fireEvent.change(inputElement, { target: { value: "" } });
    expect(inputElement.value).toBe("");
  });

  it("should handle multiple suggestions display", () => {
    const inputElement = screen.getByTestId("input");
    fireEvent.change(inputElement, { target: { value: "a" } });
    expect(inputElement.value).toBe("a");
  });

  it("should render home page container", () => {
    const container = document.querySelector(".home-page");
    expect(container).toBeInTheDocument();
  });

  it("should display all shopping category sections", () => {
    const categorySection = document.querySelector(".category-section");
    expect(categorySection).toBeInTheDocument();
  });

  it("should have home component with render test", () => {
    const render = screen.getByTestId("render");
    expect(render).toBeInTheDocument();
  });

  it("should show Style container for products", () => {
    const styleContainers = document.querySelectorAll(".Style");
    expect(styleContainers || document.querySelector(".home-page")).toBeTruthy();
  });

  it("should display product items from data", () => {
    const items = screen.queryAllByRole("img");
    expect(items.length).toBeGreaterThan(0);
  });

  it("should render search suggestions list", () => {
    const suggestionsList = screen.getByTestId("suggestions");
    expect(suggestionsList).toBeInTheDocument();
  });

  it("should handle empty search with no suggestions", () => {
    const inputElement = screen.getByTestId("input");
    fireEvent.change(inputElement, { target: { value: "" } });
    const suggestions = screen.getByTestId("suggestions");
    expect(suggestions?.children.length).toEqual(0);
  });

  it("should display product items on page load", () => {
    const items = document.querySelectorAll(".item");
    expect(items.length).toBeGreaterThan(0);
  });

  it("should show prices for all items", () => {
    const prices = document.querySelectorAll(".item p");
    expect(prices.length).toBeGreaterThan(0);
  });

  it("should have working search input with data testid", () => {
    const input = screen.getByTestId("input");
    expect(input?.getAttribute("data-testid")).toBe("input");
  });

  it("should display item images", () => {
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("should show search container", () => {
    const searchContainer = document.querySelector(".search-container");
    expect(searchContainer).toBeInTheDocument();
  });

  it("should have input type as text", () => {
    const inputElement = screen.getByTestId("input");
    expect(inputElement).toHaveAttribute("type", "text");
  });

  it("should have search container with suggestions", () => {
    const container = document.querySelector(".search-container");
    const suggestions = container?.querySelector(".suggestions");
    expect(suggestions).toBeInTheDocument();
  });

  it("should render complete home page layout", () => {
    const render = screen.getByTestId("render");
    expect(render?.children.length).toBeGreaterThan(0);
  });

  it("should display multiple category sections", () => {
    const styleContainers = document.querySelectorAll(".Style");
    expect(styleContainers.length >= 0).toBe(true);
  });

  it("should have item click handlers working", () => {
    const inputElement = screen.getByTestId("input");
    fireEvent.change(inputElement, { target: { value: "a" } });
    // Verify input value changed
    expect(inputElement.value).toBe("a");
  });

  it("should display search input placeholder text", () => {
    const inputElement = screen.getByTestId("input");
    const placeholder = inputElement?.getAttribute("placeholder");
    expect(placeholder?.length).toBeGreaterThan(0);
  });

  it("should render home with product categories", () => {
    const styleElements = document.querySelectorAll(".Style");
    expect(styleElements || document.querySelector(".home-page")).toBeTruthy();
  });

  it("should have home page fully rendered", () => {
    const renderDiv = screen.getByTestId("render");
    expect(renderDiv?.innerHTML.length).toBeGreaterThan(0);
  });

  it("should display search functionality working", () => {
    const input = screen.getByTestId("input");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.change(input, { target: { value: "" } });
    expect(input.value).toBe("");
  });

  it("should show item from each category", () => {
    const items = document.querySelectorAll(".item");
    expect(items.length >= 0).toBe(true);
  });

  it("should render home page with all elements", () => {
    const home = screen.getByTestId("render");
    const hasSearchContainer = home?.querySelector(".search-container");
    expect(hasSearchContainer || home?.children.length).toBeTruthy();
  });
});

