import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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

  // it("should handle setSuggestions([]) when inputValue is empty", async () => {
  //   const inputElement = screen.queryByTestId("data");

  //   // await waitFor(() => {
  //   //   const suggestionsList = screen.queryByTestId("data");
  //   //   expect(suggestionsList).toBeNull();
  //   // });
  //   //   expect(inputElement).toHaveValue(undefined);
  //   fireEvent.click(inputElement, {
  //     target: { value: "UNIBIC Assorted(Pack of 10) Cookies  (750 g)" },
  //   });
  //   expect(screen.getByTestId("data")).toBeInTheDocument(
  //     "UNIBIC Assorted(Pack of 10) Cookies  (750 g)"
  //   );
  // });
});
