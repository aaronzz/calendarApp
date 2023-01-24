import React, { useState, useEffect} from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import DisplayList from "../component/DisplayList";
import { ListItemProps } from "../model/model";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import "../style/App.css";
export default function Calendar() {
  const [selectDate, setselectDate] = useState<Dayjs | null>(dayjs());
  const [birthdays, setBirthdays] = useState<ListItemProps[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const cache = new Map();
  const MONTH = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  useEffect(() => {
    const month = selectDate?.month() || 0;
    const day = selectDate?.date();
    let url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${
      month + 1
    }/${day}`;
  
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        cache.set(url, json.birthdays)
        setBirthdays(json.births);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    if(cache.has(url)){
      setBirthdays(cache.get(url));
    }else{
      fetchData();
    }
  }, [selectDate]);

  const filteredList =
    searchString === ""
      ? birthdays
      : birthdays?.filter(
          (item) =>
            item.text.toLowerCase().indexOf(searchString.toLowerCase()) > -1
        );

  return (
    <div className="birthdayDisplay">
      <div className="leftPanel">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CalendarPicker
            date={selectDate}
            data-testid={`calendar-input`}
            onChange={(newValue) => {
              setselectDate(newValue);
            }}
          />
        </LocalizationProvider>
        <p className="dateLabel">{`Birthdays on ${
          MONTH[selectDate?.month() || 0]
        } ${selectDate?.date()}`}</p>
        <div className="searchPanel">
          <div className="searchInput">
            <label
              style={{
                marginRight: "10px",
                fontSize: "20px",
                lineHeight: "50px",
              }}
            >
              Search
            </label>
            <TextField
              id="outlined-name"
              label="Search"
              inputProps={{ "data-testid": "search-input" }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSearchString(event.target.value);
              }}
            />
          </div>
          <div className="loading">
            {loading && <CircularProgress className="center" />}
          </div>
        </div>
      </div>

      {!loading && (
        <div className="rightPanel">
          {filteredList.length > 0 && (
            <DisplayList
              items={filteredList}
              dateString={`${
                MONTH[selectDate?.month() || 0]
              } ${selectDate?.date()}`}
            />
          )}
        </div>
      )}
    </div>
  );
}
