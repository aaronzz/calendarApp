import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { useState, useEffect, useContext } from "react";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Itemprops } from "../model/model";
import IconButton from "@mui/material/IconButton";
import { addFavourite, removeFavourite, isFavouriteExist } from "../util/Util";
import { DateContext } from "../pages/Calendar";
export default function InsetList(props: Itemprops) {
  const [isFavourite, setFavourite] = useState<boolean>(false);
  const dateString = useContext(DateContext);

  useEffect(() => {
    const favouriteResult = isFavouriteExist(dateString, props.item.text);
    setFavourite(favouriteResult);
  }, [props.item]);

  return (
    <ListItem disablePadding>
      <IconButton
        edge="end"
        aria-label="delete"
        data-testid={`favourite-star-button`}
        onClick={() => {
          if (!isFavourite) {
            addFavourite(dateString, props.item.text);
          } else {
            removeFavourite(dateString, props.item.text);
          }
          setFavourite(!isFavourite);
        }}
      >
        {!isFavourite && <StarBorderIcon data-testid={`not-favourite-icon`} />}
        {isFavourite && <StarIcon data-testid={`favourite-icon`} />}
      </IconButton>
      <ListItemButton>
        <ListItemText primary={props.item.text} />
      </ListItemButton>
    </ListItem>
  );
}
