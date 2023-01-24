import { fireEvent, render, screen } from "@testing-library/react";
import DisplayListItem from "../component/DisplayListItem";
import * as Util from "../util/Util";
const listItemProps1 = {
  item: {
    text: "hello",
    isFavourite: true,
  },
  dateString: "Jan 12",
};

const listItemProps2 = {
  item: {
    text: "world",
    isFavourite: false,
  },
  dateString: "Feb 24",
};
const setLocalStorage = (data: any) => {
  window.localStorage.setItem("favouriteList", JSON.stringify(data));
};
describe("Set local storage to test listItem cases", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("data is added into local storage", () => {
    const mockJson = { "Jan 12": ["hello", "world"] };
    setLocalStorage(mockJson);
    const spy = jest.spyOn(Util, "removeFavourite");
    render(
      <DisplayListItem
        item={listItemProps1.item}
        dateString={listItemProps1.dateString}
      />
    );
    const title = screen.getByText(/hello/i);
    expect(title).toBeInTheDocument();
    const star = screen.getByTestId("favourite-icon");
    expect(star).toBeInTheDocument();
    const button = screen.getByTestId("favourite-star-button");
    fireEvent.click(button);
    expect(spy).toHaveBeenCalled();
  });

  it("data is added into local storage", () => {
    const mockJson = { "Jan 12": ["hello", "world"] };
    setLocalStorage(mockJson);
    const spy = jest.spyOn(Util, "addFavourite");
    render(
      <DisplayListItem
        item={listItemProps2.item}
        dateString={listItemProps2.dateString}
      />
    );
    const title = screen.getByText(/world/i);
    expect(title).toBeInTheDocument();
    const non_star = screen.getByTestId("not-favourite-icon");
    expect(non_star).toBeInTheDocument();
    const button = screen.getByTestId("favourite-star-button");
    fireEvent.click(button);
    expect(spy).toHaveBeenCalled();
  });
});
