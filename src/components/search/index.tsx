import { Box, IconButton, InputBase, Typography } from "@mui/material";
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
  const dispatch = useDispatch();

  const commonCode = async () => {
    const data = await getSearchData({ infoType: "weather" }, location);

    if (data.cod !== 200) {
      dispatch(errorMessage(data.message));
    } else {
      dispatch(addClimate(data));

      const { lat, lon } = data?.coord;

      const dailyData = await getSearchData({
        infoType: "onecall",
        lat,
        lon,
        exclude: "current,minutely,alerts",
        units: "metric",
      });

      dispatch(dailyClimate(dailyData.daily));
      const currentTimestamp = Math.floor(Date.now() / 1000);

      const filteredArr = dailyData.hourly.filter(
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
    <Box>
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
    </Box>
  );
}

export default SearchLocation;
