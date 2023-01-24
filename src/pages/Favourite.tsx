import { getItem } from "../util/Util";
import AccordingItem from "../component/AccordionItem";
export default function Favourite() {
  const favouriteList = getItem();
  return (
    <>
      <label
        style={{ marginRight: "10px", fontSize: "20px", fontWeight: "700" }}
      >
        Favourite Birthdays
      </label>
      {favouriteList && Object.keys(favouriteList).sort((a:string, b:string) =>Date.parse(a)- Date.parse(b)).map((item, index) => {
        if (item && favouriteList[item].length > 0) {
          return (
            <AccordingItem
              title={item}
              list={favouriteList[item]}
              key={index}
            />
          );
        }
      })}
    </>
  );
}
