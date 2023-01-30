import Calendar from "../pages/Calendar";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-dom/test-utils";

describe("Test Calendar", () => {
  let originFetch: any;
  beforeEach(() => {
    originFetch = (global as any).fetch;
    window.localStorage.clear();
  });
  afterEach(() => {
    (global as any).fetch = originFetch;
  });
  it("default render", async () => {
    const fakeResponse = {
      births: [
        {
          text: `abc`,
        },
        {
          text: `def`,
        },
      ],
    };
    const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes as any);
    (global as any).fetch = mockedFetch;
    await act(async () => render(<Calendar />));
    expect(mockedFetch).toHaveBeenCalled();

    // fireEvent.change( screen.getByTestId('calendar-input'), { target: { value: '2022-10-10' } });

    // expect( screen.getByTestId('calendar-input').value).toBe('2022-10-10');
    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "a" },
    });
    const birthText = screen.getByText(/Birthdays /i);
    expect(birthText).toBeInTheDocument();
  });

  it("load select Date from localStorage", async () => {
    window.localStorage.setItem("selectDate", `2023-01-22T22:07:59-05:00`);
    const mockJson = { "Jan 12": ["hello", "world"] };
    window.localStorage.setItem("favouriteList", JSON.stringify(mockJson));

    const fakeResponse = {
      births: [
        {
          text: `abc`,
        },
        {
          text: `def`,
        },
      ],
    };
    const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes as any);
    (global as any).fetch = mockedFetch;
    await act(async () => render(<Calendar />));
    const birthText = screen.getByTestId("calendarDateLabel");
    expect(birthText).toBeInTheDocument();
    expect(birthText).toHaveClass("dateLabel");
    expect(birthText.textContent).toBe("Birthdays on January 22");
  });

  it("load fetch cache from localStorage", async () => {
    window.localStorage.setItem("selectDate", `2023-01-22T22:07:59-05:00`);
    const mockJson = { "Jan 12": ["hello", "world"] };
    window.localStorage.setItem("favouriteList", JSON.stringify(mockJson));
    const mockCache = {
      births: [
        {
          text: `mockText1`,
        },
        {
          text: `mockText2`,
        },
      ],
    };
    window.localStorage.setItem(
      "https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/1/22",
      JSON.stringify(mockCache)
    );
    const fakeResponse = {
      births: [
        {
          text: `abc`,
        },
        {
          text: `def`,
        },
      ],
    };
    const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes as any);
    (global as any).fetch = mockedFetch;
    await act(async () => render(<Calendar />));
    expect(mockedFetch).toHaveBeenCalledTimes(0);
  });

  it("fetch error out", async () => {
    const fakeResponse = {
      error: `errorMessage`,
    };
    const mRes = { json: jest.fn().mockRejectedValueOnce(fakeResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes as any);
    (global as any).fetch = mockedFetch;
    await act(async () => render(<Calendar />));
    expect(mockedFetch).toHaveBeenCalledTimes(1);
  });
});
