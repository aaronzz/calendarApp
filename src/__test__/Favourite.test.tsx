import { render, screen } from "@testing-library/react";
import Favourite from "../pages/Favourite";

const setLocalStorage = (data: any) => {
  window.localStorage.setItem("favouriteList", JSON.stringify(data));
};
describe("Set local storage to test listItem cases", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("data is added into local storage", () => {
    const mockJson = { "Jan 12": ["hello", "world"], "Feb 16": ["test"] };
    setLocalStorage(mockJson);
    render(<Favourite />);
    const title1 = screen.getByText(/Jan 12/i);
    const title2 = screen.getByText(/Feb 16/i);
    const item1 = screen.getByText(/hello/i);
    const item2 = screen.getByText(/world/i);
    const item3 = screen.getByText(/test/i);
    expect(title1).toBeInTheDocument();
    expect(title2).toBeInTheDocument();
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
    expect(item3).toBeInTheDocument();
  });
});
