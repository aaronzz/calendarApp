import List from "@mui/material/List";
import { ListProps, ListItemProps } from "../model/model";
import DisplayListItem from "./DisplayListItem";
export default function DisplayList(props: ListProps) {
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      aria-label="contacts"
    >
      {props?.items.map((item: ListItemProps, index: number) => {
        return <DisplayListItem item={item} key={index} />;
      })}
    </List>
  );
}
