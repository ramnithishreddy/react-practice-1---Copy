import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should render Application", () => {
    render(<App />);
    expect(screen.getByTestId("App")).toBeInTheDocument();
  });
});
