import { render, screen } from "@testing-library/react";
import NoMatch from "../pages/NoMatch";

test("renders No match page", () => {
  render(<NoMatch />);
  const linkElement = screen.getByText(/This url is not available/i);
  expect(linkElement).toBeInTheDocument();
});
