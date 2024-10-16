import { Box, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { iconUrlFromCode } from "../../common/api/index.tsx";
import "../dailyClimateCard/index.css";

function Dailyclimatecard({ title }) {
  let forcast: {
    dt: Date;
    temp: number;
    main: { temp: any };
    weather: {
      icon(icon: any): string | undefined;
      main: string | undefined;
      id: any;
    }[];
  }[];

  const dailyClimate = useSelector(
    (state: any) => state?.dailyClimate.climateVal
  );

  const hourlyClimate = useSelector(
    (state: any) => state?.hourlyClimate.climateVal
  );

  if (title === "Daily Card") {
    forcast = dailyClimate;
  } else {
    forcast = hourlyClimate;
  }

  const shortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const nth = (day: number) => {
    if (day > 3 && day < 21) return "th"; // Handles 11th, 12th, 13th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const convertingDate = (date: number) => {
    let result: any;
    if (date) {
      if (typeof date === "number") {
        if (title === "Daily Card") {
          const date1 = new Date(date * 1000);
          // const date = new Date(timestamp * 1000);

          const day = date1.getDate();
          const month = date1.getMonth() + 1;

          const dayOfWeek = `${day + nth(day)} ${
            shortMonths[month]
          }, ${date1.toLocaleString("en-US", {
            weekday: "short",
          })}`;
          result = dayOfWeek;
        } else {
          const date1 = new Date(date * 1000);

          const timeString = date1.toLocaleTimeString();
          result = timeString;
        }
      }
    }

    return result;
  };

  const check = (val: { min: any; max: any }) => {
    let result: string;
    if (title === "Hourly Card") {
      result = `${val}°c`;
    } else {
      result = `${val.min}°c-${val.max}°c`;
    }
    return result;
  };

  return (
    forcast && (
      <Box>
        <Typography variant="h5">{title}</Typography>
        <Divider style={{ margin: "20px" }} />
        <Box
          className="climateScroll"
          display="flex"
          style={{
            maxWidth: "90vw",
            overflowX: "auto",
          }}
        >
          {forcast?.map(
            (
              e: {
                dt: any;
                temp: any;
                main: { temp: any };
                weather: {
                  icon(icon: any): string | undefined;
                  main: string | undefined;
                  id: any;
                }[];
              },
              index
            ) => (
              <Paper
                style={{
                  backgroundColor: "#FFFFFFAB",
                  borderRadius: "20px",
                  padding: "10px",
                  margin: "10px",
                }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  key={index}
                >
                  <Typography variant="caption">
                    {convertingDate(e?.dt)}
                  </Typography>
                  <img
                    src={iconUrlFromCode(e.weather[0].icon)}
                    alt={e.weather[0].main}
                  />
                  <Typography variant="caption">
                    {check(e?.main?.temp)}
                  </Typography>
                </Box>
              </Paper>
            )
          )}
        </Box>
      </Box>
    )
  );
}

export default Dailyclimatecard;
