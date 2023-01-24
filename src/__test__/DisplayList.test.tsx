import { render, screen } from "@testing-library/react";
import DisplayList from "../component/DisplayList";

it("renders DisplayList with mock data", () => {
  const accordingProps = [
    {
      text: "abc",
      isFavourite: false,
    },
  ];
  render(<DisplayList items={accordingProps} dateString={"Jan 21"} />);
  const title = screen.getByText(/abc/i);
});
