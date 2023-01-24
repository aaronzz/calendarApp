import Calendar from "../pages/Calendar";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import dayjs, { Dayjs } from "dayjs";
import { act } from "react-dom/test-utils";

describe("Test Calendar", () => {
  let originFetch: any;
  beforeEach(() => {
    originFetch = (global as any).fetch;
  });
  afterEach(() => {
    (global as any).fetch = originFetch;
  });
  it("should pass", async () => {
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
    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "a" },
    });
    const birthText = screen.getByText(/Birthdays /i);
    expect(birthText).toBeInTheDocument();
  });
});
