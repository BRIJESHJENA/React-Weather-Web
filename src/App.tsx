import React from "react";
import SearchLocation from "./components/search/index.tsx";
// import { Card } from "@mui/material";
import Climatecard from "./components/climatecards/index.tsx";
import Dailyclimatecard from "./components/dailyClimateCard.tsx/index.tsx";
import { useSelector } from "react-redux";

export default function App() {
  function setBackgroundBasedOnClimate(climateType: string | number) {
    const climateBackgrounds = {
      Clear: "#87CEEB",
      Rain: "#708090",
      "Heavy Rain": "#2F4F4F",
      Clouds: "#B0C4DE",
      Snow: "#FFFafa",
      Thunderstorm: "#4B0082",
      Drizzle: "#4682B4",
      Mist: "#778899",
    };
    const backgroundColor = climateBackgrounds[climateType] || "#ffffff";
    document.body.style.backgroundColor = backgroundColor;
  }

  const weather: any = useSelector((state: any) => state?.climate.climateVal);

  const bgColor: any = setBackgroundBasedOnClimate(weather?.weather[0]?.main);
  return (
    <div
      className="app"
      style={{
        width: "80vw",
        maxHeight: "80vh",
        overflow: "auto",
        // backgroundColor:"cyan"
        backgroundColor: bgColor,
      }}
    >
      <SearchLocation />
      <Climatecard />
      <Dailyclimatecard title="Daily Card" />
      <Dailyclimatecard title="Hourly Card" />
    </div>
  );
}
