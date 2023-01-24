import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { useState, useEffect } from "react";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Itemprops } from "../model/model";
import IconButton from "@mui/material/IconButton";
import { addFavourite, removeFavourite, isFavouriteExist } from "../util/Util";
export default function InsetList(props: Itemprops) {
  const [isFavourite, setFavourite] = useState<boolean>(false);
  useEffect(() => {
    const favouriteResult = isFavouriteExist(props.dateString, props.item.text);
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
            addFavourite(props.dateString, props.item.text);
          } else {
            removeFavourite(props.dateString, props.item.text);
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
