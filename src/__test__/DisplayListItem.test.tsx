import { fireEvent, render, screen } from "@testing-library/react";
import DisplayListItem from "../component/DisplayListItem";
import * as Util from "../util/Util";
import { DateContext } from "../pages/Calendar";
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
      <DateContext.Provider value={listItemProps1.dateString}>
        <DisplayListItem item={listItemProps1.item} />
      </DateContext.Provider>
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
      <DateContext.Provider value={listItemProps2.dateString}>
        <DisplayListItem item={listItemProps2.item} />
      </DateContext.Provider>
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
