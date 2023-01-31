import React, { useState, useEffect, createContext } from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import DisplayList from "../component/DisplayList";
import { ListItemProps } from "../model/model";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import "../style/App.css";
export const DateContext = createContext("dateString");

export default function Calendar() {
  const [selectDate, setselectDate] = useState<Dayjs | null>(() => {
    const selectDateString = localStorage.getItem("selectDate");
    if (selectDateString !== null && selectDateString !== `undefined`) {
      const dateFromString = dayjs(selectDateString);
      return dateFromString;
    } else {
      return dayjs();
    }
  });
  const [birthdays, setBirthdays] = useState<ListItemProps[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
    if (selectDate?.format()) {
      localStorage.setItem("selectDate", selectDate?.format());
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        localStorage.setItem(url, JSON.stringify(json.births));
        setBirthdays(json.births);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    const value = localStorage.getItem(url);
    if (value !== "undefined" && value !== null) {
      const cachedBirthdays: ListItemProps[] = JSON.parse(value);
      setBirthdays(cachedBirthdays);
    } else {
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
    <DateContext.Provider
      value={`${MONTH[selectDate?.month() || 0]} ${selectDate?.date()}`}
    >
      <div className="birthdayDisplay">
        <div className="leftPanel">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CalendarPicker
              date={selectDate}
              // disableHighlightToday={true}
              data-testid={`calendar-input`}
              onChange={(newValue) => {
                setselectDate(newValue);
              }}
            />
          </LocalizationProvider>
          <div className="searchPanel">
            <div className="searchInput" data-testid={"searchInput"}>
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
            <p
              className="dateLabel"
              data-testid={`calendarDateLabel`}
            >{`Birthdays on ${
              MONTH[selectDate?.month() || 0]
            } ${selectDate?.date()}`}</p>
            {filteredList.length > 0 && <DisplayList items={filteredList} />}
          </div>
        )}
      </div>
    </DateContext.Provider>
  );
}
