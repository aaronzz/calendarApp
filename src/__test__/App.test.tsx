import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

test("renders App page", () => {
  render(<App />);
  const linkElement = screen.getByText(/HOME/i);
  expect(linkElement).toBeInTheDocument();
  const homeButton = screen.getByTestId("layout-home");
  fireEvent.click(homeButton);
  const birthText = screen.getByText(/Birthdays /i);
  expect(birthText).toBeInTheDocument();
});
