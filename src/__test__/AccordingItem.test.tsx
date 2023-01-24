import { render, screen } from "@testing-library/react";
import AccordingItem from "../component/AccordionItem";

it("renders AccordingItem with mock data", () => {
  const accordingProps = {
    title: "myTitle",
    list: ["a", "b"],
  };
  render(
    <AccordingItem title={accordingProps.title} list={accordingProps.list} />
  );
  const title = screen.getByText(/myTitle/i);
  expect(title).toBeInTheDocument();
  const text1 = screen.getByText(/a/i);
  expect(text1).toBeInTheDocument();
  const text2 = screen.getByText(/b/i);
  expect(text2).toBeInTheDocument();
});
