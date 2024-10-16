import { Box, Grid, IconButton, InputBase, Typography } from "@mui/material";
import React, { useState } from "react";
// import { getSearchData } from "../";
import { useDispatch } from "react-redux";
import {
  addClimate,
  dailyClimate,
  errorMessage,
  hourlyClimate,
} from "../climatecards/clicmatecardslice.tsx";
import { getSearchData } from "../../common/api/index.tsx";
import SearchIcon from "@mui/icons-material/Search";

function SearchLocation() {
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const dispatch = useDispatch();

  const commonCode = async () => {
    const data = await getSearchData({ infoType: "weather" }, location);

    if (data.cod !== 200) {
      dispatch(errorMessage(data.message));
    } else {
      dispatch(errorMessage(data.message));
      dispatch(addClimate(data));
      setCity(data.name);
      setCountry(data.sys.country);

      const { lat, lon } = data?.coord;

      const dailyData1 = await getSearchData({
        infoType: "onecall",
        lat,
        lon,
        exclude: "current,minutely,alerts",
        units: "metric",
      });

      const dailyData = await getSearchData({ infoType: "forecast" }, location);

      dispatch(dailyClimate(dailyData1.daily));
      const currentTimestamp = Math.floor(Date.now() / 1000);

      const filteredArr = dailyData.list?.filter(
        (item: { dt: number }) => item.dt > currentTimestamp
      );

      dispatch(hourlyClimate(filteredArr));
    }
  };

  const search = async (event: { key: string }) => {
    if (event.key === "Enter") {
      commonCode();
    }
  };

  const handleClick = () => {
    commonCode();
  };

  return (
    <Grid
      container
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      {(city || country) && (
        <Grid item lg={2} md={12} xs={12}>
          <Box
            display="flex"
            justifyContent="space-evenly"
            width="100%"
            p={2}
            alignItems="center"
          >
            <Box>
              <svg
                width="25"
                height="30"
                viewBox="0 0 25 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.96875 12.75C5.96875 9.14289 8.89289 6.21875 12.5 6.21875C16.1071 6.21875 19.0313 9.14289 19.0313 12.75C19.0313 16.3571 16.1071 19.2812 12.5 19.2812C8.89289 19.2812 5.96875 16.3571 5.96875 12.75ZM12.5 8.28125C10.032 8.28125 8.03125 10.282 8.03125 12.75C8.03125 15.218 10.032 17.2188 12.5 17.2188C14.968 17.2188 16.9688 15.218 16.9688 12.75C16.9688 10.282 14.968 8.28125 12.5 8.28125Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.846003 11.1782C1.3332 5.26758 6.27241 0.71875 12.203 0.71875H12.797C18.7276 0.71875 23.6668 5.26758 24.154 11.1782C24.4157 14.3532 23.435 17.506 21.4183 19.9723L14.8278 28.0322C13.6247 29.5036 11.3753 29.5036 10.1722 28.0322L3.5817 19.9723C1.56505 17.506 0.584287 14.3532 0.846003 11.1782ZM12.203 2.78125C7.34581 2.78125 3.30055 6.50678 2.90153 11.3476C2.68371 13.9901 3.49997 16.6141 5.17838 18.6667L11.7688 26.7267C12.1467 27.1888 12.8533 27.1888 13.2312 26.7267L19.8216 18.6667C21.5 16.6141 22.3163 13.9901 22.0985 11.3476C21.6995 6.50678 17.6542 2.78125 12.797 2.78125H12.203Z"
                  fill="white"
                />
              </svg>
            </Box>
            <Typography>
              {city},{country}
            </Typography>
          </Box>
        </Grid>
      )}
      <Grid item lg={city === "" || country === "" ? 12 : 10} md={12} xs={12}>
        <Box
          style={{
            border: "2px black solid",
            borderRadius: "20px",
            padding: "10px",
          }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography>Search:</Typography>
          <Box
            style={{ width: "80%" }}
            display="flex"
            justifyContent="space-between"
          >
            <InputBase
              type="text"
              className="search-bar"
              placeholder="Search Country or State"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              onKeyDown={search}
              style={{ width: "80%" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon onClick={() => handleClick()} />
            </IconButton>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SearchLocation;
