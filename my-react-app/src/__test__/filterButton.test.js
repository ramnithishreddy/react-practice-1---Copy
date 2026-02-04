import { render, screen, fireEvent } from "@testing-library/react";
import FilterButton from "../amazon/filterButton";

const mockLowToHigh = jest.fn();
const mockHighToLow = jest.fn();

describe("FilterButton Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render FilterButton component", () => {
    render(
      <FilterButton handleLowToHigh={mockLowToHigh} handleHighToLow={mockHighToLow} />
    );
    const filterControls = document.querySelector(".filter-controls");
    expect(filterControls).toBeInTheDocument();
  });

  it("should display sort container", () => {
    render(
      <FilterButton handleLowToHigh={mockLowToHigh} handleHighToLow={mockHighToLow} />
    );
    const sortContainer = document.querySelector(".sort-container");
    expect(sortContainer).toBeInTheDocument();
  });

  it("should display sort buttons", () => {
    render(
      <FilterButton handleLowToHigh={mockLowToHigh} handleHighToLow={mockHighToLow} />
    );
    const buttons = document.querySelectorAll(".sort-btn");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("should have low to high sort button", () => {
    render(
      <FilterButton handleLowToHigh={mockLowToHigh} handleHighToLow={mockHighToLow} />
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it("should have high to low sort button", () => {
    render(
      <FilterButton handleLowToHigh={mockLowToHigh} handleHighToLow={mockHighToLow} />
    );
    const buttons = document.querySelectorAll(".sort-btn");
    expect(buttons[1]).toBeInTheDocument();
  });

  it("should trigger handleLowToHigh on button click", () => {
    render(
      <FilterButton handleLowToHigh={mockLowToHigh} handleHighToLow={mockHighToLow} />
    );
    const buttons = document.querySelectorAll(".sort-btn");
    fireEvent.click(buttons[0]);
    expect(mockLowToHigh).toHaveBeenCalled();
  });

  it("should trigger handleHighToLow on button click", () => {
    render(
      <FilterButton handleLowToHigh={mockLowToHigh} handleHighToLow={mockHighToLow} />
    );
    const buttons = document.querySelectorAll(".sort-btn");
    fireEvent.click(buttons[1]);
    expect(mockHighToLow).toHaveBeenCalled();
  });

  it("should update active button on sort", () => {
    render(
      <FilterButton handleLowToHigh={mockLowToHigh} handleHighToLow={mockHighToLow} />
    );
    const buttons = document.querySelectorAll(".sort-btn");
    fireEvent.click(buttons[0]);
    expect(buttons[0].className).toContain("active");
  });

  it("should toggle active state on button clicks", () => {
    render(
      <FilterButton handleLowToHigh={mockLowToHigh} handleHighToLow={mockHighToLow} />
    );
    const buttons = document.querySelectorAll(".sort-btn");
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
    expect(buttons[1].className).toContain("active");
  });

  it("should display sort icon", () => {
    render(
      <FilterButton handleLowToHigh={mockLowToHigh} handleHighToLow={mockHighToLow} />
    );
    const sortIcon = document.querySelector(".sort-icon");
    expect(sortIcon).toBeInTheDocument();
  });

  it("should display sort label text", () => {
    render(
      <FilterButton handleLowToHigh={mockLowToHigh} handleHighToLow={mockHighToLow} />
    );
    const sortLabel = document.querySelector(".sort-label");
    expect(sortLabel).toBeInTheDocument();
  });

  it("should render both sort buttons", () => {
    render(
      <FilterButton handleLowToHigh={mockLowToHigh} handleHighToLow={mockHighToLow} />
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(2);
  });

  it("should handle multiple clicks on same button", () => {
    render(
      <FilterButton handleLowToHigh={mockLowToHigh} handleHighToLow={mockHighToLow} />
    );
    const buttons = document.querySelectorAll(".sort-btn");
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[0]);
    expect(mockLowToHigh).toHaveBeenCalledTimes(2);
  });

  it("should have proper filter structure", () => {
    const { container } = render(
      <FilterButton handleLowToHigh={mockLowToHigh} handleHighToLow={mockHighToLow} />
    );
    const filterControls = container.querySelector(".filter-controls");
    expect(filterControls?.children.length).toBeGreaterThan(0);
  });

  it("should display sort controls properly", () => {
    render(
      <FilterButton handleLowToHigh={mockLowToHigh} handleHighToLow={mockHighToLow} />
    );
    const sortContainer = document.querySelector(".sort-container");
    expect(sortContainer?.textContent).toBeTruthy();
  });

  it("should handle rapid button clicks", () => {
    render(
      <FilterButton handleLowToHigh={mockLowToHigh} handleHighToLow={mockHighToLow} />
    );
    const buttons = document.querySelectorAll(".sort-btn");
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
    fireEvent.click(buttons[0]);
    expect(mockLowToHigh).toHaveBeenCalledTimes(2);
    expect(mockHighToLow).toHaveBeenCalledTimes(1);
  });

  it("should render filter button with all elements", () => {
    render(
      <FilterButton handleLowToHigh={mockLowToHigh} handleHighToLow={mockHighToLow} />
    );
    const filterControls = document.querySelector(".filter-controls");
    const sortContainer = filterControls?.querySelector(".sort-container");
    const sortIcon = filterControls?.querySelector(".sort-icon");
    const sortLabel = filterControls?.querySelector(".sort-label");
    const buttons = filterControls?.querySelectorAll(".sort-btn");
    
    expect(sortContainer).toBeInTheDocument();
    expect(sortIcon).toBeInTheDocument();
    expect(sortLabel).toBeInTheDocument();
    expect(buttons?.length).toBe(2);
  });
});

