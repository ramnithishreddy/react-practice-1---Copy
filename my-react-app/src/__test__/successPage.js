import { render } from "@testing-library/react";
import SuccessPage from "../amazon/successPage";
import { render } from "@testing-library/react";
// import { BrowserRouter as Router } from "react-router-dom";

// const mockNavigate = jest.fn();

// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useNavigate: () => mockNavigate,
// }));

describe("SuccessPage", () => {
  it("should render", () => {
    render(<SuccessPage />);
  });
});
